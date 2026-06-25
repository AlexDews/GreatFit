<template>
  <div
    class="swiper"
    ref="sliderRef"
  >
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <template v-if="navigation">
      <div
        class="swiper-button-prev"
        ref="prevRef"
      ></div>
      <div
        class="swiper-button-next"
        ref="nextRef"
      ></div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { SWIPER_CONFIG } from "./swiper.config.js";

// Подключаем стили Swiper
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  options: { type: Object, default: () => ({}) }, // Возможность перебить любые параметры Swiper на лету
  enabled: { type: Boolean, default: () => SWIPER_CONFIG.controls.enabled },
  disableOnDesktop: { type: Boolean, default: () => SWIPER_CONFIG.controls.disableOnDesktop },
  breakpoint: { type: Number, default: () => SWIPER_CONFIG.controls.desktopBreakpoint },
  navigation: { type: Boolean, default: true },
});

const sliderRef = ref(null);
const prevRef = ref(null);
const nextRef = ref(null);
let instance = null;
let mediaQueryList = null;

// Инициализация экземпляра Swiper
const initSlider = () => {
  if (instance || !sliderRef.value) return;

  const config = {
    modules: [Navigation, Autoplay],
    ...SWIPER_CONFIG.defaults,
    ...props.options,
    navigation: props.navigation
      ? {
          prevEl: prevRef.value,
          nextEl: nextRef.value,
        }
      : false,
  };

  instance = new Swiper(sliderRef.value, config);
};

// Полное уничтожение слайдера и очистка памяти
const destroySlider = () => {
  if (instance) {
    instance.destroy(true, true);
    instance = null;
  }
};

// Функция отслеживания брейкпоинта десктопа
const handleResponsiveCheck = (e) => {
  if (props.disableOnDesktop && e.matches) {
    destroySlider(); // Экран стал большим — тушим слайдер
  } else if (props.enabled) {
    nextTick(initSlider); // Вернулись на мобилку — заводим заново
  }
};

onMounted(() => {
  if (!props.enabled) return;

  if (props.disableOnDesktop) {
    // Вешаем слушатель на медиа-запрос десктопа
    mediaQueryList = window.matchMedia(`(min-width: ${props.breakpoint}px)`);
    mediaQueryList.addEventListener("change", handleResponsiveCheck);

    // Первичная проверка при инициализации блока
    if (mediaQueryList.matches) {
      destroySlider();
    } else {
      nextTick(initSlider);
    }
  } else {
    // Если отключение на десктопе не требуется — просто запускаем везде
    nextTick(initSlider);
  }
});

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener("change", handleResponsiveCheck);
  }
  destroySlider();
});

// Следим за динамическим изменением флага enabled из родительских компонентов
watch(
  () => props.enabled,
  (newValue) => {
    if (newValue) {
      if (mediaQueryList && mediaQueryList.matches && props.disableOnDesktop) return;
      nextTick(initSlider);
    } else {
      destroySlider();
    }
  },
);
</script>

<style scoped>
.swiper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
