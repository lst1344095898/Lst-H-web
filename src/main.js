import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from "./router/router";
import axios from "./axios/axios";
import 'element-ui/lib/theme-chalk/index.css';
import UserUtils from "./utils/UserUtils";

//将封装好的axios设置引入axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  el:'#app',
  router: router,
  userUtils: UserUtils,
  render: h => h(App),
}).$mount('#app')
