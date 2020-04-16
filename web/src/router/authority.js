import { LoadingBar } from 'view-design'
import router from './index'
import config from 'config'
import store from 'store'
import { setTitle,downslashAndInitialsCapitalize } from 'utils/lib'
const LOGIN_PAGE_NAME = 'login'
const HOME_NAME =config.homeName
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  const isUser = true//to.meta.isUserLayout
  if(window.sessionStorage.getItem('userID')){
    store.commit('login/setLoginStatus','login');
  }
  const isLogin = store.state.login.status;
  if (!isLogin && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
    LoadingBar.finish(); // finish progress bar
  } else if (!isLogin && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (isLogin && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: HOME_NAME // 跳转到homeName页
    })
    LoadingBar.finish(); // finish progress bar
  } else { 
    if (store.state.login.hasGetRouter) {
      next()
    } else {
      store.dispatch('login/getUserRouter').then(rst => {
        store.commit('router/setFunList',store.state.login.routerList)   
        router.addRoutes(store.state.router.funList) // 动态添加可访问路由表
        next({name:to.name?to.name:to.path.split('/')[2],replace: true })//如果是首页直接跳转
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})

router.afterEach(to => {
  config.isShowTitle&&setTitle(to,config.title)
  LoadingBar.finish(); // finish progress bar
  window.scrollTo(0, 0)
})
