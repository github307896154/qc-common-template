import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const UserLayout = () => import('layouts/UserLayout/index.vue')
const userLonginComponent = () => import('views/User/Login/index.vue')
const BasicLayout = () => import('layouts/BasicLayout/index.vue')
const homeComponent = () => import('views/Home/index.vue')
/**
 * meta配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *  cache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 * }
 */
const routes = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    children: [
      {
        component: userLonginComponent,
        meta: { title:'登录' },
        name: "login",
        path: "/user/login",
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: BasicLayout,
    meta: {},
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'md-home'
        },
        component:homeComponent
      }
    ]
  },
  // { path: '/*', redirect: '/home', hidden: true }
]
const router = new Router({
  routes
})

export default router