<template>
  <div class="app-wrapper">
    <Header />

    <main class="main">
      <div class="main__container">
        <div class="main__wrapper">
          <div class="main__item item-lumina">Lumina</div>
          <div class="main__item item-nexus">Nexus</div>
          <div class="main__item item-ver">VueJS</div>
          <div class="main__phaton"></div>
        </div>
        <div class="main__slogan">яркая связь ваших идей</div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
//~ Импортируем базовые UI-компоненты
import Header from "@/components/ui/Header.vue";
import Footer from "@/components/ui/Footer.vue";

//~ Подключаем системное ядро (наш глобальный бутлоадер)
import { useSystemInit } from "@/core/useSystemInit.js";

//~ Запускаем инициализацию системных фиксов (webp, touch, vh, loaded)
useSystemInit();
</script>

<style lang="scss">
//~ Переменные анимации заставки
$global-delay: 0.5s;

.main {
  height: 100vh;
  background-color: #051a2b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;

  &__container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__wrapper {
    display: flex;
    position: relative;
    z-index: 1;
  }

  &__slogan {
    animation-name: fadeSlogan;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-delay: calc($global-delay + 1.5s);
    opacity: 0;
    color: #1b598b;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 25px;
    font-size: 16px;
  }

  &__phaton {
    display: flex;
    position: absolute;
    top: 125%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #007bff 50%, transparent 100%);
    background-size: 200% 100%;
    transform: translateY(-77%) scaleX(0);
    transform-origin: center;
    opacity: 0;

    animation:
      photonRay 3s linear infinite calc($global-delay + 2.5s),
      growAndPulse 4s ease-out forwards calc($global-delay + 2.5s);
    z-index: 2;
  }
}

.item-lumina {
  animation-name: fade;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  color: #eee;
  padding: 15px 20px;
  background-color: #007bff;
  font-weight: 300;
  opacity: 0;
  animation-delay: $global-delay;
}

.item-nexus {
  animation-name: fade;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: calc($global-delay + 0.5s);
  color: #eee;
  padding: 15px 20px;
  background-color: #333;
  font-weight: 300;
  opacity: 0;
}

.item-ver {
  animation-name: fade;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-delay: calc($global-delay + 1s);
  opacity: 0;
  color: #333;
  padding: 15px 20px;
  background-color: white;
  font-weight: 300;
}

@keyframes growAndPulse {
  0% {
    opacity: 0;
    transform: translateY(-77%) scaleX(0);
  }
  15% {
    opacity: 1;
    transform: translateY(-77%) scaleX(1);
  }
  40% {
    filter: brightness(1.5);
    box-shadow: 0 0 25px #007bff;
  }
  70% {
    filter: brightness(1);
    opacity: 0.7;
  }
  100% {
    opacity: 1;
    transform: translateY(-77%) scaleX(1);
  }
}

@keyframes photonRay {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes fadeSlogan {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
