import { Message } from 'element-ui'
import Vue, { DirectiveOptions } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
/*
  用法
* <el-button
    v-copy-icon="scope.row.id"
    type="text"
    style="margin-top: -6px; margin-left: 3px;"
    class="el-icon-document-copy"
  ></el-button>

  用法2
   <span  v-copy-icon="{icon:'el-icon-document-copy',value:scope.row.zip,tips:'点击复制邮编'}">{{ scope.row.zip }}</span>

* */

const icon = 'el-icon-document-copy'

function getContainer (icon = 'el-icon-document-copy', tips = '点击复制') {
  const Container = Vue.extend({
    name: 'Container',
    /* template: `<el-tooltip class="item" effect="dark" content="点击复制" placement="top-start">
      <i class="${icon}"></i>
    </el-tooltip>`, */
    render (h) {
      return h('el-tooltip',
          { class: 'item', props: { effect: 'dark', content: tips, placement: 'top-start' } },
          [h('i', { class: icon })]
      )
    }
  })
  return new Container().$mount()
}

interface ValueOptions {icon:string, value:string, tips:string}
interface HTMLElementCopy extends HTMLElement{
  $value:string|ValueOptions,
  handler:()=>void
}
const vCopyIcon:DirectiveOptions = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值，也就是我们要 copy 的值
  */
  inserted (el:HTMLElement, { value }:DirectiveBinding) {
    if (!parent) {
      return
    }
    value = value as {icon:string, value:string, tips:string}
    // this.icon = value.icon
    // const container = getContainer(!this.icon ? undefined : this.icon)
    // res
    // container.appendChild(el)
    const container = getContainer(value.icon, value.tips)
    el.appendChild(container.$el)
  },
  bind (el:HTMLElement, { value }:DirectiveBinding) {
    const elc = el as HTMLElementCopy
    elc.$value = value // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    elc.handler = () => {
      if (!elc.$value) {
        // 值为空的时候，给出提示，我这里的提示是用的 element-ui 的提示，你们随意
        Message.warning('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = true
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      const $value = elc.$value
      if (typeof $value === 'object') {
        textarea.value = $value.value
      } else if (typeof $value === 'string' || typeof $value === 'number') {
        textarea.value = $value
      }

      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      // textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand('Copy')
      if (result) {
        Message.success('复制成功')
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', elc.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated (el:HTMLElement, { value }:DirectiveBinding) {
    (el as HTMLElementCopy).$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind (el:HTMLElement) {
    el.removeEventListener('click', (el as HTMLElementCopy).handler)
  }
}

export default vCopyIcon
