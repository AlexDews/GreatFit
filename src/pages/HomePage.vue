<template>
  <div class="app-wrapper">
    <TheHeader />
    <TheMobileMenu />
    <AppAnimator />
    <div
      data-scroll-container
      class="scroll-container"
    >
      <main class="main">
        <HomeHero />
        <HomeServices />
        <HomeClasses />
        <HomeTeam />
        <HomeMember />
      </main>

      <TheFooter />
    </div>
  </div>
</template>

<script setup>
//~ Импортируем базовые UI-компоненты
import { onMounted } from "vue";
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheMobileMenu from "@/components/layouts/TheMobileMenu.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeServices from "@/components/home/HomeServices.vue";
import HomeClasses from "@/components/home/HomeClasses.vue";
import HomeTeam from "@/components/home/HomeTeam.vue";
import HomeMember from "@/components/home/HomeMember.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";
import AppAnimator from "@/components/modules/animator/AppAnimator.vue";

//~ Подключаем системное ядро (наш глобальный бутлоадер)
import { useSystemInit } from "@/core/useSystemInit.js";
import { initSmoothScroll } from "@/core/smoothScroll.js";

//~ Запускаем инициализацию системных фиксов (webp, touch, vh, loaded)
useSystemInit();
onMounted(() => {
  // Запускаем плавный скролл строго здесь, когда весь этот DOM готов
  initSmoothScroll();
});
</script>

<style lang="scss" scoped>
.scroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  will-change: transform;
}

.main {
  flex-grow: 1;
}
.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
