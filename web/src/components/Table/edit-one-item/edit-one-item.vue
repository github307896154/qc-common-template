<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditting" class="tables-edit-con" :class="{'showbtn':editable}">
      <span class="value-con">{{ value }}</span>
      <Button @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text">
        <Icon type="md-create"></Icon>
      </Button>
    </div>
    <div v-else class="tables-editting-con">
      <Input v-model="editValue" class="tables-edit-input" />
      <Button @click="saveEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-checkmark"></Icon>
      </Button>
      <Button @click="canceltEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-close"></Icon>
      </Button>
    </div>
  </div>

</template>

<script>
// return h(TableEditOne, {
//   props: {
//     params: params,
//     value: this.businessData[params.index][params.column.key],
//     edittingCellId: this.edittingCellId,
//     editable: false
//   },
//   on: {
//     input: val => {
//       this.edittingText = val;
//     },
//     "on-start-edit": params => {
//       this.edittingCellId = `editting-${params.index}-${params.column.key}`;
//     },
//     "on-cancel-edit": params => {
//       this.edittingCellId = "";
//     },
//     "on-save-edit": (params, val) => {
//       console.log(val);
//       // this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
//       this.edittingCellId = "";
//     }
//   }
// });
import Vue from "vue";
import { Input, Button, Icon } from "view-design";
Vue.component("Input", Input);
Vue.component("Button", Button);
Vue.component("Icon", Icon);
export default Vue.extend({
  name: "EditiOneItem",
  props: {
    //显示的值
    value: [String, Number],
    //当前点击的id判断哪一行需要编辑
    edittingCellId: String,
    //行数据
    params: Object,
    //是否默认显示编辑图标
    editable: Boolean
  },
  data() {
    return {
      editValue: this.value
    };
  },
  computed: {
    isEditting() {
      return (
        this.edittingCellId ===
        `editting-${this.params.index}-${this.params.column.key}`
      );
    }
  },
  methods: {
    // handleInput(val) {
    //   this.$emit("input", val);
    // },
    startEdit() {
      this.$emit("on-start-edit", this.params);
    },
    saveEdit() {
      this.$emit("on-save-edit", this.params, this.editValue);
    },
    canceltEdit() {
      this.$emit("on-cancel-edit", this.params);
    }
  }
});
</script>

<style lang="scss">
.tables-edit-outer {
  height: 100%;
  .tables-edit-con {
    position: relative;
    height: 100%;
    .value-con {
      vertical-align: middle;
    }
    .tables-edit-btn {
      position: absolute;
      right: 10px;
      top: -5px;
      display: none;
    }
    &:hover {
      .tables-edit-btn {
        display: inline-block;
      }
    }
  }
  .showbtn {
    .tables-edit-btn {
      display: inline-block;
    }
  }
  .tables-editting-con {
    .tables-edit-input {
      width: calc(100% - 60px);
    }
  }
}
</style>
