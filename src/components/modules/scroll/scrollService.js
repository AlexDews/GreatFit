// src/components/modules/scroll/scrollService.js
import { ref } from "vue";
import { SCROLL_CONFIG } from "./scroll.config.js";
import { menuClose } from "../funcs.js"; // Твоя функция закрытия бургера

// Реактивные флаги для шапки, которые мы отдадим во Vue компоненты
export const isHeaderScrolled = ref(false); // Достиг ли скролл точки startPoint
export const isHeaderVisible = ref(true); // Видна ли шапка прямо сейчас

let lastScrollTop = 0;
let timer = null;

/**
 * Твоя оригинальная функция плавного скролла с кастомным таймингом (JS Animation)
 */
export function goToBlock(targetBlockSelector, options = {}) {
  const targetBlockElement = document.querySelector(targetBlockSelector);
  if (!targetBlockElement) return;

  const defaultSpeed = options.speed || SCROLL_CONFIG.goto.speed;
  const defaultOffsetTop = options.offsetTop || SCROLL_CONFIG.goto.offsetTop;
  const noHeader = options.noHeader ?? SCROLL_CONFIG.goto.noHeader;

  // 1. Автоматически закрываем бургер-меню перед скроллом
  if (document.documentElement.classList.contains(SCROLL_CONFIG.selectors.menuOpenClass)) {
    menuClose();
  }

  // 2. Высчитываем высоту хедера
  let headerItemHeight = 0;
  if (!noHeader) {
    const headerElement = document.querySelector(SCROLL_CONFIG.selectors.header);
    if (headerElement) {
      headerItemHeight = headerElement.offsetHeight;
    }
  }

  // 3. Математический просчет траектории (твоя оригинальная логика)
  const startPosition = window.scrollY;
  const targetPosition = targetBlockElement.getBoundingClientRect().top + startPosition - headerItemHeight - defaultOffsetTop;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, defaultSpeed);

    window.scrollTo(0, run);

    if (timeElapsed < defaultSpeed) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // Финальная микро-коррекция
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Инициализация слушателя скролла для "Умного хедера"
 */
export function initHeaderScroll(settings = {}) {
  const startPoint = settings.startPoint || SCROLL_CONFIG.header.startPoint;
  const headerShow = settings.show ?? SCROLL_CONFIG.header.show;
  const headerShowTimer = settings.showTimer || SCROLL_CONFIG.header.showTimer;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    clearTimeout(timer);

    // Достигли ли лимита фиксации шапки
    if (scrollTop >= startPoint) {
      isHeaderScrolled.value = true;

      if (headerShow) {
        // Если скроллим вниз — прячем, если вверх — показываем
        if (scrollTop > lastScrollTop) {
          isHeaderVisible.value = false;
        } else {
          isHeaderVisible.value = true;
        }

        // Таймер возврата видимости при остановке скролла
        timer = setTimeout(() => {
          isHeaderVisible.value = true;
        }, headerShowTimer);
      }
    } else {
      // Мы в самом верху страницы
      isHeaderScrolled.value = false;
      if (headerShow) isHeaderVisible.value = true;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Глобальный хелпер, чтобы по-прежнему можно было вызывать goToBlock откуда угодно
if (typeof window !== "undefined") {
  window.goToBlock = goToBlock;
}
