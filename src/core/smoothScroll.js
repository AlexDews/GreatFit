import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин сразу, чтобы GSAP не ругался
gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const container = document.querySelector("[data-scroll-container]");
  if (!container) return;

  let current = 0;
  let target = 0;
  const ease = 0.1;

  // Счетчик для ленивого пересчета во время скролла
  let resizeCounter = 0;

  // Функция пересчета высоты body
  const resizeBody = () => {
    if (container) {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    }
  };

  const update = () => {
    target = window.scrollY;
    current += (target - current) * ease;

    gsap.set(container, {
      y: -current,
    });

    // ХАК: Каждые 20 кадров во время движения проверяем высоту.
    // Это вообще не грузит проц, но гарантирует, что футер не пропадет!
    resizeCounter++;
    if (resizeCounter >= 20) {
      resizeBody();
      resizeCounter = 0;
    }

    // Отправляем точную плавную координату для шапки
    window.dispatchEvent(
      new CustomEvent("smooth-scroll-move", {
        detail: { y: current },
      }),
    );

    ScrollTrigger.update();
    requestAnimationFrame(update);
  };

  // Запуск цикла анимации
  update();

  // 1. Следим за изменением размеров окна и полной загрузкой
  window.addEventListener("resize", resizeBody);
  window.addEventListener("load", resizeBody);

  // 2. MutationObserver следит за изменением DOM
  const observer = new MutationObserver(() => {
    setTimeout(resizeBody, 50);
  });
  observer.observe(container, { childList: true, subtree: true });

  // 3. Агрессивный каскад проверок на старте (на всякий пожарный)
  queueMicrotask(resizeBody);
  for (let delay of [100, 300, 500, 1000, 2000]) {
    setTimeout(resizeBody, delay);
  }
}
