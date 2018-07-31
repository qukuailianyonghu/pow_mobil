// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import './assets/icon/iconfont.css'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
// Vue.use(scroll,{componentName: 'scroll-seamless'})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
