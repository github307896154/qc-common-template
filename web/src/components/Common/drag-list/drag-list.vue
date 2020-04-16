<template>
  <div class="drag-list-wrapper">
    <div class="drag-list-con con1">
      <slot name="left-title"></slot>
      <draggable class="drop-box1 drop-box" :class="dropConClass.left" :options="options" :value="list1" @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')">
        <div class="drag-list-item" v-for="(itemLeft,index) in list1" :key="`drag_li1_${index}`" :class="{'undraggable':itemLeft.isDrag}">
          <slot name="left" :itemLeft="itemLeft">{{ itemLeft }}</slot>
        </div>
      </draggable>
    </div>
    <div class="drag-list-con con2">
      <slot name="right-title"></slot>
      <draggable class="drop-box2 drop-box" :class="dropConClass.right" :options="options" :value="list2" @input="handleListChange($event, 'right')" @end="handleEnd($event, 'right')">
        <div class="drag-list-item" v-for="(itemRight,index) in list2" :key="`drag_li2_${index}`" :class="{'undraggable':itemRight.isDrag}">
          <slot name="right" :itemRight="itemRight">{{ itemRight }}</slot>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "DragList",
  components: {
    draggable
  },
  props: {
    //拖动左边list数据
    list1: {
      type: Array,
      required: true
    },
    //拖动右边list数据
    list2: {
      type: Array,
      default: () => []
    },
    //样式({left:"",right:""})
    dropConClass: {
      type: Object,
      default: () => ({})
    },
    //插件配置 不懂可以参考文章(https://www.jianshu.com/p/03f0f58f84cc) gruop相同可以互相拖动
    options: {
      type: Object,
      default: () => ({ group: "drag_list" })
    }
  },
  methods: {
    handleListChange(value, type) {
      if (type === "left") this.$emit("update:list1", value);
      else this.$emit("update:list2", value);
    },
    handleEnd(event, type) {
      const srcClassName = (event.srcElement || event.target).classList[0];
      const targetClassName = event.to.classList[0];
      let target = srcClassName === targetClassName?type:this.getNegate(type);
      this.$emit("on-change", {
        src: type,//拖动的列表
        target: target,//放置的列表
        oldIndex: event.oldIndex,//拖动时索引
        newIndex: event.newIndex//拖动后的索引
      });
    },
    getNegate(direction){
      return direction==='left'?'right':'left';
    }
  }
};
</script>
<style lang="scss">
.drag-list-wrapper {
  height: 100%;
  .drag-list-con {
    width: 50%;
    float: left;
  }
}
.drop-box{
  height: 100%;
  overflow-y:scroll;
}
.drop-box::-webkit-scrollbar {
    display: none;
}
</style>
