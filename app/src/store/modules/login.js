import {
  login,
  logout
} from '@/api/user'
import {
  getFunctions
} from '@/api/router'
import axios from "utils/axios"
const state = {
  status: undefined,
  type: undefined,
  userName: '',
  userID: '',
  roleID: '',
  avatarImgPath: '',
  hasGetRouter: false,
  routerList: [],//路由列表
}

const mutations = {
  setAvatar(state, avatarPath) {
    state.avatarImgPath = avatarPath
  },
  setUserID(state, id) {
    state.userID = id
  },
  setUserName(state, name) {
    state.userName = name
  },
  setLoginStatus(state, status) {
    state.status = status
  },
  setAccess(state, access) {
    state.access = access
  },
  setRoleID(state, roleID) {
    state.roleID = roleID
  },
  setHasGetRouter(state, status) {
    state.hasGetRouter = status
  },
  setRouterList(state, functionList) {
    state.routerList = functionList
  }
}
const getters = {
}

const actions = {
  // 登录
  handleLogin({ commit }, { account, password }) {
    account = account.trim()
    return new Promise((resolve, reject) => {
      login({
        account,
        password
      }).then(res => {
        const data = res.data
        commit('setLoginStatus', 'login')
        commit('setUserID', data.rows[0].userID)
        commit('setUserName', data.rows[0].userName)
        commit('setAccess', data.rows[0].account)
        commit('setRoleID', data.rows[0].roleID)
        window.sessionStorage.setItem(
          "Access-Token",
          res.headers["access-token"]
        );
        axios.defaults.headers.common["Access-Token"] =
          res.headers["access-token"];
        window.sessionStorage.setItem("userID", data.rows[0].userID);
        window.sessionStorage.setItem("pwd", this.pwd);
        window.sessionStorage.setItem("userName", data.rows[0].userName);
        window.sessionStorage.setItem("account", data.rows[0].account);
        window.sessionStorage.setItem("roleID", data.rows[0].roleID);
        window.sessionStorage.setItem("groupID", data.rows[0].groupID);
        window.sessionStorage.setItem("linkTel", data.rows[0].linkTel);
        window.sessionStorage.setItem("companyID", data.rows[0].companyID);
        window.sessionStorage.setItem(
          "companyName",
          data.rows[0].companyName
        );
        window.sessionStorage.setItem("groupName", data.rows[0].groupName);
        window.sessionStorage.setItem("epID", data.rows[0].epID);
        window.sessionStorage.setItem("epName", data.rows[0].epName);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoginStatus', undefined)
      commit('setAccess', '')
      commit('setUserID', '')
      window.sessionStorage.clear();
      resolve()
      // logout(state.token).then(() => {
      //   // commit('setToken', '')
      //   commit('setLoginStatus', undefined)
      //   commit('setAccess', [])
      //   commit('setUserID', '')
      //   resolve()
      // }).catch(err => {
      //   reject(err)
      // })
    })
  },
  // 获取用户相关信息
  getUserRouter({ state, commit }) {
    return new Promise((resolve, reject) => {
      getFunctions(0).then(res => {
        commit('setRouterList',res.data.rows)
        commit('setHasGetRouter', true)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
