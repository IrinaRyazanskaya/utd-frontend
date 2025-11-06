import react from "@vitejs/plugin-react";
import { type OutputAsset } from "rollup";
import { type Plugin, defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

export default defineConfig(({ isSsrBuild }) => ({
  assetsInclude: ["**/*.docx"],

  plugins: [
    react(),
    inlineIndexCSS(),
    isSsrBuild
      ? null
      : compression({
          algorithms: ["brotli"],
        }),
  ].filter(Boolean),

  build: {
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    rollupOptions: {
      output: {
        manualChunks: splitChunks,
      },
    },
    modulePreload: {
      polyfill: false,
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !dep.includes("leaflet"));
      },
    },
  },
}));

function splitChunks(id: string): string {
  if (id.includes("leaflet")) {
    return "leaflet";
  }

  if (id.includes("node_modules")) {
    return "vendor";
  }

  return "index";
}

function inlineIndexCSS(): Plugin {
  return {
    name: "inline-index-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      let htmlAsset: OutputAsset | undefined;
      let cssAsset: OutputAsset | undefined;

      for (const file of Object.values(bundle)) {
        if (file.type === "asset" && file.fileName.endsWith(".html")) {
          htmlAsset = file;
        }

        if (
          file.type === "asset" &&
          file.fileName.endsWith(".css") &&
          file.fileName.includes("index")
        ) {
          cssAsset = file;
        }
      }

      if (!htmlAsset || !cssAsset) {
        return;
      }

      const html = String(htmlAsset.source);
      const css = String(cssAsset.source);

      htmlAsset.source = html.replace(
        /<link[^>]+rel=["']stylesheet["'][^>]*>/,
        `<style>${css}</style>`,
      );

      delete bundle[cssAsset.fileName];
    },
  };
}
