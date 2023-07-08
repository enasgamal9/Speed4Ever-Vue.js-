import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Field, Form, ErrorMessage, configure, defineRule } from "vee-validate";


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("Field", Field);
app.component("Form", Form);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
