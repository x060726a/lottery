// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.css'
import '../static/css/flipclock.css'
import $ from 'jquery'
Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
