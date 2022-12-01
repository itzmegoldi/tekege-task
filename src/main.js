import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import authToken from "./common/authToken";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://qa5.devaavaz.biz/361-api/v3/";

Vue.prototype.authAxios = axios;
Vue.prototype.tokenAxios = axios.create({
  headers: authToken.tokenHeader(),
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
