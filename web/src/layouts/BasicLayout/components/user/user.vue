<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :count="messageUnreadCount">
        <Avatar v-if="userAvatar" :src="userAvatar" />
        <Avatar v-else>{{$store.state.login.userName}}</Avatar>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          操作提醒<Badge style="margin-left: 10px" :dot="!!messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="userInfo">我的信息</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import Vue from "vue";
import {
  DropdownMenu,
  Dropdown,
  DropdownItem,
  Badge,
  Icon,
  Avatar
} from "view-design";
Vue.component("DropdownMenu", DropdownMenu);
Vue.component("DropdownItem", DropdownItem);
Vue.component("Dropdown", Dropdown);
Vue.component("Badge", Badge);
Vue.component("Icon", Icon);
Vue.component("Avatar", Avatar);
export default Vue.extend({
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: ""
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    //登出
    logout() {
      this.$store.dispatch("login/handleLogOut").then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    //显示提示信息
    message() {
      this.$emit("openMessage");
    },
    //跳转我的信息页面
    goToUserInfo() {
      this.$router.push({
        name: "user_info"
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
        case "userInfo":
          this.goToUserInfo();
          break;
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.user-avatar-dropdown {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  >>> .ivu-badge-count {
    top: 10px;
  }
}
</style>
