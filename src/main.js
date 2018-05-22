import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './app'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './filters'
import './mock/mockServer.js'
import loading from './common/image/loading.gif'

// 注册使用 vueLazyload
Vue.use(VueLazyload,{
  loading
}) // 全局组件 有了v-lazt指令

// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store // 使用上vuex
})
