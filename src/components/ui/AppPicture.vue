<template>
  <picture>
    <source :srcset="getImageUrl('avif')" type="image/avif">
    <source :srcset="getImageUrl('webp')" type="image/webp">
    <img :src="getImageUrl('jpg')" :alt="alt" :loading="loading">
  </picture>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (value) => ['lazy', 'eager'].includes(value)
  }
})

// Киллер-фича для Vite: динамический импорт ресурсов
// Картинки должны лежать в src/assets/images/
const getImageUrl = (ext) => {
  return new URL(`../../assets/images/${props.name}.${ext}`, import.meta.url).href
}
</script>