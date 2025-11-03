import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
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
  if (id.includes("node_modules")) {
    return "vendor";
  }

  return "index";
}
