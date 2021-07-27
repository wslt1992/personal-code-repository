import { Dialog } from '@femessage/element-ui'
import generatePopup from '~/pages/apiServices/lib/popup'
const InjectDialog = generatePopup(Dialog)
export default InjectDialog
/*
 *  组件类上使用
 *  component: 需要被显示的内容封装后的组件
 *  option:{ title: '服务接口使用协议' } 定义完全由element-ui决定，需要绑定的属性options
 *  @InjectDialog(component, { title: '服务接口使用协议' })
 * */
