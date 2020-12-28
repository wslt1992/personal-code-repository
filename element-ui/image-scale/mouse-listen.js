export default class MouseListen {
  star = 0
  touchstart = 0
  container = null

  isMoved = false

  /**
   *
   * @param orientation 值为 'X'和'Y'
   * @param container 被监听的对象
   * @param context 上下文
   * @param getBaseValue 处理所需要的值，这里为left或者top
   * @param setPositionValue 回调函数
   */
  constructor(orientation, container, context, getBaseValue, setPositionValue) {
    this.orientation = orientation
    this.container = container
    this.context = context
    this.getBaseValue = getBaseValue
    this.setPositionValue = setPositionValue

    this.star = 0
    this.touchstart = 0
    this.isMoved = false

    this.init()
  }

  init() {
    const clientOrientation = 'client' + this.orientation
    const container = this.container
    const _this = this
    container.addEventListener('mousedown', function(e) {
      _this.touchstart = e[clientOrientation]
      _this.star = _this.getBaseValue.call(_this.context)
      _this.isMoved = true
    })
    container.addEventListener('mousemove', function(e) {
      if (_this.isMoved) {
        const detal = e[clientOrientation] - _this.touchstart
        _this.setPositionValue.call(_this.context, _this.star, detal)
      }
    })
    container.addEventListener('mouseup', function() {
      _this.isMoved = false
    })
    document.addEventListener('mouseup', this.getListener(_this))
  }

  getListener(_this) {
    return function() {
      _this.isMoved = false
    }
  }

  /**
   * 解除绑定
   */
  destroy() {
    document.removeEventListener('mouseup', this.getListener)
  }

  /**
   * 设置回调函数
   * @param setPositionValue
   */
  setCallback(setPositionValue) {
    this.setPositionValue = setPositionValue
  }
}
