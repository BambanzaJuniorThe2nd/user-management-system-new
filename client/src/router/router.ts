import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainPage from "../pages/main/main-page.vue";
import AddPage from "../pages/add/add-page.vue";
import EditPage from "../pages/add/edit-page.vue";
import DeletePage from "../pages/add/delete-page.vue";
import ChangePasswordPage from "../pages/add/change-password-page.vue";
import Login from "../pages/auth/login.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "main",
        component: MainPage
    },
    {
        path: "/users/add",
        name: "add",
        component: AddPage,
    },
    {
    path: "/users/edit/:id",
    name: "edit",
    component: EditPage,
    },
    {
    path: "/users/delete/:id",
    name: "delete",
    component: DeletePage,
    },
    {
    path: "/users/change/password",
    name: "change",
    component: ChangePasswordPage,
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