import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

import { aliases } from "./vite-settings/aliases";
import { createVitePlugins } from "./vite-settings/plugins/index";
import { styleguidePlugin } from "./vite-settings/plugins/styleguide";

const srcDir = path.join(import.meta.dirname, "src");

// ===== НАСТРОЙКИ СБОРКИ ===== //
const IS_HASH = true; // Кеширование
const ENABLE_PWA = false; // Манифест, Mobile Service Workers
const SHOW_STYLEGUIDE = true; // Вкл/Выкл кнопку StyleGuide

export default defineConfig({
  root: "./",
  base: "./",
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "dist",
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
    ...createVitePlugins(path.resolve(import.meta.dirname, "src"), IS_HASH, ENABLE_PWA),
    styleguidePlugin(SHOW_STYLEGUIDE),
  ].filter(Boolean),
});