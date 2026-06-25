<template>
  <div
    ref="mapContainer"
    class="modux-map-container"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup>
/* global google, ymaps, DG */
import { ref, onMounted, computed, watch } from "vue";
import { MAPS_CONFIG } from "./maps.config.js";

const props = defineProps({
  type: { type: String, default: MAPS_CONFIG.defaults.type },
  apiKey: { type: String, default: "" },
  center: { type: Array, required: true },
  zoom: { type: Number, default: MAPS_CONFIG.defaults.zoom },
  disableBehaviors: { type: Boolean, default: false }, // Скролл/драг для Яндекса
  marks: { type: Array, default: () => [] },
  width: { type: String, default: "100%" },
  height: { type: String, default: "400px" },
});

const mapContainer = ref(null);
const currentType = computed(() => props.type.toLowerCase());

onMounted(() => {
  if (!mapContainer.value) return;

  // Теперь проверка бьет по рукам за отсутствие ключа у любого провайдера
  if (!props.apiKey) {
    console.error(`[Maps]: Ключ API для провайдера "${currentType.value}" не задан!`);
    return;
  }

  startScriptLoading();
});

const startScriptLoading = () => {
  let src = "";
  const callbackName = `initModuXMap_${currentType.value}`;

  if (currentType.value === "google") {
    src = MAPS_CONFIG.loaders.google(props.apiKey, callbackName);
    window[callbackName] = () => initMapInstance();
  } else if (currentType.value === "yandex") {
    src = MAPS_CONFIG.loaders.yandex(props.apiKey); // Передаем ключ сюда
  } else if (currentType.value === "2gis") {
    src = MAPS_CONFIG.loaders["2gis"](props.apiKey);
  }

  if (document.querySelector(`script[src*="${src.split("?")[0]}"]`)) {
    setTimeout(() => initMapInstance(), 100);
    return;
  }

  const tag = document.createElement("script");
  tag.src = src;
  tag.async = true;

  if (currentType.value !== "google") {
    tag.onload = () => initMapInstance();
  }

  document.head.append(tag);
};

/**
 * Ядро инициализации конкретной карты
 */
const initMapInstance = () => {
  // ===== GOOGLE =====
  if (currentType.value === "google" && typeof google !== "undefined") {
    // Google требует передавать настройки, но сам ключ уже вшит в загрузку скрипта. Тут всё ок.
    const map = new google.maps.Map(mapContainer.value, {
      center: { lat: props.center[0], lng: props.center[1] },
      zoom: props.zoom,
    });

    props.marks.forEach((mark) => {
      const size = mark.size || MAPS_CONFIG.defaults.size;
      const anchor = mark.offset ? new google.maps.Point(-mark.offset[0], -mark.offset[1]) : new google.maps.Point(size[0] / 2, size[1] / 2);

      const marker = new google.maps.Marker({
        position: { lat: mark.coords[0], lng: mark.coords[1] },
        map,
        icon: mark.icon
          ? {
              url: mark.icon,
              scaledSize: new google.maps.Size(size[0], size[1]),
              anchor: anchor,
            }
          : null,
      });

      if (mark.balloon) {
        const info = new google.maps.InfoWindow({ content: mark.balloon });
        marker.addListener("click", () => info.open(map, marker));
      }
    });
  }

  // ===== YANDEX =====
  else if (currentType.value === "yandex" && typeof ymaps !== "undefined") {
    ymaps.ready(() => {
      const myMap = new ymaps.Map(mapContainer.value, {
        center: props.center,
        zoom: props.zoom,
        controls: [],
      });

      if (props.disableBehaviors) {
        myMap.behaviors.disable(["scrollZoom", "drag"]);
      }

      props.marks.forEach((mark) => {
        const placemark = new ymaps.Placemark(
          mark.coords,
          { balloonContent: mark.balloon || "" },
          {
            iconLayout: "default#image",
            iconImageHref: mark.icon || MAPS_CONFIG.defaults.icon,
            iconImageSize: mark.size || MAPS_CONFIG.defaults.size,
            iconImageOffset: mark.offset || MAPS_CONFIG.defaults.offset,
          },
        );
        myMap.geoObjects.add(placemark);
      });
    });
  }

  // ===== 2GIS =====
  else if (currentType.value === "2gis" && typeof DG !== "undefined") {
    DG.then(() => {
      // ИСПРАВЛЕНО: Для 2GIS нужно передавать контейнер, а не вызывать DG.map напрямую без контекста
      const map = DG.map(mapContainer.value, {
        center: props.center,
        zoom: props.zoom,
        zoomControl: false,
        fullscreenControl: false,
      });

      props.marks.forEach((mark) => {
        const size = mark.size || MAPS_CONFIG.defaults.size;
        const icon = mark.icon
          ? DG.icon({
              iconUrl: mark.icon,
              iconSize: size,
              iconAnchor: mark.offset ? [-mark.offset[0], -mark.offset[1]] : [size[0] / 2, size[1] / 2],
            })
          : null;

        const marker = DG.marker(mark.coords, icon ? { icon } : {});
        if (mark.balloon) marker.bindPopup(mark.balloon);
        marker.addTo(map);
      });
    });
  }
};
</script>

<style scoped>
.modux-map-container {
  display: block;
  background-color: #f5f5f5; /* Плейсхолдер, пока карта грузится */
  overflow: hidden;
}
</style>
