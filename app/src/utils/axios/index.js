import axios from 'axios' //全局配置axios
// import VueAxios from 'vue-axios'
import Qs from 'qs'
import config from 'config'
import Vue from 'vue'
axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (window.sessionStorage.getItem("Access-Token") != "") {
    axios.defaults.headers.common['Access-Token'] =
        window.sessionStorage.getItem("Access-Token");
}
// 请求的拦截器
axios.interceptors.request.use(function (config) {
    const uid = window.sessionStorage.getItem("userID")
    // 判断请求的类型
    // 如果是post请求就把默认参数拼到data里面
    // 如果是get请求就拼到params里面
    if (config.method === 'post') {
        if (config.headers['Content-Type'] != "multipart/form-data") {
            let data = Qs.parse(config.data)
            config.data = Qs.stringify({
                USERID: uid,
                ...data
            })
        }
    } else if (config.method === 'get') {
        config.params = {
            USERID: uid,
            ...config.params
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
axios.interceptors.response.use( //axios回调 拦截器  后期可以配置一下各种返回码的提示页面如404之类的
    response => {
        if (response.status === 200) {
            if (response.data.code === 0) {
                Vue.prototype.$loading.hide();
                return response
            } else {
                Vue.prototype.$loading.hide();
                Vue.prototype.$Message.info(process.env.NODE_ENV === 'development' ?'操作失败！':response.data.msg);
            }
        }
    },
    err => {
        Vue.prototype.$Spin.hide();
        return Promise.reject(err)
    }
)
export default axios
