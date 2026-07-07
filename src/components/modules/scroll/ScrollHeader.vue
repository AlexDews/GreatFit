<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { SCROLL_CONFIG } from "./scroll.config.js";

// Состояния, которые мы будем отдавать наружу
const isFixed = ref(false);
const isShow = ref(false);
const isAnimating = ref(false);

const startPoint = SCROLL_CONFIG.header.startPoint;
let lastScrollTop = 0;

const handleScroll = () => {
  const scrollTop = window.scrollY;

  if (scrollTop <= 0) {
    isFixed.value = false;
    isShow.value = false;
    isAnimating.value = false;
  } else if (scrollTop > startPoint && !isFixed.value) {
    isFixed.value = true;
  } else if (isFixed.value) {
    isAnimating.value = true;
    if (scrollTop > lastScrollTop) {
      isShow.value = false;
    } else if (scrollTop < lastScrollTop) {
      isShow.value = true;
    }
  }
  lastScrollTop = Math.max(0, scrollTop);
};

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// Выставляем наружу состояния
defineExpose({ isFixed, isShow, isAnimating });
</script>

<template>
  <slot :is-fixed="isFixed" :is-show="isShow" :is-animating="isAnimating" />
</template>