import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/User.vue'
import Roles from '../components/power/Roles.vue'
import Rights from '../components/power/Rights.vue'
import goodList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Params from '../components/goods/Params.vue'


Vue.use(VueRouter)

// const routes = [
//   {path: '/',redirect:'/login'},
//   { path: '/login',name: 'Login',component: Login},
//   { path: '/home',component: Home},
//   // {
//   //   path: '/about',
//   //   name: 'About',
//   //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   // }
// ]

const router = new VueRouter({
  routes : [
    {path: '/',redirect:'/login'},
    { path: '/login',name: 'Login',component: Login},
    { path: '/home',component: Home, redirect:'/welcome', children:[
      {path: '/welcome',component: Welcome},
      {path: '/users',component: Users},
      {path: '/roles',component: Roles},
      {path: '/rights',component: Rights},
      {path: '/params',component: Params},
      {path: '/goods',component: goodList},
      {path: '/Add',component: Add},
    ]},
  ]
})

// 挂载路由导航守卫，控制意外访问到有权限页面
// to 将要到那个页面去
// from 从那个页面跳转来
// next() 放行  next('/login') 强制登录
router.beforeEach((to, from, next) =>{
  if(to.path == '/login') return next()
  // 获取token
  let tokenStr =  window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})



export default router
