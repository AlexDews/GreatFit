<template>
  <div
    class="ln-tabs"
    :class="{ '_tab-spoller': isMobile }"
  >
    <div
      v-if="!isMobile"
      class="ln-tabs__titles"
      :class="classTitles"
    >
      <button
        v-for="(item, index) in items"
        :key="'title-' + index"
        type="button"
        class="ln-tabs__title"
        :class="[
          { [TABS_DEFAULTS.activeClass]: activeIndex === index }, // Твой активный класс
          classTab, // Твой кастомный класс из пропсов
        ]"
        @click="selectTab(index)"
      >
        {{ item.title }}
      </button>
    </div>

    <div class="ln-tabs__body">
      <div
        v-for="(item, index) in items"
        :key="'block-' + index"
        class="ln-tabs__block"
      >
        <button
          v-if="isMobile"
          type="button"
          class="ln-tabs__title ln-tabs__title--mobile"
          :class="[{ [TABS_DEFAULTS.activeClass]: activeIndex === index }, customTabClass]"
          @click="selectTab(index)"
        >
          {{ item.title }}
        </button>

        <Transition
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
        >
          <div
            v-show="activeIndex === index"
            class="ln-tabs__content-wrapper"
          >
            <div class="ln-tabs__content">
              <slot :name="'content-' + index">{{ item.content }}</slot>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { TABS_DEFAULTS } from "./tabs.config.js";

const props = defineProps({
  // Массив табов: [{ title: 'Вкладка 1', content: 'Текст' }]
  items: { type: Array, required: true },
  // Медиа-запрос перехода в режим спойлера (например, '768' означает <= 768px)
  media: { type: String, default: "768" },
  // Уникальный ID группы табов на странице для хэша (чтобы не путать, если их несколько)
  id: { type: String, default: "0" },
  classTab: {
    type: String,
    default: "",
  },
  classTitles: {
    type: String,
    default: "",
  },
});

const activeIndex = ref(0);
const isMobile = ref(false);
let mediaQueryList = null;

// Переключение таба + работа с URL-хэшем
const selectTab = (index) => {
  if (isMobile.value && activeIndex.value === index) {
    // Если в режиме мобилки кликнули на открытый аккордеон — закрываем его
    activeIndex.value = null;
    if (TABS_DEFAULTS.useHash) window.location.hash = "";
    return;
  }

  activeIndex.value = index;

  if (TABS_DEFAULTS.useHash) {
    window.location.hash = `tab-${props.id}-${index}`;
  }
};

// Проверка хэша при загрузке страницы
const checkHash = () => {
  const hash = window.location.hash;
  if (hash && hash.startsWith(`#tab-${props.id}-`)) {
    const indexFromHash = parseInt(hash.replace(`#tab-${props.id}-`, ""));
    if (!isNaN(indexFromHash) && indexFromHash < props.items.length) {
      activeIndex.value = indexFromHash;
    }
  }
};

const handleMediaChange = (e) => {
  isMobile.value = e.matches;
};

/* --- Анимационные хуки для плавного развертывания (slide) --- */
const beforeEnter = (el) => {
  if (!TABS_DEFAULTS.animate) return;
  el.style.height = "0";
  el.style.overflow = "hidden";
  el.style.transition = `height ${TABS_DEFAULTS.speed}ms ease`;
};

const enter = (el) => {
  if (!TABS_DEFAULTS.animate) return;
  el.style.height = el.scrollHeight + "px";
};

const afterEnter = (el) => {
  el.style.height = "";
  el.style.overflow = "";
};

const beforeLeave = (el) => {
  if (!TABS_DEFAULTS.animate) return;
  el.style.height = el.offsetHeight + "px";
  el.style.overflow = "hidden";
  el.style.transition = `height ${TABS_DEFAULTS.speed}ms ease`;
};

const leave = (el) => {
  if (!TABS_DEFAULTS.animate) return;
  requestAnimationFrame(() => {
    el.style.height = "0";
  });
};

const afterLeave = (el) => {
  el.style.height = "";
  el.style.overflow = "";
};

onMounted(() => {
  checkHash();

  if (props.media) {
    mediaQueryList = window.matchMedia(`(max-width: ${props.media}px)`);
    isMobile.value = mediaQueryList.matches;
    mediaQueryList.addEventListener("change", handleMediaChange);
  }
});

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener("change", handleMediaChange);
  }
});
</script>

<style scoped>
.ln-tabs {
  width: 100%;
}

/* Десктопная панель навигации */
.ln-tabs__titles {
  display: flex;
  border-bottom: 2px solid #eee;
  gap: 20px;
  margin-bottom: 20px;
}

.ln-tabs__title {
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #666;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.3s ease;
}

.ln-tabs__title._tab-active {
  color: #4f46e5;
  border-bottom-color: #4f46e5;
}

/* Мобильный вид (Аккордеон) */
.ln-tabs__title--mobile {
  width: 100%;
  text-align: left;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 4px;
  background: #f9f9f9;
}

.ln-tabs__title--mobile._tab-active {
  background: #e0e7ff;
  border-color: #4f46e5;
}

.ln-tabs__content {
  padding: 15px 5px;
  line-height: 1.6;
  color: #333;
}
</style>
