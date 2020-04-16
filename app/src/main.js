require('babel-polyfill')
import Vue from "vue";
import VueRouter from "vue-router";
import App from '@/App.vue'
Vue.use(VueRouter)
import store from '@/store'
import router from '@/router'
import mui from 'utils/mui/js/mui.js'
import 'utils/mui/css/mui.min.css'
import 'router/authority.js'//判断是否登录 添加跳转动画
import config from 'config'
import loading from '_c/loading'
import rem from 'utils/rem'
Vue.use(loading);
rem(); //屏幕自适应 宽度16等分
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
