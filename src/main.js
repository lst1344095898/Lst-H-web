import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from "./router/router";
import axios from "./axios/axios";

//将封装好的axios设置引入axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
