import { join } from 'path'
import { AxiosRequestConfig, Method } from 'axios'

function get$Axios(){
  return window.$nuxt.$axios
}
const baseUrlSymbol = Symbol('router go baseUrl')

export function Request(method: Method) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue(...args)
      // eslint-disable-next-line prettier/prettier
      const url = join(target[baseUrlSymbol], value.url ?? '')
      return get$Axios().request({
        method,
        ...value,
        url
      })
    }
  }
}

export function RequestBaseUrl(baseUrl: string) {
  return function(target: any) {
    target.prototype[baseUrlSymbol] = baseUrl
  }
}

export type RequestReturn =
  | AxiosRequestConfig
  | Promise<any>
