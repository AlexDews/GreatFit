import { createApp } from "vue";
import App from "./App.vue";
import router from "./core/router";
import { initSmoothScroll } from './core/smoothScroll.js'

/**
 ** LuminaNexus Vite Asset Scanner & Global Styles
 */
//~ Путь изменен на ./assets/, так как main.js теперь лежит в корне src
import.meta.glob("./assets/images/**/*.{jpg,jpeg,png,webp,avif}", { eager: true });

//~ Подключаем стили (путь изменен на относительный к корню src)
import "./scss/style.scss";

/**
 ** LuminaNexus Vue Application Boot
 */
const app = createApp(App);

// Если в будущем добавишь роутер или Pinia, регистрируй их тут:
// app.use(router);

app.use(router);
app.mount("#app");

initSmoothScroll();

/**
 ** LuminaNexus Brand Ecosystem Banner
 */
const projectInfo = {
  name: "LUMINA",
  subName: "NEXUS",
  version: "Vue Edition",
  tagline: "High-Performance Modular Ecosystem",
};

const banner = ` %c ${projectInfo.name} %c ${projectInfo.subName} %c ${projectInfo.version} %c ${projectInfo.tagline} `;

console.log(
  banner,
  "color: #fff; background: #007bff; border-radius: 5px 0 0 5px; font-weight: bold; padding: 4px;",
  "color: #fff; background: #333; font-weight: bold; padding: 4px;",
  "color: #333; background: #eee; padding: 4px;",
  "color: #666; background: transparent; padding: 5px; font-style: italic; font-family: sans-serif;",
);
