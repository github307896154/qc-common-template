// export default {
//   bind: (el, binding,vnode) => {
//     const modelDirective = vnode.data.directives.find((directive) => directive.name === 'model')
//     if (!modelDirective) {
//       console.warn('v-model required')
//     }
//   },
//   update: (el, {value},vnode) => {
//     const modelDirective = vnode.data.directives.find((directive) => directive.name === 'model')
//     try {
//       console.log(el,value);
//       el.value = el.value.replace(new RegExp(value, 'gi'), '')
//       if (modelDirective) {
//         modelDirective.modifiers.lazy? el.dispatchEvent(new Event('change')) : el.dispatchEvent(new Event('input'))
//       }
//     } catch (e) {
//     }
//   }
// }
export default {
  bind: (el, binding,vnode) => {
    const modelDirective = vnode.data.model
    if (!modelDirective) {
      console.warn('v-model required')
    }
  },
  update: (el, {value},vnode) => {
    const modelDirective = vnode.data
    console.log(modelDirective);
    try {
      value=value?value:/[~!@#$^&*{}\[\]\r\n]/
      const input=el.querySelector('input')||el.querySelector('textarea')
      input.value = input.value.replace(new RegExp(value, 'gi'), '')
      if (modelDirective) {
        input.dispatchEvent(new Event('input'))
      }
    } catch (e) {
    }
  }
}
