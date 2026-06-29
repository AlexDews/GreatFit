<template>
  <div class="app-wrapper">
    <TheHeader />

    <main class="main">
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
//~ Импортируем базовые UI-компоненты
import TheHeader from "@/components/ui/TheHeader.vue";
import TheFooter from "@/components/ui/TheFooter.vue";

//~ Подключаем системное ядро (наш глобальный бутлоадер)
import { useSystemInit } from "@/core/useSystemInit.js";

//~ Запускаем инициализацию системных фиксов (webp, touch, vh, loaded)
useSystemInit();
</script>

<style lang="scss" scoped>
</style>
