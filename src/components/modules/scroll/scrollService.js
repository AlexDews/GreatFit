import { SCROLL_CONFIG } from "./scroll.config.js";

/**
 * Плавный скролл к блоку (без логики хедера)
 */
export function goToBlock(targetBlockSelector, options = {}) {
  const targetElement = document.querySelector(targetBlockSelector);
  if (!targetElement) return;

  const config = { ...SCROLL_CONFIG.goto, ...options };

  // Авто-закрытие меню
  if (document.documentElement.classList.contains(SCROLL_CONFIG.selectors.menuOpenClass)) {
    const burgerBtn = document.querySelector(SCROLL_CONFIG.selectors.burgerBtn);
    if (burgerBtn) burgerBtn.click();
  }

  // Расчет позиции
  const header = !config.noHeader ? document.querySelector(SCROLL_CONFIG.selectors.header) : null;
  const headerHeight = header ? header.offsetHeight : 0;
  const startPosition = window.scrollY;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - headerHeight - config.offsetTop;
  
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // Плавность (Quadratic Ease-in-out)
    const progress = Math.min(timeElapsed / config.speed, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < config.speed) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}