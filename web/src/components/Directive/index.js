import EditFilter from './edit-filter'

const importDirective = Vue => {
  /**
   * 拖拽指令 v-edit-filter
   * 对输入内容进行过滤
   */
  Vue.directive('edit-filter',EditFilter)
}

export default importDirective
