import Vue from "vue";
import App from "./App.vue";
import Notice from "./components/Notice.vue";
import "./plugins/element.js";

// import router from './router'
// import router from "./krouter";
import router from "./zrouter";

// import store from './store'
import store from "./zstore";
// import store from "./kstore";
import create from "./utils/create";

import '@/icon'

Vue.config.productionTip = false;

Vue.prototype.$notice = function(opts) {
  const comp = create(Notice, opts);
  comp.show();
  return comp;
};

// 事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
