import checkPermission from '@/utils/permission'

// 使用demo具体请看 @/pages/assetsManage/tenants.vue
export default {
  inserted(el, binding) {
    const {value} = binding

    if (!checkPermission(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      // throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }
  },
}
