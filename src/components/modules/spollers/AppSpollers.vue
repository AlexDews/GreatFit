<template>
  <div 
    ref="spollersContainer" 
    class="ln-spollers"
    :class="{ '_spoller-init': isMediaMatched }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { SPOLLER_DEFAULTS } from './spollers.config.js';

const props = defineProps({
  // Забираем дефолтное значение напрямую из центрального конфига
  oneSpoller: { type: Boolean, default: SPOLLER_DEFAULTS.oneSpoller },
  media: { type: String, default: '' },
  speed: { type: Number, default: SPOLLER_DEFAULTS.speed }
});

const spollersContainer = ref(null);
const activeIds = ref(new Set());
const isMediaMatched = ref(true);

let mediaQueryList = null;

const toggleSpoller = (id) => {
  if (!isMediaMatched.value) return;

  if (activeIds.value.has(id)) {
    activeIds.value.delete(id);
  } else {
    // Используем проп, который по умолчанию завязан на конфиг
    if (props.oneSpoller) {
      activeIds.value.clear();
    }
    activeIds.value.add(id);
  }
};

provide('spollersState', {
  activeIds,
  toggleSpoller,
  isMediaMatched,
  speed: props.speed
});

const handleMediaChange = (e) => {
  isMediaMatched.value = e.matches;
  if (!e.matches) activeIds.value.clear();
};

const handleOutsideClick = (e) => {
  if (spollersContainer.value && !spollersContainer.value.contains(e.target)) {
    activeIds.value.clear();
  }
};

onMounted(() => {
  if (props.media) {
    const [breakpoint, type] = props.media.split(',');
    const query = `(${type === 'min' ? 'min-width' : 'max-width'}: ${breakpoint}px)`;
    mediaQueryList = window.matchMedia(query);
    isMediaMatched.value = mediaQueryList.matches;
    mediaQueryList.addEventListener('change', handleMediaChange);
  }
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  if (mediaQueryList) mediaQueryList.removeEventListener('change', handleMediaChange);
  document.removeEventListener('click', handleOutsideClick);
});
</script>