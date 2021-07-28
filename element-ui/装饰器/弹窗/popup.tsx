import { Component } from 'vue/types/options'
import Vue, { VNode } from 'vue'

export interface HandlerName {
  openName: string
  closeName: string
}
export default function generatePopup(popupComponent: Component) {
  function _dialog(ctor: Component, options: any = {}, el = document.body) {
    const visible = Vue.observable({ visible: false, emitData: {} })
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
              close-on-click-modal={false}
              close-on-press-escape={false}
              wrapperClosable={false}
              {...data}
              {...{ attrs: options }}
            >
              {$createElement(ctor, {
                props: { emitData: visible.emitData },
              })}
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
      emit(v: any) {
        visible.emitData = v
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
        handlerName = {
          openName: 'open',
          closeName: 'close',
        }
      }
      const { open, close, emit } = _dialog(target, options)
      const openClose = {
        [(handlerName as HandlerName).openName]: open,
        [(handlerName as HandlerName).closeName]: close,
      }
      /* 向主页（被注入页）添加函数 */
      const ctorMethod = (ctor as any).prototype.constructor.options.methods
      ;(ctor as any).prototype.constructor.options.methods = {
        ...openClose,
        emit,
        ...ctorMethod,
      }

      /* 注入函数到被弹出内容组件 */
      const targetMethod = (target as any).prototype.constructor.options.methods

      ;(target as any).prototype.constructor.options.methods = {
        ...openClose,
        ...targetMethod,
      }

      /* 将主页函数change，注入到内容弹窗页 */
      /* 当弹窗页数据出现变化，可以调用change，通知主页变化后的数据 */
      /* hack 不能写为内联变量，语法检测有误，?? 语法无法识别，并出现换行时，识别报错 */
      // eslint-disable-next-line prettier/prettier
       const change = (ctor as any).prototype.constructor.options.methods.change ?? function() {
        throw new Error('注入也没有提供数据接收函数，默认为函数change')
      }
      ;(target as any).prototype.constructor.options.methods.change = change
    }
  }

  return InjectPopup
}
