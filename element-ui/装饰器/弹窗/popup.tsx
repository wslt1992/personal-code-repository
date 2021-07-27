import { Component } from 'vue/types/options'
import Vue, { VNode } from 'vue'
export interface HandlerName {
  openName: string
  closeName: string
}
export default function generatePopup(popupComponent: Component) {
  function _dialog(ctor: Component, options: any = {}, el = document.body) {
    const visible = Vue.observable({ visible: false })
    const PopupComponentContainer = Vue.extend({
      name: 'DialogOperation',
      components: {
        'popup-component': popupComponent,
      },
      data() {
        return {}
      },
      render(): VNode {
        const data = {
          on: { 'update:visible': (v: boolean) => (visible.visible = v) },
        }
        const { $createElement } = this
        return (
          <div class="dialog_operation">
            <popup-component
              visible={visible.visible}
              {...data}
              {...{ attrs: options }}
            >
              {$createElement(ctor)}
            </popup-component>
          </div>
        )
      },
    })

    el.append(new PopupComponentContainer().$mount().$el)

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

  function isHandlerName(x: any): x is HandlerName {
    return x.openName && x.closeName
  }
  function InjectPopup(target: Component, options?: Object): any
  // eslint-disable-next-line no-redeclare
  function InjectPopup(
    target: Component,
    handlerName: HandlerName,
    options?: Object,
  ): any
  // eslint-disable-next-line no-redeclare
  function InjectPopup(
    target: Component,
    handlerName: HandlerName | Object = {
      openName: 'open',
      closeName: 'close',
    },
    options?: Object,
  ) {
    return function(ctor: Component) {
      if (!isHandlerName(handlerName)) {
        options = handlerName
        const { open, close } = _dialog(target, options)
        ;(ctor as any).prototype.close = close
        ;(ctor as any).prototype.open = open
        /* 注入函数到被弹出内容组件 */
        /* 相当于注入到了组件的option中 */
        ;(target as any).prototype.close = close
        ;(target as any).prototype.open = open
      } else {
        const { open, close } = _dialog(target, options)
        const openClose = {
          [handlerName.openName]: open,
          [handlerName.closeName]: close,
        }
        ;(ctor as any).prototype.constructor.options.methods = {
          ...openClose,
          ...(ctor as any).prototype.constructor.options.methods,
        }
        /* 注入函数到被弹出内容组件 */
        ;(target as any).prototype.constructor.options.methods = {
          ...openClose,
          ...(target as any).prototype.constructor.options.methods,
        }
      }
    }
  }

  return InjectPopup
}
