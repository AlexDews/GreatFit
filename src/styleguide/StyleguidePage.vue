<template>
  <div class="styleguide-body">
    <section class="section">
      <h2>SVG Icons (Sprite)</h2>
      <div class="grid">
        <div
          v-for="icon in svgIconsList"
          :key="icon.id"
          class="card"
        >
          <div class="icon-wrapper">
            <svg><use :href="`/images/sprite/sprite.svg#${icon.id}`"></use></svg>
          </div>
          <small>{{ icon.name }}</small>
          <code>#{{ icon.id }}</code>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Icon Font (LuminaIcons)</h2>
      <div class="grid">
        <div
          v-for="icon in fontIconsList"
          :key="icon.className"
          class="card"
        >
          <i :class="icon.className"></i>
          <small>{{ icon.name }}</small>
          <code>icon-f-{{ icon.name }}</code>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Typography & Fonts</h2>
      <div class="fonts-display">
        <div
          v-for="font in customFonts"
          :key="font.family"
          class="font-card"
        >
          <div class="item-fonts">
            <div class="font-info">
              <h3>{{ font.name }}</h3>
              <code>font-family: {{ font.family }}, sans-serif;</code>
            </div>

            <div
              class="font-preview"
              :style="{ fontFamily: font.family }"
            >
              <p
                class="font-text"
                style="font-weight: 400"
              >
                Regular: The quick brown fox jumps over the lazy dog.
              </p>
              <p
                class="font-text"
                style="font-weight: 400"
              >
                Regular: Быстрая бурая лиса перепрыгивает через ленивую собаку.
              </p>

              <p
                v-if="hasBold(font.weights)"
                class="font-text"
                style="font-weight: 700"
              >
                Bold: The quick brown fox jumps over the lazy dog.
              </p>
              <p
                v-if="hasBold(font.weights)"
                class="font-text"
                style="font-weight: 700"
              >
                Bold: Быстрая бурая лиса перепрыгивает через ленивую собаку.
              </p>

              <div class="alphabet">
                <p>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
              </div>

              <div class="alphabet">
                <p>А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я</p>
                <p>а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я</p>
              </div>

              <div class="alphabet">
                <p>1 2 3 4 5 6 7 8 9 0 & ! ? @ # $ % ^ * ( ) _ + ₽ € $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const SPRITE_PREFIX = "--icon-";

// Делаем реактивные переменные для данных
const rawSvgIcons = ref([]);
const rawFontIcons = ref([]);
const rawFontsData = ref([]);

// Загружаем файлы динамически, чтобы Vite не ругался при их отсутствии
onMounted(async () => {
  const svgFile = "svg-icons";
  const fontFile = "font-icons";
  const fontsDataFile = "fonts";

  try {
    const svgRes = await import(`./json/${svgFile}.json`);
    rawSvgIcons.value = svgRes.default || svgRes;
  } catch {
    console.warn("Стайлгайд: svg-icons.json еще не создан скриптом.");
  }

  try {
    const fontIconsRes = await import(`./json/${fontFile}.json`);
    rawFontIcons.value = fontIconsRes.default || fontIconsRes;
  } catch {
    console.warn("Стайлгайд: font-icons.json еще не создан скриптом.");
  }

  try {
    const fontsRes = await import(`./json/${fontsDataFile}.json`);
    rawFontsData.value = fontsRes.default || fontsRes;
  } catch {
    console.warn("Стайлгайд: fonts.json еще не создан скриптом.");
  }
});

// Обрабатываем SVG иконки (логика остаётся прежней, но следит за .value)
const svgIconsList = computed(() => {
  return Array.isArray(rawSvgIcons.value)
    ? rawSvgIcons.value.map((item) => (typeof item === "string" ? { name: item, id: `${SPRITE_PREFIX}${item}` } : item))
    : [];
});

// Обрабатываем шрифтовые иконки
const fontIconsList = computed(() => {
  return Array.isArray(rawFontIcons.value)
    ? rawFontIcons.value.map((item) => {
        const name = item?.name || "unknown";
        return {
          name: name,
          className: `icon-f-${name}`
        };
      })
    : [];
});

// Шрифты
const customFonts = computed(() => (Array.isArray(rawFontsData.value) ? rawFontsData.value : []));

// Хелпер для проверки жирного начертания
const hasBold = (weights) => {
  if (!weights) return false;
  return weights.includes(700) || weights.includes("700");
};
</script>

<style lang="scss" src="./styleguide.scss" scoped></style>
