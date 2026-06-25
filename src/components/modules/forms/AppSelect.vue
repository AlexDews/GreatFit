<template>
  <div
    class="form-select-wrapper"
    :class="{ '_has-value': modelValue, [formConfig.classes.selectOpen]: isOpen }"
    v-click-outside="closeSelect"
  >
    <select
      style="display: none"
      :name="name"
      :value="modelValue"
    >
      <option value="">{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>

    <div
      :class="formConfig.classes.errorInput && hasError ? formConfig.classes.errorInput : ''"
      class="custom-select-toggle"
      tabindex="0"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen.toString()"
      @click="toggleSelect"
      @keydown="handleKeydown"
    >
      <span class="custom-select-value">
        {{ currentLabel }}
      </span>
    </div>

    <div
      v-show="isOpen"
      class="custom-select-options-list"
      role="listbox"
    >
      <div
        v-for="(opt, idx) in options"
        :key="opt.value"
        ref="optionRefs"
        class="custom-select-option"
        :class="{ [formConfig.classes.selectActive]: opt.value === modelValue }"
        role="option"
        :aria-selected="(opt.value === modelValue).toString()"
        @click="selectOption(opt)"
      >
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { formConfig } from "@components/modules/forms/forms.config.js";

const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Array, required: true },
  placeholder: { type: String, default: "Выберите из списка" },
  name: { type: String, default: "" },
  hasError: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const optionRefs = ref([]);
let searchBuffer = "";
let lastTypeTime = 0;

const currentLabel = computed(() => {
  const active = props.options.find((o) => o.value === props.modelValue);
  return active ? active.label : props.placeholder;
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => scrollActiveIntoView());
  }
};

const closeSelect = () => {
  isOpen.value = false;
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  emit("change", option.value);
  isOpen.value = false;
};

const scrollActiveIntoView = () => {
  const activeIdx = props.options.findIndex((o) => o.value === props.modelValue);
  if (activeIdx !== -1 && optionRefs.value[activeIdx]) {
    optionRefs.value[activeIdx].scrollIntoView({ block: "nearest" });
  }
};

// --- Навигация кнопками и умный буфер поиска по буквам ---
const handleKeydown = (e) => {
  const activeIdx = props.options.findIndex((o) => o.value === props.modelValue);

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    if (!isOpen.value) {
      isOpen.value = true;
      return;
    }
    const nextIdx = e.key === "ArrowDown" ? (activeIdx + 1) % props.options.length : (activeIdx - 1 + props.options.length) % props.options.length;
    selectOption(props.options[nextIdx]);
    nextTick(() => scrollActiveIntoView());
  }

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleSelect();
  }

  if (e.key === "Escape") {
    closeSelect();
  }

  // Поиск по буквам
  const now = Date.now();
  if (now - lastTypeTime > (formConfig.imask.searchDelay || 600)) {
    searchBuffer = "";
  }

  if (e.key.length === 1 && /\S/.test(e.key)) {
    searchBuffer += e.key.toLowerCase();
    const match = props.options.find((o) => o.label.toLowerCase().trim().startsWith(searchBuffer));
    if (match) {
      emit("update:modelValue", match.value);
      nextTick(() => scrollActiveIntoView());
    }
    lastTypeTime = now;
  }
};

// Директива клика вне элемента
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutside = (e) => {
      if (!(el === e.target || el.contains(e.target))) binding.value(e);
    };
    document.addEventListener("mousedown", el.clickOutside);
  },
  unmounted(el) {
    document.removeEventListener("mousedown", el.clickOutside);
  },
};
</script>
