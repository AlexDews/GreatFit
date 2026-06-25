import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

import { aliases } from "./vite-settings/aliases";
import { createVitePlugins } from "./vite-settings/plugins/index";

const srcDir = path.join(import.meta.dirname, "src");

// ===== НАСТРОЙКИ СБОРКИ ===== //
const IS_HASH = true; // Кеширование
const ENABLE_PWA = false; // Манифест, Mobile Service Workers

export default defineConfig({
  root: srcDir,
  base: "./",
  server: {
    open: true,
    watch: {
      usePolling: true,
      additionalPaths: [path.resolve(srcDir, "components")],
    },
  },
  build: {
    outDir: path.join(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {},
  },
  resolve: { alias: aliases },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["import"],
        additionalData: `
          @import "@/scss/utils/settings";
          @import "@/scss/utils/mixins";
        `,
      },
    },
  },
  plugins: [
    vue(), // Обработка Vue-компонентов
    ...createVitePlugins(srcDir, IS_HASH, ENABLE_PWA), // Никакого лишнего мусора
  ],
});