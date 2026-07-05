# 🚀 Ультимативная Шпаргалка по Vue 3 (`<script setup>`) — Расширенная версия

Самый полный справочник со всеми нюансами, модификаторами и примерами из реальной практики. 

## 📑 Оглавление
1. [🛠️ 1. Реактивность (Основа основ)](#section-1)
2. [📐 2. Директивы шаблона (Отрисовка и логика)](#section-2)
3. [⚡ 3. События и Модификаторы (v-on / @)](#section-3)
4. [📦 4. Работа с компонентами (Связь и Слоты)](#section-4)
5. [⏳ 5. Жизненный цикл компонента (Хуки)](#section-5)
6. [🎨 6. Встроенные компоненты Vue](#section-6)
7. [🎯 7. Шаблонные ссылки (Template Refs) и DOM](#section-7)
8. [🧩 8. Композаблы (Composables / Переиспользуемая логика)](#section-8)
9. [📡 9. Глобальный проброс данных (Provide / Inject)](#section-9)

---

<a id="section-1"></a>
## 🛠️ 1. Реактивность (Основа основ)

* `ref()` — универсальный вариант для любых данных. **Важно:** в `<script>` всегда обращаемся через `.value`, в `<template>` — без него.
* `reactive()` — работает **только** с объектами. Не требует `.value`. Удобно для форм.
* `computed()` — вычисляемое свойство. Кеширует результат и пересчитывается только при изменении зависимостей.
* `watch()` — следит за переменной и выполняет код при её изменении.

```html
<script setup>
import { ref, reactive, computed, watch } from 'vue';

const isOpen = ref(false); 
const formData = reactive({ email: '', password: '' });

// computed автоматически пересчитается, если изменится password
const isPasswordSafe = computed(() => formData.password.length >= 8);

// watch следит за открытием попапа
watch(isOpen, (newVal) => {
  if (newVal) console.log('Попап открыт, блокируем скролл');
});
</script>
```

---

<a id="section-2"></a>
## 📐 2. Директивы шаблона (Отрисовка и логика)

### Привязка атрибутов (`v-bind` или `:`)
```html
<template>
  <button :disabled="!isPasswordSafe">Отправить</button>
  
  <div class="popup" :class="{ '_active': isOpen }">...</div>
</template>
```

### Условия (`v-if` vs `v-show`)
* `v-if` — **Удаляет** элемент из DOM. Идеально для тяжелых компонентов, которые появляются редко.
* `v-show` — **Прячет** через `display: none`. Идеально для частых переключений (попапы, табы).

```html
<template>
  <div v-if="userRole === 'admin'">Секретная панель</div>
  <div v-show="isOpen" class="dropdown">Быстрое меню</div>
</template>
```

### Двусторонняя связь (`v-model`) с модификаторами
```html
<template>
  <input v-model="formData.email" type="email" />

  <input v-model.trim="formData.password" type="text" />

  <input v-model.number="price" type="number" />
</template>
```

---

<a id="section-3"></a>
## ⚡ 3. События и Модификаторы (`v-on` или `@`)

### Обработка ввода (`@input` и `@change`)
* `@input` — срабатывает **мгновенно** при каждом нажатии клавиши. Идеально для живого поиска.
* `@change` — срабатывает только когда инпут **потерял фокус**. Идеально для валидации.

```html
<template>
  <input type="text" @input="liveSearch" placeholder="Живой поиск..." />
  <input type="email" @change="validateEmail" placeholder="Проверка по завершению" />
</template>
```

### Обработка форм (`@submit`)
```html
<template>
  <form @submit.prevent="sendData">
    <input v-model="formData.email" required />
    <button type="submit">Отправить</button>
  </form>
</template>
```

### Модификаторы клика и клавиатуры
```html
<template>
  <button @click.stop="doAction">Кликни меня</button>

  <div class="overlay" @click.self="closePopup">
    <div class="content">Внутри кликать безопасно</div>
  </div>

  <input @keydown.enter="submitForm" @keydown.esc="clearInput" />
</template>
```

---

<a id="section-4"></a>
## 📦 4. Работа с компонентами (Связь и Слоты)

### Пропсы и Эмиты (Props & Emits)
```html
<script setup>
defineProps({
  text: { type: String, required: true },
  color: { type: String, default: 'blue' }
});

const emit = defineEmits(['customClick']);
</script>

<template>
  <button :class="color" @click="emit('customClick', 'Данные из кнопки')">
    {{ text }}
  </button>
</template>
```

### Слоты (`<slot>`)
```html
<template>
  <div class="card">
    <div class="card-header"><slot name="header"></slot></div>
    <div class="card-body"><slot></slot></div> </div>
</template>

<template>
  <AppCard>
    <template #header><h3>Заголовок</h3></template>
    <p>Основной текст карточки</p>
  </AppCard>
</template>
```

---

<a id="section-5"></a>
## ⏳ 5. Жизненный цикл компонента (Хуки)

* `onMounted()` — DOM-элементы отрисованы.
* `onUnmounted()` — Компонент удален (обязательно чистим слушатели).

```html
<script setup>
import { onMounted, onUnmounted } from 'vue';

const handleKey = (e) => console.log(e.key);

onMounted(() => {
  window.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey);
});
</script>
```

---

<a id="section-6"></a>
## 🎨 6. Встроенные компоненты Vue

### `<Transition>`
```html
<template>
  <Transition name="fade">
    <div v-show="isOpen" class="popup">Модалка</div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

### `<Teleport>`
Перекидывает верстку в другой конец DOM (например, прямо в `<body>`), спасая от конфликтов `z-index`.

```html
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup">Я отрендерился в body!</div>
  </Teleport>
</template>
```

---

<a id="section-7"></a>
## 🎯 7. Шаблонные ссылки (Template Refs) и DOM

В Vue нельзя просто использовать `document.querySelector`. Чтобы получить доступ к реальному HTML-тегу (например, для инициализации сторонних библиотек вроде Swiper), нужно использовать атрибут `ref`.

```html
<template>
  <div ref="sliderWrapper" class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Слайд 1</div>
      <div class="swiper-slide">Слайд 2</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Swiper from 'swiper';

// 2. Создаем переменную с ТОЧНО ТАКИМ ЖЕ именем, как в шаблоне
const sliderWrapper = ref(null);
let swiperInstance = null;

// Универсальный конфигурационный файл
const baseConfig = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true
};

onMounted(() => {
  // 3. Обращаемся к DOM-элементу через .value
  if (sliderWrapper.value) {
    swiperInstance = new Swiper(sliderWrapper.value, baseConfig);
  }
});

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy(); // Не забываем убивать инстанс!
  }
});
</script>
```

---

<a id="section-8"></a>
## 🧩 8. Композаблы (Composables / Переиспользуемая логика)

Если у тебя есть логика, которая повторяется из компонента в компонент (например, блокировка скролла у `body` при открытии попапов/меню), её выносят в отдельные `.js` файлы. Это называется Composable.

**Файл `useBodyLock.js`:**
```javascript
import { ref, watch } from 'vue';

export function useBodyLock(isActive) {
  const isLocked = ref(false);

  watch(isActive, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
      isLocked.value = true;
    } else {
      document.body.style.overflow = '';
      isLocked.value = false;
    }
  });

  // Можно вернуть переменные или методы наружу, если нужно
  return { isLocked };
}
```

**Использование в любом компоненте (`AppHeader.vue`):**
```html
<script setup>
import { ref } from 'vue';
import { useBodyLock } from './useBodyLock.js';

const isMenuOpen = ref(false);

// Как только isMenuOpen станет true, хук автоматически заблокирует скролл
useBodyLock(isMenuOpen);
</script>
```

---

<a id="section-9"></a>
## 📡 9. Глобальный проброс данных (Provide / Inject)

Когда нужно передать данные (например, глобальные настройки, конфиги или функции) из самого верхнего компонента в самый нижний, минуя цепочку `props` в промежуточных компонентах (чтобы избежать Prop Drilling).

**Корневой компонент (`App.vue`):**
```html
<script setup>
import { provide } from 'vue';

// Глобальные универсальные настройки приложения
const globalAppConfig = {
  theme: 'dark',
  enableAnimations: true
};

// Раздаем данные всем потомкам под ключом 'appConfig'
provide('appConfig', globalAppConfig);
</script>
```

**Любой глубоко вложенный дочерний компонент (`FooterWidget.vue`):**
```html
<script setup>
import { inject } from 'vue';

// Ловим данные по ключу
const config = inject('appConfig');
</script>

<template>
  <div :class="{ 'dark-theme': config.theme === 'dark' }">
    Виджет подвала
  </div>
</template>
```