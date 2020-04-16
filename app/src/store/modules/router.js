import { downslashAndInitialsCapitalize } from '@/utils/lib'
const BasicLayout = () => import('layouts/BasicLayout/index.vue')
const state = {
  funList: undefined
}

const mutations = {
  getFunList(state) {
    return state.funList
  },
  setFunList(state, useFun) {
    let routerList = [];
    useFun.forEach(fun => {
      let router = {
        path: fun.funUrl,
        name: fun.funUrl,
        component: BasicLayout,
        meta: {
          title: fun.funName,
          cache: fun.cache ? true : false,
          icon: fun.funIcon,
          iconType: fun.iconType
        },
        children: []
      };
      let children = Array.prototype.slice.call(fun.children)
      if (children.length > 0) {
        children.forEach(c => {
          const url = downslashAndInitialsCapitalize(fun.funUrl) + '/' + downslashAndInitialsCapitalize(c.funUrl)
          router.children.push({
            path: c.funUrl,
            name: c.funUrl,
            meta: {
              title: c.funName,
              cache: c.cache ? true : false,
              icon: c.funIcon,
              iconType: c.iconType,
              id:c.funID
            },
            component: resolve => (require(['views/' + url], resolve)),
          });
        });
      }
      routerList.push(router)
    });
    state.funList = routerList
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
