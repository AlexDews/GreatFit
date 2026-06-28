import { createRouter, createWebHistory } from "vue-router";

// 1. Будущие компоненты страниц (пока заглушки)
const HomePage = () => import("@/components/HomePage.vue");
const StyleguidePage = () => import("../styleguide/StyleguidePage.vue");

// 2. Настройка маршрутов
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/styleguide",
    name: "styleguide",
    component: StyleguidePage,
  },
];

// 3. Инициализация роутера
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Автоскролл к началу страницы при переходе (или к хэшу #section)
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;
