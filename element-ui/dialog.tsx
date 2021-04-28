import { Component } from 'vue/types/options'
import Vue, { VNode } from 'vue'

/* 转化普通组件使用dialog组件包裹起来，用open(),close()函数控制dialog*/
export default function dialog(ctor: Component, el = document.body) {
  const visible = Vue.observable({ visible: false })
  const Dialog = Vue.extend({
    name: 'Download',
    data() {
      return {}
    },
    render(): VNode {
      const data = {
        on: { 'update:visible': (v: boolean) => (visible.visible = v) },
      }
      const { $createElement } = this
      return (
        <el-dialog visible={visible.visible} {...data}>
          {$createElement(ctor)}
        </el-dialog>
      )
    },
  })

  el.append(new Dialog().$mount().$el)

  return {
    switch(v: boolean) {
      visible.visible = v
    },
    toggle() {
      visible.visible = !visible.visible
    },
    open() {
      visible.visible = true
    },
    close() {
      visible.visible = false
    },
  }
}
