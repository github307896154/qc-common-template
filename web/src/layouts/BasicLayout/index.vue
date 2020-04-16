<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con" :style="{textAlign:'center',lineHeight:'64px',color:'#fff'}">
          {{$config.sysName}}
          <!-- <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" /> -->
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <div class="info-box">
          <Icon class="rotate-icon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <div class="custom-content-con">
            <!-- <Icon  type="md-qr-scanner" :style="{margin: '0 20px'}" size="24"></Icon> -->
            <fullscreen class="scanner-icon" v-model="isFullscreen" style="margin-right: 10px;" />
            <user :message-unread-count="unreminderCount" :user-avatar="$store.state.login.avatarImgPath" @openMessage="openMessage" />
          </div>
        </div>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList" :max="$config.keepAliveMax">
              <router-view />
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <OperationReminder :reminderList="reminderList" @goToUrl="turnToPage" ref="userReminder"></OperationReminder>
  </Layout>
</template>
<script>
import Vue from "vue";
import { Layout, Header, Sider, Content, Notice } from "view-design";
import { getUnDispatchApplyTimer } from "api/resources.js";
import "./index.scss";
import { getNewTagList, routeEqual } from "@/utils/lib";
Vue.prototype.$Notice = Notice;
Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Content", Content);
Vue.component("Sider", Sider);
import SideMenu from "./components/side-menu";
import OperationReminder from "./components/operation-reminder";
import TagsNav from "./components/tags-nav";
import User from "./components/user";
import ABackTop from "./components/a-back-top";
import Fullscreen from "./components/fullscreen";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default Vue.extend({
  name: "BasicLayout",
  components: {
    SideMenu,
    Fullscreen,
    TagsNav,
    User,
    ABackTop,
    OperationReminder
  },
  data() {
    return {
      collapsed: false,
      isFullscreen: false,
      dispatchNeedSendList: [],//待派车数据
      dispatchSendNum:0,//带派车变动数量
    };
  },
  computed: {
    ...mapGetters({
      unreminderCount: "login/unreminderCount"
    }),
    reminderList() {
      return this.$store.state.login.reminderList;
    },
    tagNavList() {
      return this.$store.state.tagnav.tagNavList;
    },
    cacheList() {
      const list = [
        ...(this.tagNavList.length
          ? this.tagNavList
              .filter(item => item.meta && item.meta.cache)
              .map(item => item.name)
          : [])
      ];
      return list;
    },
    menuList() {
      return this.$store.state.router.funList;
    }
  },
  methods: {
    ...mapMutations(["setTagNavList", "addTag", "closeTag"]),
    //显示消息提示
    openMessage() {
      this.$refs.userReminder.openModal();
    },
    //打开菜单
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.includes("isTurnByHref_")) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    },
    //获取调度需要派车车单
    getDispatchNeedSend() {
      this.getUnDispatchApply();
      setInterval(() => {
        this.$Notice.close("sendTip");
        this.getUnDispatchApply();
      }, 60000);
    },
    //获取待派车数量
    getUnDispatchApply() {
      getUnDispatchApplyTimer().then(res => {
        this.dispatchNeedSendList=res.data.rows;
      });
    },
    //重新拉取提示信息
    getReminderNum(){
      this.$store.dispatch("login/getReminderList");
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: "push"
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name); //更新左边菜单
    },
    dispatchNeedSendList(newValue,oldValue){
      const num=newValue.filter(m=>!oldValue.some(l=>l.applyID===m.applyID)).length;
      if (num !== 0) {
        this.getReminderNum();
        this.$Notice.info({
          name: "sendTip",
          title: "派车提醒",
          render: h => {
            return h(
              "span",
              {
                style:{
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.turnToPage('dispatch_car');//跳转待派车
                    this.$store.commit('login/deleteReminderList','dispatch_car');//取消待派车提醒数目
                    this.$Notice.close("sendTip");
                  }
                }
              },
              `你有${num}条新的派车单`
            );
          },
          duration: 8
        });
      }
    }
  },
  created() {
    this.$store.dispatch("login/getUserByID",window.sessionStorage.getItem("userID"))
    this.$store.dispatch("resources/getGroup"); 
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList();
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta }
    });
    // this.setBreadCrumb(this.$route)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      });
    }
    //如果有派车页面第一次会刷新
    this.$store.state.router.hasDispatchCar?this.getDispatchNeedSend():this.getReminderNum();
  }
});
</script>