import { Drawer } from '@femessage/element-ui'
import generatePopup from '~/pages/apiServices/lib/popup'
const InjectDrawer = generatePopup(Drawer)
export default InjectDrawer

/*
 *  组件类上使用
 *  component: 需要被显示的内容封装后的组件
 *  option:{ title: '服务接口使用协议' } 定义完全由element-ui决定，需要绑定的属性options
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
