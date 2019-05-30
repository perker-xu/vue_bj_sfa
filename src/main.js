import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./lib/hotcss/hotcss.js";

// 表单验证插件
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// 引入mint-UI的样式

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
