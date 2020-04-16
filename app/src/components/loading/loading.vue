<template>
  <div v-if="isShow" class="loading-bar">
    <div>
      <svg class="loading " aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
      <div class="msg">正在加载...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    /**
     * 显示动画loading
     */
    show() {
      this.isShow = true;
    },
    /**
     * 隐藏动画loading
     */
    hide() {
      this.isShow = false;
    }
  }
};
</script>

<style lang="scss"  scoped>
.loading-bar {
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 999999;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div {
    text-align: center;
    width: 100px;
    height: 100px;
    margin: 0px auto;
    border-radius: 5px;
    background-color: #000000;
    opacity: 0.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading {
    width: 1em;
    height: 1em;
    font-size: 36px;
    color: #ffffff;
    animation: ani-demo-spin 2s linear infinite;
    fill: currentColor;
  }

  .msg {
    margin-top: 5px;
    font-size: 12px;
    color: #ffffff;
  }
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>