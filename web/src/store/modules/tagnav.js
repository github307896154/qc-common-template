import router from 'router'
import config from 'config'
import { setTagNavListInLocalstorage, getTagNavListFromLocalstorage, routeHasExist,routeEqual } from 'utils/lib'
const { homeName } = config

export default {
  state: {
    tagNavList: []
  },
  getters: {
  
  },
  mutations: {
    setTagNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tagIndex = state.tagNavList.findIndex(item => routeEqual(item, route))
      if (tagIndex<0) return
      state.tagNavList.splice(tagIndex,1);
      router.push({name:state.tagNavList[state.tagNavList.length-1].name})
    },
    addTag(state, { route, type = 'unshift' }) {     
      let router ={ ...route }
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }        
    }
  },
  actions: {

  }
}
