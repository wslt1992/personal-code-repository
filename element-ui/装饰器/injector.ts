const mapInstance = new Map()
const mapTarget = new Map()
export function Injectable(key: string) {
  return function(target: any) {
    if (mapTarget.has(key)) {
      throw new Error(`Injector中${key}重名`)
    }
    mapTarget.set(key, target)
  }
}
export function Injector(key: string) {
  return function(target: any, propertyKey: string) {
    if (mapTarget.has(key)) {
      if (mapInstance.has(key)) {
        target[propertyKey] = mapInstance.get(key)
      } else {
        const Constructor = mapTarget.get(key)
        const instance = new Constructor()
        target[propertyKey] = instance
        mapInstance.set(key, instance)
      }
    } else {
      throw new Error(`@Inject(${key})不存在`)
    }
  }
}
/* export function Provider(key: string) {
  return function(target: any) {
    if (map.has(key)) {
      throw new Error(`Injector中${key}重名`)
    }
    map.set(key, target)
  }
} */
