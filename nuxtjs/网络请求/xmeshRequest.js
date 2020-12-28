// window.$nuxt.$axios nuxt 依赖注入的ajax 请求库
// Message 依赖注入的 element message 方法, 用其他库的话需要重新注入

import {Message} from '@femessage/element-ui'

export default async function xmeshRequest(method, url, options = {}) {
  const {success, error, data, complete, successMsg, errorMsg} = options

  // window.$nuxt.$axios 是之前封装好的请求库
  let result = await window.$nuxt.$axios[method](url, data)

  if (result && result.code === '0') {
    if (successMsg) {
      Message({
        type: 'success',
        message: successMsg,
      })
    }

    if (success) {
      success(result)
    }
  } else {
    if (errorMsg) {
      Message({
        type: 'error',
        message: errorMsg,
      })
    }

    if (error) {
      error(result)
    }
  }

  if (complete) {
    complete(result)
  }

  return result
}
