import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    isSsrBuild
      ? null
      : compression({
          algorithms: ["brotli"],
        }),
  ].filter(Boolean),
  assetsInclude: ["**/*.docx"],
  build: {
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    rollupOptions: {
      output: {
        manualChunks: splitChunks,
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
