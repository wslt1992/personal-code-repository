import Bound from './Bound'
import Scale from './scale'
import Position from './Position'
import MouseListen from './mouse-listen'
export default class ImageScaleFacade {
  constructor(context, container) {
    this.context = context
    this.width = context.width
    this.height = context.height
    this.container = container
    this.init()
    this.initDrag()
  }

  init() {
    const boundLeft = (this.boundLeft = new Bound(0, 0, this, this.getWidth))
    const boundTop = (this.boundTop = new Bound(0, 0, this, this.getHeight))
    /*
    在打包环境中，this.setLeft 函数获取不到
    const positionLeft = new Position(this, this.getWidth, this.setLeft.name)
    const positionRight = new Position(this, this.getHeight, this.setTop.name)
    */
    const positionLeft = new Position(this, this.getWidth, 'setLeft')
    const positionRight = new Position(this, this.getHeight, 'setTop')
    const scaleClass = (this.scaleClass = new Scale())

    scaleClass.subscribe(boundLeft)
    scaleClass.subscribe(boundTop)
    scaleClass.subscribe(positionLeft)
    scaleClass.subscribe(positionRight)
  }
  initDrag() {
    const box = this.container
    this.mouseListenX = new MouseListen('X', box, this, function() {
      return this.context.left
    })
    this.mouseListenX.setCallback(this.setLeft)
    this.mouseListenY = new MouseListen('Y', box, this, function() {
      return this.context.top
    })
    this.mouseListenY.setCallback(this.setTop)
  }
  getWidth() {
    return this.width
  }
  getHeight() {
    return this.height
  }

  /**
   * 移除dom事件绑定
   */
  destroy() {
    this.mouseListenX.destroy()
    this.mouseListenY.destroy()
  }

  /**
   * 设置left位置
   * @param num1 鼠标按下时图片left的值，
   * @param num2 相对于鼠标按下时点A到当前点B移动距离
   */
  setLeft(num1, num2) {
    this.context.left = this.boundLeft.exec(num1 + num2)
  }

  /**
   * 设置top位置
   * @param num1 鼠标按下时图片top的值，
   * @param num2 相对于鼠标按下时点A到当前点B移动距离
   */
  setTop(num1, num2) {
    /*
  内容向上滑动时（手指是向下滑动），e的x和Y是正数的，然而scrollTop值需要变小，所以就减去上e的值，使得scrollTop变小

* 内容向下滑动时（手指是向上滑动），e的x和Y是负数的，然而scrollTop值需要变大，所以需要减去e的值（负数），使得scrollTop变大
* */
    //  正向滑动
    // this.top = num1 - num2

    //  反向滑动
    this.context.top = this.boundTop.exec(num1 + num2)
  }

  /**
   * 设置放大倍数
   * @param scale
   */
  setScale(scale) {
    this.scaleClass.setScale(scale)
  }
}
