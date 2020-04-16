<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserLayout"
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  color: rgba(255, 255, 255, 0.95);
  background: url("../../assets/loginBg.jpg") no-repeat center;
  background-size:100% 100%;
}
</style>
