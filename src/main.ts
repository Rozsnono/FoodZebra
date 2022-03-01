import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "./plugins/i18n";
import routes from "./routes";
import vuetify from "./plugins/vuetify";

const app = createApp(App);
app.use(createPinia());
app.use(routes);
app.use(i18n);
app.use(vuetify);

app.mount("#app");
