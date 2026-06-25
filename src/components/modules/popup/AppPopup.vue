<template>
  <Transition
    name="popup-fade"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="isOpen"
      class="popup"
      role="dialog"
      aria-modal="true"
      @click="handleOutsideClick"
      @keydown.tab="handleTabFocus"
    >
      <div class="popup__wrapper">
        <div
          ref="popupContent"
          class="popup__content"
        >
          <button
            type="button"
            class="popup__close"
            aria-label="Закрыть"
            @click="closeMe"
          >
            ×
          </button>

          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { popupStore } from "./popupStore.js";
import { POPUP_CONFIG } from "./popup.config.js";

const props = defineProps({
  name: { type: String, required: true }, // Уникальное имя попапа (id)
});

const popupContent = ref(null);
let lastFocusEl = null;

// Попап открыт, если его имя совпадает с именем в глобальном сторе
const isOpen = computed(() => popupStore.activePopup === props.name);

// Список селекторов для Focus Trap (твоя оригинальная сборка)
const focusableSelectors = [
  "a[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "button:not([disabled]):not([aria-hidden])",
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])',
];

const closeMe = () => popupStore.close();

// Закрытие по клику на оверлей (вне контента)
const handleOutsideClick = (e) => {
  if (popupContent.value && !popupContent.value.contains(e.target)) {
    closeMe();
  }
};

// Закрытие по Esc
const handleEsc = (e) => {
  if (POPUP_CONFIG.closeEsc && e.code === "Escape" && isOpen.value) {
    closeMe();
  }
};

// Твой Focus Catch алгоритм, переписанный под Vue Refs
const handleTabFocus = (e) => {
  if (!popupContent.value) return;

  const focusable = [...popupContent.value.querySelectorAll(focusableSelectors.join(","))];
  if (focusable.length === 0) return;

  const focusedIndex = focusable.indexOf(document.activeElement);

  if (e.shiftKey && focusedIndex === 0) {
    focusable[focusable.length - 1].focus();
    e.preventDefault();
  } else if (!e.shiftKey && focusedIndex === focusable.length - 1) {
    focusable[0].focus();
    e.preventDefault();
  }
};

// Хуки после анимации (Focus Trap инициализация)
const onAfterEnter = () => {
  lastFocusEl = document.activeElement; // Запоминаем что фокусили до попапа
  if (popupContent.value) {
    const focusable = [...popupContent.value.querySelectorAll(focusableSelectors.join(","))];
    if (focusable.length > 0) focusable[0].focus(); // Фокусим первый элемент инпута/кнопки
  }
};

const onAfterLeave = () => {
  if (lastFocusEl) lastFocusEl.focus(); // Возвращаем фокус на кнопку вызова
};

// Следим за клавиатурой, только когда окно активно
watch(isOpen, (active) => {
  if (active) {
    window.addEventListener("keydown", handleEsc);
  } else {
    window.removeEventListener("keydown", handleEsc);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});

onMounted(() => {
  // Если включена автозагрузка по хэшу И хэш совпадает с именем ЭТОГО попапа
  if (POPUP_CONFIG.hashSettings.goHash && window.location.hash.replace('#', '') === props.name) {
    // Даем микротаймаут в 50мс, чтобы Vue успел полностью отрисовать структуру
    setTimeout(() => {
      popupStore.open(props.name);
    }, 50);
  }
});
</script>

<style scoped>
/* Базовые стили для анимаций переходов Vue */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup__wrapper {
  padding: 20px;
}
.popup__content {
  background: #fff;
  padding: 30px;
  position: relative;
  border-radius: 4px;
}
.popup__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Анимация плавного появления */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
