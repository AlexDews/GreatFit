<template>
  <div
    ref="marqueeContainer"
    class="ln-marquee"
    :class="{ '_pause-on-hover': pauseOnHover }"
  >
    <div
      ref="runLine"
      class="ln-marquee__run-line"
      :style="[
        marqueeStyles,
        {
          '--marquee-duration': duration + 's',
          '--marquee-reverse': props.reverse === '-1' ? 'reverse' : 'normal',
        },
      ]"
    >
      <div
        ref="originalList"
        class="ln-marquee__list _original"
      >
        <slot></slot>
      </div>

      <div
        class="ln-marquee__list _clone"
        aria-hidden="true"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { MARQUEE_DEFAULTS } from "./marquee.config.js";

const props = defineProps({
  baseDuration: { type: Number, default: MARQUEE_DEFAULTS.baseDuration },
  direction: { type: String, default: MARQUEE_DEFAULTS.direction }, // horizontal | vertical
  reverse: { type: Boolean, default: MARQUEE_DEFAULTS.reverse },
  pauseOnHover: { type: Boolean, default: MARQUEE_DEFAULTS.pauseOnHover },
});

const marqueeContainer = ref(null);
const runLine = ref(null);
const originalList = ref(null);

const dimension = ref(0);
let resizeObserver = null;

// Вычисляем CSS-переменные на основе пропсов и реального размера контента
const marqueeStyles = computed(() => {
  return {
    "--marquee-direction": props.direction,
    "--marquee-reverse": props.reverse ? "-1" : "1",
    "--marquee-dimension": `-${dimension.value}px`,
    "--marquee-duration": `${props.baseDuration}s`,
  };
});

// Функция обновления размеров контента
const updateDimensions = () => {
  if (!originalList.value) return;

  if (props.direction === "vertical") {
    dimension.value = originalList.value.offsetHeight;
  } else {
    dimension.value = originalList.value.offsetWidth;
  }
};

onMounted(() => {
  // Используем ResizeObserver — он гарантирует точный расчет, когда шрифты/картинки загрузились
  if (originalList.value) {
    resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(originalList.value);
  }

  // Первый ленивый просчет
  updateDimensions();
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.ln-marquee {
  overflow: hidden;
  width: 100%;
  display: flex;
}

.ln-marquee__run-line {
  display: flex;
  will-change: transform;

  /* Запуск анимации по умолчанию (горизонтальная) */
  animation: ln-marquee-anim var(--marquee-duration) linear infinite;

  /* Stylelint будет счастлив: чистый CSS с дефолтным значением normal */
  animation-direction: var(--marquee-reverse, normal);
}

.ln-marquee__list {
  display: flex;
  flex-shrink: 0;
}

/* Динамическое переключение флексов через атрибуты стилей */
[style*="--marquee-direction: horizontal"] .ln-marquee__run-line,
[style*="--marquee-direction: horizontal"] .ln-marquee__list {
  flex-direction: row;
}

[style*="--marquee-direction: vertical"] .ln-marquee__run-line,
[style*="--marquee-direction: vertical"] .ln-marquee__list {
  flex-direction: column;
}

/* Если направление вертикальное — перебиваем имя анимации на Y */
[style*="--marquee-direction: vertical"] .ln-marquee__run-line {
  animation-name: ln-marquee-anim-v;
}

/* Пауза при наведении */
.ln-marquee._pause-on-hover:hover .ln-marquee__run-line {
  animation-play-state: paused;
}

/* Анимация для горизонтального движения */
@keyframes ln-marquee-anim {
  to {
    transform: translateX(var(--marquee-dimension));
  }
}

/* Анимация для вертикального движения */
@keyframes ln-marquee-anim-v {
  to {
    transform: translateY(var(--marquee-dimension));
  }
}
</style>
