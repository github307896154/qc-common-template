require('babel-polyfill')
import Vue from "vue";
import VueRouter from "vue-router";
import 'view-design/dist/styles/iview.css';
// import '@/theme/view-design.less'//考虑自定义主题后期可以加
import 'theme/theme.scss'
import '@/main.scss'
import App from '@/App.vue'
import VueLazyload from 'vue-lazyload'
import {Message,Spin,Modal} from "view-design"
import importDirective from '_c/Directive'
importDirective(Vue)
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin
Vue.use(VueLazyload)
Vue.use(VueRouter)
import store from '@/store'
import router from '@/router'
import 'router/authority.js'//判断是否登录 添加跳转动画
import config from 'config'
Vue.prototype.$config = config
/**
 * @description 全局注册应用配置
 */

new Vue({
    el: '#app', 
    router,
    store,
    template: '<App/>',
    components: { App }
})
