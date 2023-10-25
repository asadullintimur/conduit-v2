import { createApp } from "vue";

import App from "./App.vue";
const app = createApp(App);

//PLUGINS
import router from "./router";

import {createPinia} from "pinia";
const pinia = createPinia();
import showErrorToastPiniaPlugin from "@/utils/plugins/pinia/showErrorToast";
pinia.use(showErrorToastPiniaPlugin);

import showErrorToastVuePlugin from "@/utils/plugins/vue/showErrorToast";

//GLOBAL COMPONENTS
import ErrorMessages from "@/components/Global/ErrorMessages/index.vue";
app.component("ErrorMessages", ErrorMessages);

app.use(router)
    .use(pinia)
    .use(showErrorToastVuePlugin)
    .mount("#app");
