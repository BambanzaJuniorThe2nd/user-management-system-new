import { createApp } from 'vue'
import App from './app.vue'
import { router } from "./router";
import { registerUiComponents } from "./ui-components";
import './styles/index.css'

const app = createApp(App).use(router);
registerUiComponents(app);
app.mount("#app");
