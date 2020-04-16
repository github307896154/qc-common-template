import Loading from './loading.vue'

let $vm
export default {
    /**
     * 每个插件都有的install方法，用于安装插件
     * @param {Object} Vue - Vue类
     * @param {Object} [pluginOptions] - 插件安装配置
     */
    install(Vue, pluginOptions = {}) {
        // 创建"子类"方便挂载
        const VueLoading = Vue.extend(Loading)
        if (!$vm) {
            var el = document.createElement('div');
            document.body.appendChild(el)
            $vm = new VueLoading({
                el: el
            })
        }
        Vue.$loading = $vm
        Vue.prototype.$loading = $vm
    }
}