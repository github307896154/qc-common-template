<template>
  <div class="index" :style="{height:devHeight + 'px'}">
    <div class="logo-back">
      <div class="logo-img">
      </div>
      <div class="logo-text">
        公车APP
      </div>
    </div>
    <div class="login-main">
      <div class="change-way">
        <div>登录</div>
      </div>
      <div class="login-input">
        <div class="imput-main">
          <input type="text" v-model.trim="gcUser.user" placeholder="请输入帐号名称" autocapitalize="none"/>
        </div>
      </div>
      <div style="overflow:hidden">
        <div class="login-input">
          <div class="imput-main">
            <input type="password" v-model="gcUser.password" placeholder="请输入密码" />
          </div>
        </div>
      </div>
      <div>
        <div class="submitButtom" @click="userSubmit()">
          <span>登</span>
          <span style="padding-left:30px;">录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import store from "store";
export default {
  name: "login",
  data() {
    return {
      gcUser: {
        user: "",
        password: ""
      },
      devHeight: "",
      clientID: ""
    };
  },
  methods: {
    //登录
    userSubmit() {
      this.$loading.show();
      const password = md5(String(this.gcUser.password))
        .substring(8, 24)
        .toUpperCase();
      store
        .dispatch("login/handleLogin", {
          account: this.gcUser.user,
          password
        })
        .then(r => {
          this.$loading.hide();
          this.submitting = false;
          this.$router.replace("/" + this.$config.homeName);
        })
        .catch(err => {
          this.submitting = false;
        });
    }
  },
  created() {
    if (mui.os.plus) {
      this.devHeight = window.screen.height;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/main.scss";
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #cccccc;
  /* placeholder字体大小  */
  font-size: px2rem(30);
  /* placeholder位置  */
  text-align: left;
}
.index {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  background-size: 100% 100%;
  .logo-back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: px2rem(520);
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: px2rem(43);
    color: #3b3a4a;
    background: url("~@/assets/img/bg.png") no-repeat;
    background-size: 100%;
    text-align: center;
    overflow: hidden;

    .logo-img {
      background: url("~@/assets/img/logo.png") no-repeat;
      background-size: 100%;
      width: px2rem(120);
      height: px2rem(80);
      margin: 0 auto;
      margin-top: px2rem(130);
    }

    .logo-text {
      margin-top: px2rem(40);
      font-size: px2rem(40);
      color: #ffffff;
      font-weight: 600;
    }
  }
  .login-main {
    position: absolute;
    top: px2rem(400);
    left: px2rem(50);
    width: px2rem(650);
    z-index: 1000;
    border-radius: 10px;
    padding-left: px2rem(66);
    padding-right: px2rem(66);
    box-shadow: 23px 46px 140px #dddddd;
    background: #ffffff;
    .change-way {
      width: 100%;
      line-height: px2rem(120);
      text-align: center;
      overflow: hidden;
      div {
        width: 100%;
        color: #333333;
        font-weight: 600;
        margin-bottom: 0.53333rem;
        font-size: 0.768rem;
        letter-spacing: 20px;
        text-indent: 20px;
      }
    }
  }
  .login-input {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px #e5e5e5 solid;
    .imput-main {
      width: 100%;
      height: px2rem(64);
      margin-top: px2rem(40);
      margin-bottom: px2rem(40);

      input {
        line-height: px2rem(34) !important;
        height: px2rem(40) !important;
        width: px2rem(450) !important;
        padding: 0px 0px !important;
        color: #999999 !important;
        background-color: transparent !important;
        margin-bottom: 0px !important;
        border: 0px;
        font-size: px2rem(28);
      }
    }

    span {
      font-size: px2rem(44);
      height: px2rem(44);
      line-height: px2rem(44);
      color: #ffffff;
    }
  }
  .submitButtom {
    margin-top: px2rem(45);
    height: px2rem(98);
    line-height: px2rem(98);
    width: 100%;
    font-weight: 600;
    font-size: px2rem(30);
    color: #ffffff;
    background-color: #2b637b;
    border-radius: px2rem(15);
    text-align: center;
    box-shadow: 0 18px 36px #b4c2ff;
    margin-bottom: px2rem(100);
  }
  .submitButtom:active {
    background-color: #2fa0fa;
  }
}
.backServer {
  position: absolute;
  top: px2rem(1100);
  left: 0;
  width: 100%;
  margin-top: px2rem(40);
  font-size: px2rem(26);
  line-height: px2rem(32);
  color: #3b3a4a;
  text-align: center;
}
</style>