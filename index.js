import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import http from "node:http";
import path from "node:path";
import { PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createServer as createViteServer } from "vite";

/**
 * @typedef {Object} SSRModule
 * @property {(url: string) => Promise<RenderResult>} render - Функция рендеринга
 */

/**
 * @typedef {Object} RenderResult
 * @property {import("react-dom/server").PipeableStream} stream - Поток с HTML-контентом
 */

const HTML_CONTENT_TYPE = "text/html";

const isProduction = process.env["NODE_ENV"] === "production";
const port = Number.parseInt(process.env["PORT"] ?? "3000", 10);

const root = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.resolve(root, "dist", "client");
const serverEntryPath = path.resolve(root, "dist", "server", "entry-server.js");

/** @type {Map<string, string>} */
const STATIC_CONTENT_TYPES = new Map([
  [".js", "application/javascript"],
  [".css", "text/css"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".json", "application/json"],
  [".webmanifest", "application/manifest+json"],
  [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
]);

const SSR_CONTENT_PLACEHOLDER = "<!--ssr-content-->";

/**
 * Преобразует значение ошибки к экземпляру Error
 * @param {unknown} error - Возможная ошибка
 * @returns {Error} Экземпляр Error с сообщением
 */
function normalizeError(error) {
  return error instanceof Error ? error : new Error(String(error));
}

/**
 * Разделяет HTML-шаблон по плейсхолдеру контента
 * @param {string} template - HTML-шаблон
 * @returns {{ before: string, after: string }} Части шаблона до и после плейсхолдера
 */
function splitTemplate(template) {
  const placeholderIndex = template.indexOf(SSR_CONTENT_PLACEHOLDER);

  if (placeholderIndex === -1) {
    throw new Error(`Не найден плейсхолдер ${SSR_CONTENT_PLACEHOLDER} в HTML-шаблоне`);
  }

  return {
    before: template.slice(0, placeholderIndex),
    after: template.slice(placeholderIndex + SSR_CONTENT_PLACEHOLDER.length),
  };
}

/**
 * Прокидывает HTML-поток React в HTTP-ответ
 * @param {import("react-dom/server").PipeableStream} stream - Поток, возвращённый React
 * @param {http.ServerResponse} response - HTTP-ответ
 * @param {{ before: string, after: string }} templateParts - Части шаблона вокруг корня приложения
 * @returns {Promise<void>}
 */
async function renderStreamIntoResponse(stream, response, templateParts) {
  response.write(templateParts.before);

  await pipeReactStream(stream, response);

  response.write(templateParts.after);
  response.end();
}

/**
 * Перенаправляет поток React в HTTP-ответ и ждёт завершения
 * @param {import("react-dom/server").PipeableStream} stream - Поток React
 * @param {http.ServerResponse} response - HTTP-ответ
 * @returns {Promise<void>}
 */
function pipeReactStream(stream, response) {
  return new Promise((resolve, reject) => {
    const passthrough = new PassThrough();

    const cleanup = () => {
      passthrough.removeListener("error", onError);
      passthrough.removeListener("end", onEnd);
      response.removeListener("error", onError);
      response.removeListener("close", onClose);

      try {
        passthrough.unpipe(response);
      } catch {}
    };

    const onError = (/** @type {unknown} */ error) => {
      cleanup();
      if (typeof stream.abort === "function") {
        stream.abort();
      }
      reject(normalizeError(error));
    };

    const onEnd = () => {
      cleanup();
      resolve();
    };

    const onClose = () => {
      cleanup();
      if (typeof stream.abort === "function") {
        stream.abort();
      }
      reject(new Error("Соединение было закрыто до завершения рендеринга"));
    };

    passthrough.on("error", onError);
    passthrough.on("end", onEnd);
    response.on("error", onError);
    response.on("close", onClose);

    passthrough.pipe(response, { end: false });

    try {
      stream.pipe(passthrough);
    } catch (error) {
      onError(normalizeError(error));
    }
  });
}

/**
 * Рендерит HTML через Vite в режиме разработки
 * @param {import('vite').ViteDevServer} vite - Экземпляр Vite Dev Server
 * @param {string} url - URL для рендеринга
 * @param {http.ServerResponse} response - HTTP-ответ
 * @returns {Promise<void>}
 */
async function renderInDevelopment(vite, url, response) {
  const templatePath = path.resolve(root, "index.html");
  let template = await fs.readFile(templatePath, "utf-8");
  template = await vite.transformIndexHtml(url, template);

  const { render } = /** @type {SSRModule} */ (await vite.ssrLoadModule("/src/entry-server.tsx"));
  const { stream } = await render(url);
  const templateParts = splitTemplate(template);

  response.statusCode = 200;
  response.setHeader("Content-Type", HTML_CONTENT_TYPE);
  response.setHeader("Cache-Control", "no-store");

  await renderStreamIntoResponse(stream, response, templateParts);
}

/**
 * Рендерит HTML в production-режиме
 * @param {string} url - URL для рендеринга
 * @param {{ before: string, after: string }} templateParts - Части HTML-шаблона
 * @param {(url: string) => Promise<RenderResult>} render - Функция рендеринга
 * @param {http.ServerResponse} response - HTTP-ответ
 * @returns {Promise<void>}
 */
async function renderInProduction(url, templateParts, render, response) {
  const { stream } = await render(url);

  response.statusCode = 200;
  response.setHeader("Content-Type", HTML_CONTENT_TYPE);
  response.setHeader("Cache-Control", "no-store");

  await renderStreamIntoResponse(stream, response, templateParts);
}

/**
 * Отправляет файл клиенту
 * @param {string} filePath
 * @param {http.ServerResponse} response
 */
async function sendFile(filePath, response) {
  const stream = createReadStream(filePath);
  await pipeline(stream, response);
}

/**
 * Пытается отдать статический файл
 * @param {string} requestUrl - URL запроса
 * @param {http.ServerResponse} response - HTTP ответ
 * @returns {Promise<"served" | "missing" | "not-static">}
 *  - "served"     - файл обработан
 *  - "missing"    - файл не найден
 *  - "not-static" - это не запрос за статикой
 */
async function tryServeStaticFile(requestUrl, response) {
  const { pathname } = new URL(requestUrl, "http://localhost");
  const decodedPath = decodeURIComponent(pathname);
  const absolutePath = path.resolve(clientDistPath, "." + decodedPath);

  const relativePath = path.relative(clientDistPath, absolutePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return "not-static";
  }

  const extension = path.extname(absolutePath);
  const contentType = STATIC_CONTENT_TYPES.get(extension) ?? null;

  // Если расширение нам не знакомо — считаем, что это не наш статик
  if (!contentType) {
    return "not-static";
  }

  let fileInfo;
  try {
    fileInfo = await fs.stat(absolutePath);
  } catch (error) {
    const err = /** @type {NodeJS.ErrnoException} */ (error);
    if (err.code === "ENOENT") {
      return "missing";
    }

    throw error;
  }

  if (fileInfo.isDirectory()) {
    return "not-static";
  }

  if (decodedPath.startsWith("/assets/")) {
    response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    response.setHeader("Cache-Control", "public, max-age=300");
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", contentType);

  await sendFile(absolutePath, response);

  return "served";
}

/**
 * Создаёт HTTP-сервер и по-разному инициализирует его в зависимости от окружения
 * @returns {Promise<http.Server>} HTTP-сервер
 */
async function createServer() {
  if (!isProduction) {
    const server = http.createServer();

    const vite = await createViteServer({
      root,
      server: {
        hmr: {
          server: server,
        },
        middlewareMode: true,
      },
      appType: "custom",
    });

    server.on("request", (request, response) => {
      const requestUrl = request.url;

      if (!requestUrl) {
        response.statusCode = 400;
        response.end("Bad Request");
        return;
      }

      vite.middlewares(request, response, async (/** @type {unknown} */ error) => {
        if (error) {
          const normalizedError = normalizeError(error);
          vite.ssrFixStacktrace(normalizedError);

          response.statusCode = 500;
          response.end(normalizedError.stack ?? normalizedError.message);
          return;
        }

        try {
          await renderInDevelopment(vite, requestUrl, response);
        } catch (/** @type {unknown} */ error) {
          const normalizedError = normalizeError(error);
          vite.ssrFixStacktrace(normalizedError);

          if (!response.headersSent && !response.writableEnded) {
            response.statusCode = 500;
            response.end(normalizedError.stack ?? normalizedError.message);
          } else if (!response.writableEnded) {
            response.end();
          }
        }
      });
    });

    return server;
  }

  /** @type {SSRModule} */
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  const template = await fs.readFile(path.join(clientDistPath, "index.html"), "utf-8");
  const templateParts = splitTemplate(template);

  return http.createServer(async (request, response) => {
    const requestUrl = request.url;

    if (!requestUrl) {
      response.statusCode = 400;
      response.end("Bad Request");
      return;
    }

    if (request.method !== "GET") {
      response.statusCode = 405;
      response.end("Method Not Allowed");
      return;
    }

    try {
      const staticResult = await tryServeStaticFile(requestUrl, response);

      if (staticResult === "served") {
        return;
      }

      if (staticResult === "missing") {
        response.statusCode = 404;
        response.end("Not Found");
        return;
      }

      await renderInProduction(requestUrl, templateParts, render, response);
      return;
    } catch (/** @type {unknown} */ error) {
      if (!response.headersSent && !response.writableEnded) {
        response.statusCode = 500;
        response.end("Internal Server Error");
      } else if (!response.writableEnded) {
        response.end();
      }

      const normalizedError = normalizeError(error);
      console.error("Failed to serve request: ", normalizedError.stack ?? normalizedError.message);
    }
  });
}

const server = await createServer();

server.listen(port, () => {
  console.log(`Server available at http://localhost:${port}`);
});

let isShuttingDown = false;

const gracefullyCloseServer = (/** @type {NodeJS.Signals} */ signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}, shutting down...`);

  const forceExitTimer = setTimeout(() => {
    console.warn("Shutdown timeout reached, exiting.");
    process.exit(1);
  }, 5000);
  forceExitTimer.unref();

  server.close((error) => {
    if (error) {
      console.error("Error closing HTTP server:", error);
      process.exit(1);
    }

    clearTimeout(forceExitTimer);
    console.log("HTTP server closed, exiting.");
    process.exit(0);
  });
};

process.on("SIGINT", gracefullyCloseServer);
process.on("SIGTERM", gracefullyCloseServer);
process.on("SIGQUIT", gracefullyCloseServer);
