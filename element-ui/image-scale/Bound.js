/**
 * 用于计算边界
 */
export default class Bound {
  min
  max
  context
  getBaseValue
  constructor(min, max, context, getBaseValue) {
    this.min = min
    this.max = max
    this.context = context
    this.getBaseValue = getBaseValue
  }

  /**
   * 得到范围内的值
   * @param value
   * @returns {*}
   */
  exec(value) {
    if (value < this.min) {
      return this.min
    }
    if (value > this.max) {
      return this.max
    }
    return value
  }

  /**
   * 设置范围值
   * @param min
   * @param max
   */
  setMinMax(min, max) {
    if (min > max) {
      this.min = 0
      this.max = 0
      return
    }
    this.min = min
    this.max = max
  }

  /**
   * 接听scale变化后的通知
   * @param scale 当前倍数
   */
  receive(scale) {
    const min = this.getBaseValue.apply(this.context) * (scale - 1)
    this.setMinMax(-min, 0)
  }
}
