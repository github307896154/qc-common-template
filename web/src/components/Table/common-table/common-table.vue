<template>
  <div>
    <Table :stripe="stripe" :border="border" :highlightRow="highlightRow" 
    :columns="tableColumns" :data="tableData" :height="height" size="small"
    :loading="loading" @on-row-click="rowClick" @on-row-dblclick="rowDblclick" ref="commonTable"></Table>
    <div style="margin:5px 0" v-if="showPage">
      <Page :total="page.total" :page-size="page.limit"  :current="page.current" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-elevator></Page>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Table,Page } from "view-design";
Vue.component("Table", Table);
Vue.component("Page", Page);
export default Vue.extend({
  name: "CommonTable",
  props: {
    //表头配置
    tableColumns: {
      type: [Array],
      default: ()=>[]
    },
    //表当数据
    tableData: {
      type: [Array],
      default: ()=>[]
    },
    //是否显示分页
    showPage: {
      type: [Boolean],
      default: false
    },
    //表格高度 默认有分页时候高度 没有分页应该为document.documentElement.clientHeight - 268
    height:{
      type: [Number],
      default:document.documentElement.clientHeight - 300
    },
    //是否显示纵向边框
    border: {
      type: [Boolean],
      default: true
    },
    //是否显示间隔斑马纹
    stripe: {
      type: [Boolean],
      default: true
    },
    //是否单击高亮显示
    highlightRow: {
      type: [Boolean],
      default: true
    },
    //
    page:{
      type: [Object],
      default: ()=>{}
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  methods:{
    //导出Excel
    exportCsv(config){
      return this.$refs.commonTable.exportCsv(config)
    },
    //单击表格
    rowClick(row,index){
      this.$emit("rowClick",row,index);
    },
    //双击表格
    rowDblclick(row,index){
      this.$emit("rowDblclick",row,index);
    },
    //切换分页
    pageChange(index){
      this.$emit("pageChange",index);
    },
    //切换分页size
    pageSizeChange(size){
      this.$emit("pageSizeChange",size);
    }
  }
});
</script>

<style lang='scss' scoped>
</style>
