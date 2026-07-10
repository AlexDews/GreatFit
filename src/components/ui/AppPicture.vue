<template>
  <picture>
    <template v-if="isMobSmall">
      <source
        media="(max-width: 479px)"
        :srcset="getImageUrl(isMobSmall, 'avif')"
        type="image/avif"
      />
      <source
        media="(max-width: 479px)"
        :srcset="getImageUrl(isMobSmall, 'webp')"
        type="image/webp"
      />
      <source
        media="(max-width: 479px)"
        :srcset="getImageUrl(isMobSmall, 'jpg')"
      />
    </template>

    <template v-if="isMob">
      <source
        media="(max-width: 767px)"
        :srcset="getImageUrl(isMob, 'avif')"
        type="image/avif"
      />
      <source
        media="(max-width: 767px)"
        :srcset="getImageUrl(isMob, 'webp')"
        type="image/webp"
      />
      <source
        media="(max-width: 767px)"
        :srcset="getImageUrl(isMob, 'jpg')"
      />
    </template>

    <template v-if="isTab">
      <source
        media="(max-width: 1024px)"
        :srcset="getImageUrl(isTab, 'avif')"
        type="image/avif"
      />
      <source
        media="(max-width: 1024px)"
        :srcset="getImageUrl(isTab, 'webp')"
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        :srcset="getImageUrl(isTab, 'jpg')"
      />
    </template>

    <source
      :srcset="getImageUrl(name, 'avif')"
      type="image/avif"
    />
    <source
      :srcset="getImageUrl(name, 'webp')"
      type="image/webp"
    />
    <img
      :src="getImageUrl(name, 'jpg')"
      :alt="alt"
      :loading="loading"
    />
  </picture>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  // Новая опция для совсем мелких экранов
  isMobSmall: {
    type: String,
    default: "",
  },
  isMob: {
    type: String,
    default: "",
  },
  isTab: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  loading: {
    type: String,
    default: "lazy",
    validator: (value) => ["lazy", "eager"].includes(value),
  },
});

const getImageUrl = (fileName, ext) => {
  return new URL(`../../assets/images/${fileName}.${ext}`, import.meta.url).href;
};
</script>
