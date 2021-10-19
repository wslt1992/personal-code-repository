import 'reflect-metadata'
const mapInstance = new Map()
const mapTarget = new Map()
export function Injectable(key?: string) {
  return function(target: any) {
    if (mapTarget.has(key)) {
      throw new Error(`Injector中${key}重名`)
    }
    key !== undefined && mapTarget.set(key, target)
    mapTarget.set(target, target)
  }
}
export function Injector(key?: string) {
  return function(target: any, propertyKey: string) {
    if (key === undefined) {
      key = Reflect.getMetadata('design:type', target, propertyKey)
    }

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
