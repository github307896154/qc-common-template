<template>
  <div>
    <keep-alive :include="cacheList">
      <router-view>
      </router-view>
    </keep-alive>
  </div>

</template>
<script>
export default {
  name: "BasicLayout",
};
</script>
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
