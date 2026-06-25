<template>
  <div class="datepicker-wrapper" v-click-outside="closeCalendar">
    <input
      type="text"
      :class="[config.inputClass, { [config.errorClass]: hasError }]"
      :value="inputValue"
      @input="onInput"
      @focus="openCalendar"
      placeholder="ДД.ММ.ГГГГ"
    />

    <div :class="[config.containerClass, { [config.activeClass]: isOpen }]">
      <div :class="config.headerClass">
        <button
          v-if="config.showNavButtons"
          type="button"
          :class="config.prevBtnClass"
          :disabled="isPrevMonthDisabled"
          :style="isPrevMonthDisabled ? { opacity: 0.3, pointerEvents: 'none' } : {}"
          @click="changeMonth(-1)"
        >
          ‹
        </button>

        <div v-if="config.useSelectFilters" :class="config.titleClass">
          <select :class="config.monthSelectClass" v-model="viewMonth">
            <option v-for="(name, idx) in config.monthNames" :key="idx" :value="idx">
              {{ name }}
            </option>
          </select>

          <select :class="config.yearSelectClass" v-model="viewYear">
            <option v-for="y in yearsRange" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
        </div>
        <span v-else :class="config.currentMonthClass">
          {{ config.monthNames[viewMonth] }} {{ viewYear }}
        </span>

        <button
          v-if="config.showNavButtons"
          type="button"
          :class="config.nextBtnClass"
          :disabled="isNextMonthDisabled"
          :style="isNextMonthDisabled ? { opacity: 0.3, pointerEvents: 'none' } : {}"
          @click="changeMonth(1)"
        >
          ›
        </button>
      </div>

      <div :class="config.gridClass">
        <div v-for="day in config.weekDays" :key="day" :class="config.weekdayClass">
          {{ day }}
        </div>

        <div
          v-for="day in prevMonthDays"
          :key="'prev-' + day"
          :class="['dp-day', config.disabledClass, { [config.adjacentClass]: config.showPrevMonths }]"
        >
          {{ config.showPrevMonths ? day : '' }}
        </div>

        <div
          v-for="day in currentMonthDays"
          :key="'curr-' + day.num"
          :class="['dp-day', {
            [config.selectedClass]: day.isSelected,
            [config.disabledClass]: day.isDisabled
          }]"
          @click="!day.isDisabled && selectDate(day.num)"
        >
          {{ day.num }}
        </div>

        <div
          v-for="day in nextMonthDays"
          :key="'next-' + day"
          :class="['dp-day', config.disabledClass, { [config.adjacentClass]: config.showNextMonths }]"
        >
          {{ config.showNextMonths ? day : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { DATEPICKER_DEFAULTS } from './datepicker.config.js';

// Принимаем кастомный конфиг и стартовое значение даты (v-model)
const props = defineProps({
  modelValue: { type: String, default: '' },
  customConfig: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue']);

// Склеиваем дефолтный и пользовательский конфиги
const config = computed(() => ({ ...DATEPICKER_DEFAULTS, ...props.customConfig }));

// Реактивные состояния
const inputValue = ref(props.modelValue);
const isOpen = ref(false);
const hasError = ref(false);

const selectedDate = ref(null);
const viewDate = ref(new Date());

const viewMonth = computed({
  get: () => viewDate.value.getMonth(),
  set: (val) => {
    const d = new Date(viewDate.value);
    d.setMonth(val);
    viewDate.value = d;
  }
});

const viewYear = computed({
  get: () => viewDate.value.getFullYear(),
  set: (val) => {
    const d = new Date(viewDate.value);
    d.setFullYear(val);
    viewDate.value = d;
  }
});

// Границы валидации дат
const minDateParsed = computed(() => {
  if (config.value.minDate === 'tomorrow') {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }
  const d = new Date(config.value.minDate);
  d.setHours(0, 0, 0, 0);
  return d;
});

const maxDateParsed = computed(() => {
  if (!config.value.maxDate) return null;
  const d = new Date(config.value.maxDate);
  d.setHours(23, 59, 59, 999);
  return d;
});

// Список годов для селекта
const yearsRange = computed(() => {
  const minY = minDateParsed.value.getFullYear();
  const maxY = maxDateParsed.value ? maxDateParsed.value.getFullYear() : new Date().getFullYear() + 50;
  const list = [];
  for (let y = minY; y <= maxY; y++) list.push(y);
  return list;
});

// Инициализация при монтировании
onMounted(() => {
  viewDate.value = new Date(minDateParsed.value);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(inputValue.value)) {
    validateManualInput(inputValue.value);
  }
});

// Наблюдаем за изменением извне
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(newVal)) validateManualInput(newVal);
});

