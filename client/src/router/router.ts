import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../pages/main/main-page.vue";
import Login from "../pages/auth/login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "main",
        component: MainPage,
    },
    {
        path: "/auth/login",
        name: "login",
        component: Login,
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});