<template>
  <div class="qccomboBoxTree">
    <Input v-model="nodeText" :placeholder="placeholder" @on-keyup="keyUp" @on-focus="showTree" autocomplete="off"></Input>
    <div v-if="!filter">
      <Tree :data="root" v-if="show" class="qctree" @on-select-change="selectedNodes"></Tree>
    </div>
    <div v-if="filter">
      <div class="qctree">
        <div class="item" v-for="item in filterList" :key="item.nodeID" @click="selectedNodes(null,item)">
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Tree, Input } from "view-design";
import {objectArrayFlat} from "utils/lib"
Vue.component("Tree", Tree);
export default Vue.extend({
  /**
   * @param:root--> tree的根节点
   * @param:selectText -->input默认赋值
   * @param:placeholder -->原生placeholder
   */
  props: ["root", "selectText", "placeholder"],
  data() {
    return {
      show: false, //tree的打开关闭开关
      filterList: [], //tree数据展示集合
      filter: false,
      array: [], //tree数据的平面集合 用于快速搜索
      focus: false, //鼠标点击落点 是否在tree面板上
      nodeText: this.selectText
    }; 
  },
  methods: {
    //打开tree面板
    showTree() {
      this.show = !this.show;
      this.filter = false;
    },
    //关闭tree面板
    closeTree() {
      //延迟关闭 主要解决延时触发blur 失焦点
      setTimeout(() => {
        if (!this.focus) {
          //因为加了搜索功能  关闭在初始化显示面板数据
          this.show = false;
        }
      }, 300);
    },
    //选择节点 接收子组件传递node
    selectedNodes(tree, node) { 
      this.nodeText = node.title;
      this.show = false;
      this.filter = false;
      this.$emit("selectedNode", node.groupID);
    },
    //输入收索
    keyUp(event) {
      if (this.nodeText == "") {
        this.filter = false;
        return;
      }
      this.filter = true;
      this.filterList = [];
      this.root.filter(r => {});
      for (var i = 0; i < this.array.length; i++) {
        let node = this.array[i];
        if (node.title.includes(this.nodeText)) {
          this.filterList.push(node);
        }
      }
    },
    //初始化平面array数组
    initArray(root) {
      this.array=objectArrayFlat(root,"children",true);
    }
  },
  mounted: function() {
    this.array = [];
    if (this.root) {
      this.initArray(this.root);
    }
  },
  watch: {
    root: function(newValue, oldValue) {            
      this.array=[];
      this.initArray(newValue);
    },
    selectText: function(newValue) {
      if(newValue){
        this.nodeText = newValue;
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.qccomboBoxTree {
  display: inline-block;
  position: relative;
  line-height: normal;
}
.qctree {
  position: absolute;
  display: block;
  width: 100%;
  background: #ffffff;
  border: 1px solid #dddee1;
  border-radius: 4px;
  padding: 0 15px;
  z-index: 1000;
  max-height: 300px;
  overflow: auto;
  line-height: 20px;
}
</style>