// Математика генерации сетки дней (Кристально чистый вычисляемый JS)
const prevMonthDays = computed(() => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  let firstDayIndex = new Date(year, month, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(daysInPrevMonth - (firstDayIndex - 1 - i));
  }
  return days;
});

const currentMonthDays = computed(() => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    
    // Проверка лимитов min/max дат
    let isDisabled = date < minDateParsed.value || (maxDateParsed.value && date > maxDateParsed.value);
    
    // Проверка разрешенных дней недели
    if (!isDisabled && config.value.enabledDays.length > 0) {
      if (!config.value.enabledDays.includes(date.getDay())) {
        isDisabled = true;
      }
    }

    const isSelected = selectedDate.value && date.toDateString() === selectedDate.value.toDateString();

    days.push({ num: d, isDisabled, isSelected });
  }
  return days;
});

const nextMonthDays = computed(() => {
  const totalRendered = prevMonthDays.value.length + currentMonthDays.value.length;
  const remaining = totalRendered % 7 === 0 ? 0 : 7 - (totalRendered % 7);
  const days = [];
  for (let d = 1; d <= remaining; d++) days.push(d);
  return days;
});

// Блокировка стрелок навигации
const isPrevMonthDisabled = computed(() => {
  const prevMonth = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1);
  return prevMonth < new Date(minDateParsed.value.getFullYear(), minDateParsed.value.getMonth(), 1);
});

const isNextMonthDisabled = computed(() => {
  if (!maxDateParsed.value) return false;
  const nextMonth = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1);
  return nextMonth > new Date(maxDateParsed.value.getFullYear(), maxDateParsed.value.getMonth(), 1);
});

// Логика переключения интерфейса
const openCalendar = () => {
  if (selectedDate.value) viewDate.value = new Date(selectedDate.value);
  isOpen.value = true;
};
const closeCalendar = () => { isOpen.value = false; };
const changeMonth = (offset) => {
  const d = new Date(viewDate.value);
  d.setMonth(d.getMonth() + offset);
  viewDate.value = d;
};

// Выбор даты по клику в сетке
const selectDate = (dayNum) => {
  const date = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), dayNum);
  selectedDate.value = date;
  const formatted = date.toLocaleDateString("ru-RU");
  inputValue.value = formatted;
  hasError.value = false;
  emit('update:modelValue', formatted);
  isOpen.value = false;
};

// Логика ввода текста (Твоя оригинальная Маска)
const onInput = (e) => {
  if (config.value.useInternalMask) {
    applyMask(e);
  } else {
    inputValue.value = e.target.value;
  }
  
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(inputValue.value)) {
    validateManualInput(inputValue.value);
  } else {
    hasError.value = inputValue.value.length === 10;
  }
};

const applyMask = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 8) value = value.slice(0, 8);

  let d = value.slice(0, 2);
  let m = value.slice(2, 4);
  let y = value.slice(4, 8);

  if (m.length === 2) {
    if (parseInt(m) > 12) m = "12";
    if (parseInt(m) === 0) m = "01";
  }

  if (d.length === 2) {
    let dayInt = parseInt(d);
    let monthInt = m.length === 2 ? parseInt(m) : null;
    let yearInt = y.length === 4 ? parseInt(y) : new Date().getFullYear();
    let maxDays = 31;
    if (monthInt) maxDays = new Date(yearInt, monthInt, 0).getDate();

    if (dayInt > maxDays) d = String(maxDays).padStart(2, "0");
    if (dayInt === 0) d = "01";
  }

  if (y.length === 4) {
    let yearInt = parseInt(y);
    const maxYear = maxDateParsed.value ? maxDateParsed.value.getFullYear() : 9999;
    const minYear = minDateParsed.value ? minDateParsed.value.getFullYear() : 0;
    if (yearInt > maxYear) y = String(maxYear);
    if (yearInt < minYear && yearInt > 1000) y = String(minYear);
  }

  let finalValue = d;
  if (value.length > 2) finalValue += "." + m;
  if (value.length > 4) finalValue += "." + y;

  e.target.value = finalValue;
  inputValue.value = finalValue;
};

const validateManualInput = (value) => {
  const [d, m, y] = value.split(".").map(Number);
  const inputDate = new Date(y, m - 1, d);
  const isValidDate = !isNaN(inputDate.getTime()) && inputDate.getDate() === d;
  const isAllowed = isValidDate && inputDate >= minDateParsed.value && (!maxDateParsed.value || inputDate <= maxDateParsed.value);

  if (isAllowed) {
    hasError.value = false;
    selectedDate.value = new Date(inputDate);
    viewDate.value = new Date(inputDate);
    emit('update:modelValue', value);
  } {
    hasError.value = !isAllowed;
    if (!isAllowed) selectedDate.value = null;
  }
};

// Локальная директива клика вне элемента (Замена document.addEventListener)
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('mousedown', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.clickOutsideEvent);
  }
};
</script>