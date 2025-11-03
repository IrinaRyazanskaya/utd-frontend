import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createServer as createViteServer } from "vite";

/**
 * @typedef {Object} RenderResult
 * @property {string} html - Отрендеренный HTML-контент
 */

/**
 * @typedef {Object} SSRModule
 * @property {(url: string) => Promise<RenderResult>} render - Функция рендеринга SSR
 */

const isProduction = process.env["NODE_ENV"] === "production";
const port = Number.parseInt(process.env["PORT"] ?? "3000", 10);

const root = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.resolve(root, "dist", "client");
const serverEntryPath = path.resolve(root, "dist", "server", "entry-server.js");

const HTML_CONTENT_TYPE = "text/html";
const OCTET_STREAM_CONTENT_TYPE = "application/octet-stream";

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

/**
 * Преобразует значение ошибки к экземпляру Error
 * @param {unknown} error - Возможная ошибка
 * @returns {Error} Экземпляр Error с сообщением
 */
function normalizeError(error) {
  return error instanceof Error ? error : new Error(String(error));
}

/**
 * Рендерит HTML через Vite в режиме разработки
 * @param {import('vite').ViteDevServer} vite - Экземпляр Vite Dev Server
 * @param {string} url - URL для рендеринга
 * @returns {Promise<string>} Отрендеренный HTML
 */
async function renderInDevelopment(vite, url) {
  const templatePath = path.resolve(root, "index.html");
  let template = await fs.readFile(templatePath, "utf-8");
  template = await vite.transformIndexHtml(url, template);

  const { render } = /** @type {SSRModule} */ (await vite.ssrLoadModule("/src/entry-server.tsx"));
  const { html } = await render(url);

  return template.replace("<!--ssr-content-->", html);
}

/**
 * Рендерит HTML в production-режиме
 * @param {string} url - URL для рендеринга
 * @param {string} template - HTML-шаблон
 * @param {(url: string) => Promise<RenderResult>} render - Функция рендеринга
 * @returns {Promise<string>} Отрендеренный HTML
 */
async function renderInProduction(url, template, render) {
  const { html } = await render(url);
  return template.replace("<!--ssr-content-->", html);
}

/**
 * Пытается отдать статический файл
 * @param {string} requestUrl - URL запроса
 * @param {http.ServerResponse} res - Объект ответа HTTP
 * @returns {Promise<boolean>} true, если файл был найден и отдан, иначе false
 */
async function tryServeStaticFile(requestUrl, res) {
  const { pathname } = new URL(requestUrl, "http://localhost");
  const filePath = path.join(clientDistPath, decodeURIComponent(pathname));

  if (!filePath.startsWith(clientDistPath)) {
    return false;
  }

  try {
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      return false;
    }

    const content = await fs.readFile(filePath);
    const fileExtension = path.extname(filePath);
    const contentType = STATIC_CONTENT_TYPES.get(fileExtension) ?? OCTET_STREAM_CONTENT_TYPE;

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(content);

    return true;
  } catch {
    return false;
  }
}

/**
 * Создаёт HTTP-сервер и по разному инициализирует его в зависимости от окружения
 * @returns {Promise<http.Server>} HTTP-сервер
 */
async function createServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      root,
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    return http.createServer((request, response) => {
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
          const html = await renderInDevelopment(vite, requestUrl);

          response.statusCode = 200;
          response.setHeader("Content-Type", HTML_CONTENT_TYPE);
          response.end(html);
        } catch (/** @type {unknown} */ error) {
          const normalizedError = normalizeError(error);
          vite.ssrFixStacktrace(normalizedError);

          response.statusCode = 500;
          response.end(normalizedError.stack ?? normalizedError.message);
        }
      });
    });
  }

  /** @type {SSRModule} */
  const { render } = await import(pathToFileURL(serverEntryPath).href);
  const template = await fs.readFile(path.join(clientDistPath, "index.html"), "utf-8");

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
      const isStaticServed = await tryServeStaticFile(requestUrl, response);

      if (isStaticServed) {
        return;
      }

      const html = await renderInProduction(requestUrl, template, render);

      response.statusCode = 200;
      response.setHeader("Content-Type", HTML_CONTENT_TYPE);
      response.end(html);
    } catch (/** @type {unknown} */ error) {
      response.statusCode = 500;
      response.end("Internal Server Error");

      const normalizedError = normalizeError(error);
      console.error("Failed to serve request: ", normalizedError.stack ?? normalizedError.message);
    }
  });
}

const server = await createServer();

server.listen(port, () => {
  console.log(`Server available at http://localhost:${port}`);
});
