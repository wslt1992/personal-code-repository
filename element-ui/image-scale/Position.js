/**
 * 用于计算位置
 */
export default class Position {
  context
  getBaseValue
  setPositionValue
  constructor(context, getBaseValue, setPositionValue) {
    this.context = context
    this.getBaseValue = getBaseValue
    this.setPositionValue = setPositionValue
  }

  /**
   * scale值变化后，图片left需要移动一定距离
   * offset为需要左移动的值= （放大后的宽-原宽）的一半
   * offset为左移动，所以为负值
   * @param scale 当前倍数
   */
  receive(scale) {
    const offset = (this.getBaseValue.apply(this.context) * (scale - 1)) / 2
    this.context[this.setPositionValue](0, -offset)
  }
}
