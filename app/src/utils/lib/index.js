/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}
/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 */
export const setTitle = (routeItem, title) => {
  window.document.title = (routeItem.meta && routeItem.meta.title) || routeItem.name || title
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num.toString().padStart(2, '0')
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}
/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}
/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}
/**
 * 显示标题
 * @param {Array} item 列表
 * @param {Vue} vm 当前vue示例
 */
export const showTitle = (item, vm) => {
  let { title } = item.meta
  if (!title) return
  title = (item.meta && item.meta.title) || item.name
  return title
}
export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}
/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  for (; len > 0; len--) {
    if (routeEqual(tagNavList[len - 1], routeItem)) {
      res = true;
      break;
    }
  }
  return res
}
/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}
/**
 * @param {String} str 需要转化的带_的字符
 * @description 将_小写字符和首字母转大写字符
 */
export const downslashAndInitialsCapitalize = (str) => {
  str = str.replace(/_(\w)/g, ($0, $1) => $1 ? $1.toUpperCase() : '');
  str = str.replace(/\b(\w)/g, ($0, $1) => $0 ? $0.toUpperCase() : '');
  return str
}

/**
 * @param {String} str 需要补位的字符或者数字
 * @param {Number} number 要补到几位
 * @param {Number} supplement 不够的补什么
 * @description 补位
 */
export const padStart = (str, number, supplement) => {
  str = typeof (str) === 'string' ? str : str.toString();
  return str.padStart(number, supplement);
}

/**
 * @param {String,Date} date 被转化的数据
 * @param {String} param 返回的类型
 * @description 将时间转化为类型为Date的数据 并返回特定格式
 */
export const formatTime = (date, param = 'yyyy-MM-dd hh:mm') => {
  date = typeof (date) === 'string' ? new Date(date.replace(/-/g, '/')) : date;
  const rule = {
    "M+": padStart(date.getMonth() + 1, 2, 0), //月份
    "d+": padStart(date.getDate(), 2, 0), //日
    "h+": padStart(date.getHours(), 2, 0), //小时
    "m+": padStart(date.getMinutes(), 2, 0), //分
    "s+": padStart(date.getSeconds(), 2, 0), //秒
  }
  if (/(y+)/.test(param))
    param = param.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (const r in rule)
    if (new RegExp("(" + r + ")").test(param))
      param = param.replace(
        RegExp.$1,
        rule[r]
      );
  return param;
}
/**
 * @param {String} str 需要首字母大写的数据 
 * @description 将字符首字母转化为大写
 */
export const initialCapital = (str) => {
  return str.replace(/^[a-z]/, ($0) => $0 ? $0.toUpperCase() : $0);
}

/**
 * @param {String} str 需要被替换的字符 
 * @param {String} change 需要替换的字符 
 * @param {String} changed 替换成的字符 
 * @description 将字符首字母转化为大写
 */
export const strReplaceAll = (str, change, changed) => {
  return str.replace(new RegExp(change, 'g'), changed);
}

/**
 * @description form表单 判断手机号规则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    callback('手机号格式不正确');
  } else {
    callback();
  }
};
/**
 * @param {String} str 需要判断是否包含的字符串
 * @param {String} strAll 判断的字符串
 * @description 判断字符串strAll中是否包含str
 */
export const stringIsContain = (str, strAll) => {
  return strAll.indexOf(str) > -1;
}
/**
 * @param {Number} spacedApart 相距当前时间的天数
 * @param {Boolean} endReset 最后一天是算当前时间还是往后加一天的00:00 true:计算为后一天零点
 * @description 获取当前天数前后几天的天数
 */
export const getSeveralTime = (spacedApart, endReset) => {
  const curDate = new Date();
  let startDateTime = endReset ? new Date(curDate.toLocaleDateString()).getTime() : curDate.getTime();
  return new Date(startDateTime + 24 * 60 * 60 * 1000 * spacedApart);
}
/**
 * @param {String} time 转化时间
 * @description //09:00->时间戳
 */
export const turnTimestamp = (time) => {
  if (typeof time === 'string') {
    const timeList = time.split(":");
    return (
      parseInt(timeList[0]) * 60 * 60 * 1000 +
      parseInt(timeList[1]) * 60 * 1000
    );
  }
  return '';
}
/**
 * @param {String} Timestamp 转化时间戳
 * @description //时间戳->09:00
 */
export const turnTime = (Timestamp) => {
  if (typeof Timestamp === 'number') {
    const hourTime = parseInt(Timestamp / (60 * 60 * 1000));
    const minuteTime = Timestamp % (60 * 60 * 1000) / (60 * 1000);
    return (`${padStart(hourTime, 2, '0')}:${padStart(minuteTime, 2, '0')}`);
  }
  return '';
}
/**
 * @param {String} arr 转化的数组
 * @param {String} key 扁平化的对象属性
 * @description //扁平化对象数组
 */
let arrFlat = [];
export const objectArrayFlat = (arr, key, first) => {
  if (first) {
    arrFlat = [];
  }
  arr.forEach(a => {
    if (a[key]) {
      objectArrayFlat(a[key], key, false);
    }
    arrFlat.push(deepClone(a,key))
  })
  return arrFlat;
}
/**
 * @param {String} source 拷贝对象
 * @param {String} key 拷贝过滤key
 * @description //对象深拷贝
 */
export const deepClone = (source,key) => {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)&&keys!==key) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}