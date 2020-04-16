<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else-if="item.children[0]" :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <svg v-if="item.children[0].meta.iconType==='svg'" class="icon" style="margin-right:5px;" aria-hidden="true">
              <use :xlink:href="item.children[0].meta&&item.children[0].meta.icon"></use>
            </svg>
            <Icon v-else :type="item.children[0].meta&&item.children[0].meta.icon"></Icon>
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.name}`">
            <svg v-if="item.meta.iconType==='svg'" class="icon" style="margin-right:5px;" aria-hidden="true">
              <use :xlink:href="item.meta&&item.meta.icon"></use>
            </svg>
            <Icon v-else :type="item.meta&&item.meta.icon"></Icon>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <!-- 后期再添加 -->
    <!-- <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">
            <common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)" /></a>
        </Tooltip>
      </template>
    </div> -->
  </div>
</template>
<script>
import Vue from "vue";
import { Menu, MenuItem } from "view-design";
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
import SideMenuItem from "./side-menu-item.vue";
import { getUnion } from "@/utils/lib";
import mixin from "./mixin";
export default Vue.extend({
  name: "SideMenu",
  mixins: [mixin],
  components: {
    SideMenuItem
  },
  props: {
    //菜单集合
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    //是否展开
    collapsed: {
      type: Boolean
    },
    //主题
    theme: {
      type: String,
      default: "dark"
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: {
      type: Boolean,
      default: true
    },
    activeName: {
      type: String,
      default: ""
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openedNames: []
    };
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    //获取应该打开的菜单的name
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    //更新打开的菜单
    updateOpenName(name) {
      if (name === this.$config.homeNmae) this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    }
  },
  computed: {
    textColor() {
      return this.theme === "dark" ? "#fff" : "#495060";
    }
  },
  watch: {
    activeName(name) {
      if (this.accordion)
        //是否开启面包屑
        this.openedNames = this.getOpenedNamesByActiveName(name);
      else
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(name)
        );
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  mounted() {
    this.openedNames = getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  }
});
</script>
<style lang="scss">
.side-menu-wrapper {
  user-select: none;
  .menu-collapsed {
    padding-top: 10px;
    .ivu-dropdown {
      width: 100%;
      .ivu-dropdown-rel a {
        width: 100%;
      }
    }
    .ivu-tooltip {
      width: 100%;
      .ivu-tooltip-rel {
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content {
        .ivu-tooltip-arrow {
          border-right-color: #fff;
        }
        .ivu-tooltip-inner {
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a {
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
}
.menu-title {
  padding-left: 6px;
}
</style>
