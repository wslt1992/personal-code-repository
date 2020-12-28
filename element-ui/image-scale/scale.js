/**
 * 被监听者，倍数变化通知其他对象
 */
export default class Scale {
  scale = 0
  // 监听者列表
  list = []
  constructor(scale = 1) {
    this.scale = scale
  }

  /**
   * 设置倍数
   * @param scale
   */
  setScale(scale) {
    this.scale = scale
    this.notify()
  }
  subscribe(observer) {
    this.list.push(observer)
  }

  /**
   * 通知全部的监听者
   */
  notify() {
    this.list.forEach(observer => {
      observer.receive(this.scale)
    })
  }
}
