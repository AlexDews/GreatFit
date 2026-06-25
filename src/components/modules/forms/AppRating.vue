<template>
  <div
    class="rating"
    :class="{ rating_set: isEditable, rating_sending: isSending }"
  >
    <div class="rating__body">
      <div
        class="rating__active"
        :style="{ width: activeWidth }"
      ></div>

      <div class="rating__items">
        <div
          v-for="star in 5"
          :key="star"
          class="rating__item"
          tabindex="0"
          role="button"
          :aria-label="`Оценить на ${star}`"
          @mouseover="handleMouseover(star)"
          @mouseleave="handleMouseleave"
          @click="handleRatingClick(star)"
          @keydown.enter.space.prevent="handleRatingClick(star)"
          @keydown.left.prevent="changeFocus(star, -1)"
          @keydown.right.prevent="changeFocus(star, 1)"
          ref="starRefs"
        ></div>
      </div>
    </div>
    <div class="rating__value">{{ hoverValue || modelValue }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  isEditable: { type: Boolean, default: true },
  ajaxUrl: { type: String, default: "" }, // Если передано, отправляем AJAX как в старом коде
});

const emit = defineEmits(["update:modelValue", "change"]);

const hoverValue = ref(null);
const isSending = ref(false);
const starRefs = ref([]);

// Вычисляем ширину активного слоя в %
const activeWidth = computed(() => {
  const currentVal = hoverValue.value !== null ? hoverValue.value : props.modelValue;
  return `${(currentVal / 5) * 100}%`;
});

const handleMouseover = (star) => {
  if (!props.isEditable) return;
  hoverValue.value = star;
};

const handleMouseleave = () => {
  hoverValue.value = null;
};

const handleRatingClick = async (star) => {
  if (!props.isEditable || isSending.value) return;

  if (props.ajaxUrl) {
    isSending.value = true;
    try {
      const res = await fetch(props.ajaxUrl);
      const json = await res.json();
      const newVal = json.newRating || star;
      emit("update:modelValue", newVal);
      emit("change", newVal);
    } catch (e) {
      console.error("ModuX Rating: Ошибка при отправке", e);
    } finally {
      isSending.value = false;
    }
  } else {
    emit("update:modelValue", star);
    emit("change", star);
  }
};

// Доступность: перенос фокуса стрелками клавиатуры
const changeFocus = (currentStar, direction) => {
  const nextIdx = currentStar - 1 + direction;
  if (starRefs.value[nextIdx]) {
    starRefs.value[nextIdx].focus();
  }
};
</script>
