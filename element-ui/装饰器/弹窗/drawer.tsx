import { Drawer } from '@femessage/element-ui'
import generatePopup from '~/pages/apiServices/lib/popup'
const InjectDrawer = generatePopup(Drawer)
export default InjectDrawer

/*
 *  组件类上使用
 *  // component: 需要被显示的内容封装后的组件
 *  // option:{ title: '服务接口使用协议' } 定义完全由element-ui决定，需要绑定的属性options
 *  @InjectDrawer(component, { title: '服务接口使用协议' })
 * */

/*
* 使用是指定函数的名称
* @InjectDrawer(
  useAgreement,
  { openName: 'openDrawer', closeName: 'closeDrawer' },
  { title: '服务接口使用协议' },
)
* 默认弹出函数为open和close
@InjectDialog(useAgreement, { title: '服务接口使用协议' })
*
*
* 分别调用，打开弹窗
   ;(this as any).open() //打开Dialog
    ;(this as any).openDrawer()// 打开Drawer
*
* */

/*
* 数据通信（默认）
*
* 弹窗页 发送数据
* ;(this as any).change({ lt: 'UseAgreem内容弹窗 向 主页 发送数据 ' })
*
* 主页使用change接收数据
* change(v: any) {
    console.log('接收到数据：', v)
  }
  * **************************

* 主页 向 弹出页 发送数据
* (this as any).emit('index page emit data')

* 弹出页 接收数据，定义props
* // 这是注解写法
*   @Prop() readonly emitData: any
* // 或 vue options写法
* props:{
*   emitData: {}
* }
*
*
* */

/*
*  指定通行函数（不指定则为change）
* @InjectDialog(
  useAgreement,
  { changeName: 'changelt' },
  { title: '服务接口使用协议' },
)
*
* 被注入组件 向 弹出窗 传递数据
*  ;(this as any).emit('父 向 子 传递数据')
*
  弹出页 接收数据，定义props
 // 这是注解写法
  @Prop() readonly emitData: any
 // 或 vue options写法
 props:{
   emitData: {}
 }
*
* */

/*
 * 弹出窗 向 被注入组件 传递数据，还是使用$emit()
 *     this.$emit('changelt', { str: '使用vue自带$emit发送数据' })
 *被注入组件 接收数据,changelt由上文changeName决定
 *  changelt(v: any) {
    console.log('接收到数据：', v)
  }
 * */
