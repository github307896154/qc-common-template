<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <svg v-if="parentItem.meta.iconType==='svg'" class="icon" style="margin-right:5px;" aria-hidden="true">
        <use :xlink:href="parentItem.meta&&parentItem.meta.icon"></use>
      </svg>
      <Icon v-else :type="parentItem.meta&&parentItem.meta.icon"></Icon>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <MenuItem v-else :name="getNameOrHref(item, true)">
        <span>{{ showTitle(item.children[0]) }}</span>
        </MenuItem>
      </template>
      <template>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <MenuItem v-else :name="getNameOrHref(item)">
        <svg v-if="item.meta.iconType==='svg'" class="icon" style="margin-right:5px;" aria-hidden="true">
          <use :xlink:href="item.meta&&item.meta.icon"></use>
        </svg>
        <Icon v-else :type="item.meta&&item.meta.icon"></Icon>
        <span>{{ showTitle(item) }}</span>
        </MenuItem>
      </template>
    </template>
  </Submenu>
</template>
<script>
import Vue from "vue";
import { Submenu, Icon, MenuItem } from "view-design";
import mixin from "./mixin";
import itemMixin from "./item-mixin";
Vue.component("Submenu", Submenu);
Vue.component("MenuItem", MenuItem);
Vue.component("Icon", Icon);
export default Vue.extend({
  name: "SideMenuItem",
  mixins: [mixin, itemMixin]
});
</script>
<style lang="scss" scoped>
</style>