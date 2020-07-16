// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/js/rem'
import '../static/mui/css/mui.min.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

import Mint from 'mint-ui'; //mint-ui的全部组件
import 'mint-ui/lib/style.css'
Vue.use(Mint) //使用MintUI

import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios,qs);
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'

import store from './vuex/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'

})
