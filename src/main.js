import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vueResource from "vue-resource";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "fa",
  theme: {
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

Vue.use(VueSimplemde);
Vue.use(vueResource);
Vue.use(VueMomentJS, moment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
