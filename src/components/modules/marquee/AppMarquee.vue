<template>
  <div
    ref="marqueeContainer"
    class="ln-marquee"
    :class="{
      '_pause-on-hover': pauseOnHover,
      'ln-marquee--vertical': direction === 'vertical',
      'ln-marquee--horizontal': direction !== 'vertical',
    }"
  >
    <div
      ref="runLine"
      class="ln-marquee__run-line"
      :style="{
        '--marquee-dimension': `-${dimension}px`,
        '--marquee-duration': `${baseDuration}s`,
        '--marquee-reverse': reverse ? 'reverse' : 'normal',
      }"
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
import { ref, onMounted, onUnmounted } from "vue";
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

// Обновление размеров контента
const updateDimensions = () => {
  if (!originalList.value) return;

  dimension.value = props.direction === "vertical" ? originalList.value.offsetHeight : originalList.value.offsetWidth;
};

onMounted(() => {
  if (originalList.value) {
    resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(originalList.value);
  }
  updateDimensions();
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
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
  animation: ln-marquee-anim var(--marquee-duration) linear infinite;
  animation-direction: var(--marquee-reverse, normal);
}

.ln-marquee__list {
  display: flex;
  flex-shrink: 0;
}

/* --- Логика направлений через нормальные БЭМ-модификаторы --- */

/* Горизонтальная бегущая строка */
.ln-marquee--horizontal .ln-marquee__run-line,
.ln-marquee--horizontal .ln-marquee__list {
  flex-direction: row;
}

/* Вертикальная бегущая строка */
.ln-marquee--vertical .ln-marquee__run-line,
.ln-marquee--vertical .ln-marquee__list {
  flex-direction: column;
}

.ln-marquee--vertical .ln-marquee__run-line {
  animation-name: ln-marquee-anim-v;
}

/* Пауза */
.ln-marquee._pause-on-hover:hover .ln-marquee__run-line {
  animation-play-state: paused;
}

/* Анимации */
@keyframes ln-marquee-anim {
  to {
    transform: translateX(var(--marquee-dimension));
  }
}

@keyframes ln-marquee-anim-v {
  to {
    transform: translateY(var(--marquee-dimension));
  }
}
</style>
