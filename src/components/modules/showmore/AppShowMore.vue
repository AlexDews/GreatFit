<template>
  <div
    v-show="isMediaMatched"
    class="ln-showmore"
    :class="{ [SHOWMORE_DEFAULTS.activeClass]: isExpanded }"
  >
    <div
      ref="contentRef"
      class="ln-showmore__content"
      :style="contentStyle"
    >
      <slot></slot>
    </div>

    <button
      v-if="isButtonVisible"
      type="button"
      class="ln-showmore__button"
      @click="toggleExpand"
    >
      <slot
        name="button"
        :is-expanded="isExpanded"
      >
        {{ isExpanded ? "Скрыть" : "Показать еще" }}
      </slot>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { SHOWMORE_DEFAULTS } from "./showmore.config.js";

const props = defineProps({
  // Режим работы: 'size' (по пикселям) или 'items' (по количеству элементов)
  type: { type: String, default: "size" },
  // Высота в px ИЛИ количество элементов для режима items
  limit: { type: [Number, String], default: 150 },
  // Скорость анимации
  speed: { type: Number, default: SHOWMORE_DEFAULTS.speed },
  // Медиа-запрос, например '768,min' или '1024,max'
  media: { type: String, default: "" },
});

const contentRef = ref(null);
const isExpanded = ref(false); // Развернут ли блок
const isButtonVisible = ref(false); // Нужна ли кнопка вообще
const isMediaMatched = ref(true); // Проходит ли проверка по брейкпоинту
const calculatedHiddenHeight = ref(0); // Вычисленная высота ограничения
const originalHeight = ref(0); // Реальная полная высота контента

let mediaQueryList = null;

// Стили, управляющие плавной анимацией высоты
const contentStyle = computed(() => {
  if (!isMediaMatched.value) return {}; // Если медиа не совпало, стили не применяем

  const currentHeight = isExpanded.value ? originalHeight.value : calculatedHiddenHeight.value;
  return {
    height: `${currentHeight}px`,
    overflow: "hidden",
    transition: `height ${props.speed}ms ease`,
  };
});

// Вычисление высоты ограничения (твоя оригинальная логика)
const calculateHeights = () => {
  if (!contentRef.value) return;

  // 1. Сбрасываем высоту в авто, чтобы замерить реальный размер контента
  contentRef.value.style.height = "auto";
  originalHeight.value = contentRef.value.offsetHeight;

  // 2. Считаем высоту ограничения
  if (props.type === "items") {
    const children = Array.from(contentRef.value.children);
    let itemsHeight = 0;
    const itemsLimit = Math.min(children.length, Number(props.limit));

    for (let i = 0; i < itemsLimit; i++) {
      itemsHeight += children[i].offsetHeight;
    }
    calculatedHiddenHeight.value = itemsHeight;
  } else {
    calculatedHiddenHeight.value = Number(props.limit);
  }

  // 3. Решаем, показывать ли кнопку (только если полный контент больше лимита)
  isButtonVisible.value = originalHeight.value > calculatedHiddenHeight.value;
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Обработка адаптивности (data-showmore-media)
const handleMediaChange = (e) => {
  isMediaMatched.value = e.matches;
  if (!e.matches) {
    isExpanded.value = true; // Если медиа не совпало — принудительно раскрываем всё
  } else {
    isExpanded.value = false;
    nextTick(calculateHeights);
  }
};

onMounted(() => {
  calculateHeights();

  // Инициализация медиа-запросов, если передана строка вида '768,min'
  if (props.media) {
    const [breakpoint, type] = props.media.split(",");
    const query = `(${type === "min" ? "min-width" : "max-width"}: ${breakpoint}px)`;

    mediaQueryList = window.matchMedia(query);
    isMediaMatched.value = mediaQueryList.matches;
    if (!isMediaMatched.value) isExpanded.value = true;

    mediaQueryList.addEventListener("change", handleMediaChange);
  }

  // Пересчитываем размеры при ресайзе окна
  window.addEventListener("resize", calculateHeights);
});

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener("change", handleMediaChange);
  }
  window.removeEventListener("resize", calculateHeights);
});
</script>

<style scoped>
.ln-showmore {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.ln-showmore__content {
  will-change: height;
}

.ln-showmore__button {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
</style>
