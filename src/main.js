import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './app'
import router from './router'
import store from './store'

import './mock/mockServer.js'

// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store // 使用上vuex
})
