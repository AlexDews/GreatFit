<template>
  <div class="app-wrapper">
    <TheHeader />

    <main class="main">
      <HomeHero />
      <HomeServices />
      <HomeClasses />
      <HomeTeam />
      <HomeMember />
    </main>

    <TheFooter />

    <TheMobileMenu />
  </div>
</template>

<script setup>
//~ Импортируем базовые UI-компоненты
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheMobileMenu from "@/components/layouts/TheMobileMenu.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeServices from "@/components/home/HomeServices.vue";
import HomeClasses from "@/components/home/HomeClasses.vue";
import HomeTeam from "@/components/home/HomeTeam.vue";
import HomeMember from "@/components/home/HomeMember.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";

//~ Подключаем системное ядро (наш глобальный бутлоадер)
import { useSystemInit } from "@/core/useSystemInit.js";

//~ Запускаем инициализацию системных фиксов (webp, touch, vh, loaded)
useSystemInit();
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
