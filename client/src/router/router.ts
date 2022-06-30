import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../pages/auth/login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/auth/login",
        name: "login",
        component: Login,
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});