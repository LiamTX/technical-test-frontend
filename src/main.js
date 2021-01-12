import Vue from 'vue'
import App from './App.vue'
import './assets/index.scss'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import defaultOptionsObject from './utils/iziToast'

Vue.use(VueIziToast, defaultOptionsObject);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
