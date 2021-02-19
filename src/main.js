import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 全局导入样式
import './assets/css/global.css'
// 全局导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'

// 判断处于开发/线上模式
console.log(process.env.NODE_ENV);

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

// 请求拦截器，为每个请求都设置这个字段
axios.interceptors.request.use(config => {
  // 为请求头对象 ，添加Token验证的`Authorization`字段
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
