import {
  login,
  getRemind,
  getUserByID
} from '@/api/user'
import {
  getFunctionsByUserID
} from '@/api/router.js'
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
  reminderList: [],//未处理信息
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
  },
  setReminderList(state, list) {
    state.reminderList = list
  },
  deleteReminderList(state, url) {
    let list = state.reminderList;
    state.reminderList = list.filter(m => m.funUrl !== url)
  }
}
const getters = {
  unreminderCount: (state) => {
    let count = 0;
    state.reminderList.forEach(element => {
      count += element.count
    });
    return count;
  }
}

const actions = {
  // 登录
  handleLogin({ commit, dispatch }, { account, password }) {
    account = account.trim()
    return new Promise((resolve, reject) => {
      login({
        account,
        password
      }).then(res => {
        const data = res.data.rows[0]
        commit('setLoginStatus', 'login')
        commit('setUserID', data.userID)
        commit('setUserName', data.userName)
        commit('setAccess', data.account)
        commit('setAvatar', data.photoUrl)
        commit('setRoleID', data.roleID)
        window.sessionStorage.setItem(
          "Access-Token",
          res.headers["access-token"]
        );
        axios.defaults.headers.common["Access-Token"] =
          res.headers["access-token"];
        window.sessionStorage.setItem("userID", data.userID);
        window.sessionStorage.setItem("pwd", this.pwd);
        window.sessionStorage.setItem("userName", data.userName);
        window.sessionStorage.setItem("account", data.account);
        window.sessionStorage.setItem("roleID", data.roleID);
        window.sessionStorage.setItem("groupID", data.groupID);
        window.sessionStorage.setItem("linkTel", data.linkTel);
        window.sessionStorage.setItem("companyID", data.companyID);
        window.sessionStorage.setItem(
          "companyName",
          data.companyName
        );
        window.sessionStorage.setItem("groupName", data.groupName);
        window.sessionStorage.setItem("epID", data.epID);
        window.sessionStorage.setItem("epName", data.epName);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoginStatus', undefined);
      commit('setAccess', '');
      commit('setUserID', '');
      commit('setHasGetRouter', false);
      window.sessionStorage.clear();
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
