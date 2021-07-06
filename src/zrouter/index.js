import Vue from 'vue'
import VueRouter from './zvue-router'
import Home from '../views/Home.vue'
// 为什么用use  ,作用是是什么
// 插件必须使用use 方法 
// 实现install 方法

//  创建VueRouter类
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children:[
      {
        path: '/about/info',
        component:{render(h){
          return h('div','infoPage')
        }} 
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
