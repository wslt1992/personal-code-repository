import { join } from 'path'
import VueRouter from 'vue-router'
import { Location } from 'vue-router/types/router'
let $router: VueRouter
setTimeout(() => {
  $router = window.$nuxt.$router
})
export function RouterGO(baseUrl: string) {
  function isLocation(path: any): path is Location {
    if (!path.path) {
      throw new Error('path不能为空')
    }
    return true
  }
  return function<T extends { new (...args: any[]): any }>(constructor: T) {
    Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
      if (name === 'constructor') {
        return
      }
      const originalFunction = constructor.prototype[name]
      constructor.prototype[name] = function() {
        const path = originalFunction(...arguments)
        if (typeof path === 'string') {
          return $router.push(join(baseUrl, path))
        }
        if (isLocation(path)) {
            // eslint-disable-next-line prettier/prettier
            path.path = join(baseUrl, path.path ?? '')
            return $router.push(path)
        }
      }


    })
    return class extends constructor {}
  }
}
