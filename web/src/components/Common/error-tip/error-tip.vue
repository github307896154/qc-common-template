<template>
  <Modal v-model="modal" width="360" :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>{{title}}</span>
    </p>
    <div style="text-align:center" v-if="!showMsg">
      <p>{{content}}</p>
    </div>
    <div v-if="showMsg">
      <Input v-model="msg" :placeholder="placeholder"></Input>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long @click="del">{{buttonText}}</Button>
    </div>
  </Modal>
</template>

<script>
import Vue from "vue";
import { Modal, Button, Icon } from "view-design";
Vue.component("Modal", Modal);
Vue.component("Button", Button);
Vue.component("Icon", Icon);
export default Vue.extend({
  name: "ErrorTip",
  props: {
    title: {
      type: [String],
      default: "删除确认"
    },
    //是否提交建议
    showMsg:{
      type: [Boolean],
      default: false
    },
    placeholder:{
      type: [String],
      default: "删除原因"
    },
    content: {
      type: [String],
      default: "确认删除本条记录么？"
    },
    buttonText: {
      type: [String],
      default: "删除"
    }
  },
  data() {
    return {
      msg:"",
      modal:false
    }
  },
  methods: {
    openModal(){
      this.modal=true;
    },
    closeModal(){
      this.modal=false;
    },
    del() {
      this.closeModal();
      this.$emit("errorBack",this.msg);
    }
  }
});
</script>