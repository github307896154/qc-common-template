import { showTitle } from 'utils/lib'
export default {
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1)
    },
    getNameOrHref (item, children0) {
      return item.funUrl ? `${item.path}-${item.path}` : (children0 ? item.children[0].path : item.name)
    }
  }
}
