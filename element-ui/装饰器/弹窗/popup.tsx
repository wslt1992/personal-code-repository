import { Component } from 'vue/types/options'
import Vue, { VNode } from 'vue'

export interface HandlerName {
  openName?: string
  closeName?: string
  changeName?: string
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
                on: { [options.changeName]:options.change },
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
    return x.openName || x.closeName||x.changeName
  }
  const handlerNameInit:HandlerName = {
    openName: 'open',
    closeName: 'close',
    changeName:'change'
  }
  // eslint-disable-next-line no-redeclare
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
    handlerName: HandlerName | Object = handlerNameInit,
    options?: Object,
  ) {
    return function(ctor: Component) {
      if (!isHandlerName(handlerName)) {
        options = handlerName
        handlerName = handlerNameInit
      }else{
        handlerName = {...handlerNameInit,...handlerName}
      }
      // 绕开ts检测，并且断定handlername属性全部存在
      const handlerNameRequired = handlerName as Required<HandlerName>
      // 被注入页（主页）,指定接收数据函数的函数名
      const changeName = handlerNameRequired.changeName
      // 从被注入页（主页）中获取函数[changeName]
      // eslint-disable-next-line prettier/prettier
      const change = (ctor as any).prototype.constructor.options.methods?.[changeName] ?? function() {
        throw new Error(`被注入组件没有提供消息接收函数${changeName}，默认为函数change`)
      }

      // 从被注入组件（主页）获取到函数change，当参数传递出去。
      // 函数将被change绑定到 弹出组件 [changeName]事件
      // 既 ：被注入组件的函数change（函数名由changeName决定），绑定到 弹窗组件，绑定事件由changeName决定
      const { open, close, emit } = _dialog(target, {...options,change,changeName})

      // openName、closeName分别决定弹窗的开启和关闭。
      const openClose = {
        [handlerNameRequired.openName]: open,
        [handlerNameRequired.closeName]: close,
      }
      /*  向主组件（被注入组件）添加open，close 函数 */
      const ctorMethod = (ctor as any).prototype.constructor.options.methods
      ;(ctor as any).prototype.constructor.options.methods = {
        ...openClose,
        emit,
        ...ctorMethod,
      }

      /*  注入函数open，close 到被弹出组件 */
      const targetMethod = (target as any).prototype.constructor.options.methods

      ;(target as any).prototype.constructor.options.methods = {
        ...openClose,
        ...targetMethod,
      }
    }
  }

  return InjectPopup
}
