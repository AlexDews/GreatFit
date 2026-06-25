import { onMounted } from "vue";
import { SYSTEM_CONFIG } from './system.config.js';

/**
 ** LuminaNexus Core System Bootloader
 */
export function useSystemInit() {
  //~ Проверка девайса на мобильность
  const isMobile = () => {
    return Object.values(SYSTEM_CONFIG.deviceDetection).some((regex) => navigator.userAgent.match(regex));
  };

  //~ Проверка AVIF / WebP
  const initImages = async () => {
    const checkSupport = (format) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.height > 0);
        img.onerror = () => resolve(false);
        img.src = SYSTEM_CONFIG.imageSupport[format];
      });
    };

    const [webp, avif] = await Promise.all([checkSupport("webp"), checkSupport("avif")]);

    if (avif) document.documentElement.classList.add("avif");
    else if (webp) document.documentElement.classList.add("webp");
    else document.documentElement.classList.add("no-webp-avif");
  };

  //~ Класс для тач-устройств
  const initTouchClass = () => {
    if (isMobile()) document.documentElement.classList.add("touch");
  };

  //~ Класс полной загрузки страницы
  const initLoadedClass = () => {
    if (document.readyState === "complete") {
      document.documentElement.classList.add("loaded");
    } else {
      window.addEventListener("load", () => document.documentElement.classList.add("loaded"));
    }
  };

  //~ Фикс 100vh для мобильных браузеров
  const initFullVHfix = () => {
    const fullScreens = document.querySelectorAll("[data-fullscreen]");
    if (!fullScreens.length || !isMobile()) return;

    let prevWidth = window.innerWidth;
    const fixHeight = () => {
      if (window.innerWidth !== prevWidth) {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        prevWidth = window.innerWidth;
      }
    };
    window.addEventListener("resize", fixHeight);
    fixHeight();
  };

  onMounted(() => {
    initImages();
    initTouchClass();
    initLoadedClass();
    initFullVHfix();
  });
}
