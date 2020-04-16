<template>
  <Drawer title="操作提醒" :closable="false" v-model="show">
    <Card v-for="item in reminderList" :key="item.funID" @click.native="showReminder(item.funUrl)">
      <h3 class="title">{{item.title}}</h3>
      <div>{{item.context?item.context.replace('x',item.count):""}}</div>
      <div class="btn">前往处理</div>
    </Card>
  </Drawer>
</template>

<script>
import Vue from "vue";
import { Drawer,Card } from "view-design";
Vue.component("Drawer", Drawer);
Vue.component("Card", Card);
import store from "store";
export default Vue.extend({
  name: "OperationReminder",
  props:{
    //列表一
    reminderList:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      show: false,
    };
  },
  methods:{
    openModal(){
      this.show=true;
    },
    showReminder(url){
      this.show=false;
      this.$store.commit('login/deleteReminderList',url);
      this.$emit('goToUrl',url)
    }
  }
});
</script>

<style lang='scss' scoped>
.title{
  padding-bottom: 16px;
  color: #fa795e;
}
.btn{
  padding-top: 16px;
  color: #2d8cf0;
  text-align: right;
  cursor: pointer;
}
</style>
