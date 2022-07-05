import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import './styles/index.css'
import { initBackendClient } from "./api";

initBackendClient();

const app = createApp(App).use(router)
app.mount("#app")
