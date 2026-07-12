<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isFixed = ref(false);
const isShow = ref(false);
const isAnimating = ref(false);

let lastScrollTop = 0;
const startPoint = 150; // Точка активации fixed-режима

const handleScrollMove = (e) => {
  const scrollTop = e.detail.y;

  // 1. Возврат в самый верх страницы
  if (scrollTop <= 20) {
    isFixed.value = false;
    isShow.value = false;
    isAnimating.value = false;
    lastScrollTop = scrollTop;
    return; // Выходим, ловить больше нечего
  }

  // 2. Включаем фиксацию почти сразу (на 21-м пикселе), но без анимации появления
  if (scrollTop > 20) {
    isFixed.value = true;
  }

  // 3. А вот всю логику вылета активируем ТОЛЬКО после зоны дребезжания (выше 150px)
  if (scrollTop > startPoint) {
    isAnimating.value = true; // Разрешаем CSS-транзишены только тут

    // Четкая проверка направления скролла с запасом (люфтом) в 5 пикселей
    if (scrollTop < lastScrollTop - 5) {
      // Скроллим ВВЕРХ — показываем шапку
      isShow.value = true;
    } else if (scrollTop > lastScrollTop + 5) {
      // Скроллим ВНИЗ — прячем шапку
      isShow.value = false;
    }
  }

  // Запоминаем позицию для следующего кадра
  lastScrollTop = scrollTop;
};

onMounted(() => {
  window.addEventListener("smooth-scroll-move", handleScrollMove);
});

onUnmounted(() => {
  window.removeEventListener("smooth-scroll-move", handleScrollMove);
});

defineExpose({ isFixed, isShow, isAnimating });
</script>

<template>
  <slot
    :is-fixed="isFixed"
    :is-show="isShow"
    :is-animating="isAnimating"
  />
</template>
