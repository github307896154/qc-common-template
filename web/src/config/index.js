export default {
  /**
   * @description 是否根据当前打开页面显示标题
   */
  isShowTitle: true,
  /**
   * @description 配置默认显示在浏览器标签的title
   */
  title: 'WEB',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '正式地址',
    pro: '测试地址',
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 系统名
   */
  sysName:'WEB',
  /**
   *  @description 全屏按钮全屏的dom
   *  @param 'body'或者指定id//只能展示无法操作
   */
  magnificationRule:'body',
  /**
   *  @description keep-alive 最大缓存数量
   *  @param 缓存页面 超过数量会优先淘汰最近没有打开的页面
   */
  keepAliveMax:3,
}