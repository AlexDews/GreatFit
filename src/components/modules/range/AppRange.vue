<template>
  <div class="ln-range">
    <div class="ln-range__inputs">
      <div class="ln-range__field">
        <span class="ln-range__label">от</span>
        <input
          type="text"
          class="ln-range__input"
          :value="displayMin"
          @change="handleInputChange(0, $event.target.value)"
        />
      </div>
      <div class="ln-range__field">
        <span class="ln-range__label">до</span>
        <input
          type="text"
          class="ln-range__input"
          :value="displayMax"
          @change="handleInputChange(1, $event.target.value)"
        />
      </div>
    </div>

    <div
      ref="sliderContainer"
      class="ln-range__slider"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css"; // Подключаем родные стили либы
import { RANGE_DEFAULTS } from "./range.config.js";

const props = defineProps({
  // v-model, передаем массив [min, max]
  modelValue: {
    type: Array,
    default: () => [...RANGE_DEFAULTS.start],
  },
  min: { type: Number, default: RANGE_DEFAULTS.range.min },
  max: { type: Number, default: RANGE_DEFAULTS.range.max },
  step: { type: Number, default: RANGE_DEFAULTS.step },
});

const emit = defineEmits(["update:modelValue", "change"]);

const sliderContainer = ref(null);
let sliderInstance = null;

// Строковые значения для отображения в инпутах (с пробелами)
const displayMin = ref("");
const displayMax = ref("");

// Инициализация слайдера
onMounted(() => {
  if (!sliderContainer.value) return;

  sliderInstance = noUiSlider.create(sliderContainer.value, {
    start: [...props.modelValue],
    connect: RANGE_DEFAULTS.connect,
    step: props.step,
    range: {
      min: props.min,
      max: props.max,
    },
    format: RANGE_DEFAULTS.format,
  });

  // Событие update срабатывает ПРИ КАЖДОМ движении ползунка
  sliderInstance.on("update", (values, handle) => {
    if (handle === 0) displayMin.value = values[0];
    if (handle === 1) displayMax.value = values[1];

    // Преобразуем отформатированные строки обратно в чистые числа для v-model
    const rawValues = values.map((val) => RANGE_DEFAULTS.format.from(val));
    emit("update:modelValue", rawValues);
  });

  // Событие change срабатывает, только когда юзер ОТПУСТИЛ ползунок (удобно для отправки запросов на бэкенд)
  sliderInstance.on("change", (values) => {
    const rawValues = values.map((val) => RANGE_DEFAULTS.format.from(val));
    emit("change", rawValues);
  });
});

// Ручной ввод чисел в инпуты
const handleInputChange = (index, value) => {
  if (!sliderInstance) return;

  const currentValues = sliderInstance.get(); // получаем ['10 000', '150 000']
  currentValues[index] = value;

  // Метод .set() сам отформатирует ввод и подвинет ползунок
  sliderInstance.set(currentValues);
};

// Если v-model изменится извне (например, сбросили фильтр кнопкой), обновляем ползунки
watch(
  () => props.modelValue,
  (newVal) => {
    if (!sliderInstance) return;

    const currentSliderValues = sliderInstance.get().map((val) => RANGE_DEFAULTS.format.from(val));
    // Предотвращаем зацикливание, обновляем только если значения реально отличаются
    if (JSON.stringify(currentSliderValues) !== JSON.stringify(newVal)) {
      sliderInstance.set(newVal);
    }
  },
  { deep: true },
);

onUnmounted(() => {
  if (sliderInstance) {
    sliderInstance.destroy();
  }
});
</script>

<style scoped>
.ln-range {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.ln-range__inputs {
  display: flex;
  gap: 10px;
}

.ln-range__field {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 0 10px;
  flex: 1;
}

.ln-range__label {
  color: #999;
  font-size: 14px;
  margin-right: 5px;
  user-select: none;
}

.ln-range__input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  outline: none;
}

.ln-range__slider {
  margin: 10px 0;
}

/* Перебиваем дефолтные стили noUiSlider под дизайн-систему (опционально) */
:deep(.noUi-target) {
  background: #e0e0e0;
  border: none;
  box-shadow: none;
  height: 6px;
}

:deep(.noUi-connect) {
  background: #4f46e5; /* Твой фирменный цвет */
}

:deep(.noUi-handle) {
  width: 18px;
  height: 18px;
  right: -9px;
  top: -6px;
  border-radius: 50%;
  background: #4f46e5;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  cursor: grab;
}

:deep(.noUi-handle::before),
:deep(.noUi-handle::after) {
  display: none; /* Убираем уродские полоски внутри ползунков */
}
</style>
