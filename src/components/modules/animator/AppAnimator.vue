<script setup>
import { onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx;

const initAnimations = () => {
  // Очищаем старые триггеры, если функция вызвана повторно
  ScrollTrigger.getAll().forEach(t => t.kill());

  ctx = gsap.context(() => {
    // 1. Плавное всплытие (для заголовков, секций)
    gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'restart none none reset'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    // 2. Боковой вылет (например, для каких-то фишек или картинок)
    gsap.utils.toArray('[data-animate="fade-left"]').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 100%',
          toggleActions: 'restart none none reset'
        },
        opacity: 0,
        x: 150,
        duration: 1.8,
        ease: 'power2.out',
      });
    });
  });
};

onMounted(() => {
  // Запуск при загрузке страницы
  initAnimations();
  
  // ЛАЙФХАК: Если у тебя табы или слайдеры обновляют DOM, 
  // мы просто говорим ScrollTrigger обновить свои координаты
  window.addEventListener('resize', ScrollTrigger.refresh);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  window.removeEventListener('resize', ScrollTrigger.refresh);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <span style="display: none;"></span>
</template>