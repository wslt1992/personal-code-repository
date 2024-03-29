import { Component } from 'vue/types/options'
import Vue, { VNode } from 'vue'

let router:any
let $axios:any
export function setRouter(app:any){
  router = app.router
  $axios = app.$axios
}
export interface HandlerName {
  openName?: string
  closeName?: string
  changeName?: string
}
 declare module 'vue/types/vue' {
  interface Vue {
    $popup: (event:string,data?:Record<string, any>)=>void
  }
}
let openCloseEmitFns:Record<string,Function> = {}

export default function generatePopup(popupComponent: Component) {
  const _dialog = (ctor: Component, options: any = {}, el = document.body) => {
    const visible = Vue.observable({ visible: false, emitData: {} })
    const PopupComponentContainer = Vue.extend({
      name: 'DialogOperation',
      components: {
        'popup-component': popupComponent,
      },
      data() {
        return {}
      },
      watch:{
        $route: {
          handler(newVal, oldVal){
            clear()
          },
          // 深度观察监听
          deep: true
        }
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
                props: { ...visible.emitData },
                on: { [options.changeName]:options.change },
              })}
            </popup-component>
          </div>
        )
      },
    })

let popup:Vue|null ;

    /**
     * 清理对象
     */
    function clear(){
        if(!popup){
          // throw new Error('popup is null')
          return
        }
        el.removeChild(popup.$el)
        popup.$destroy()
        popup = null

    }
    /**
     *  new组件对象，并添加到body下
     */
      function append(){
        if(!(router&&$axios)){
          throw new Error("需要调用setRouter设置router和$axios")
        }
        if(popup) return
        // @ts-ignore $axios没有定义，所以会报错，然而依赖$axios
       popup = new PopupComponentContainer({router,$axios}).$mount()
      el.appendChild(popup.$el)
    }
    /* hack router对象可能获取不到，需要等下一轮执行 */
    setTimeout(() =>{
      append()
    })

    return {
      switch(v: boolean) {
        visible.visible = v
      },
      toggle() {
        /* 先初始化弹窗，再改变显示状态 */
        append()
        visible.visible = !visible.visible
      },
      open(v:any) {
        append()
        visible.visible = true
        visible.emitData = v
      },
      close() {
        visible.visible = false
      },
      emit(v: any) {
        visible.emitData = v
      },
    }
  }

  /* function isHandlerName(x: any): x is HandlerName {
    return x.openName || x.closeName||x.changeName
  } */
  /* const handlerNameInit:HandlerName = {
    openName: 'open',
    closeName: 'close',
    changeName:'change'
  } */
  function InjectPopup(
    target: Component,
    eventName: string,
    options?: Object,
  ) {
    function injectFnToTarget(open: (v: any) => void, toggle: () => void, close: () => void, emit: (v: any) => void, ctor: Component) {
      const openCloseEmitFnsTemp = {
        [`${eventName}:open`]: open,
        [`${eventName}:toggle`]: toggle,
        [`${eventName}:close`]: close,
        [`${eventName}:emit`]: emit,
      }
      openCloseEmitFns = {
        ...openCloseEmitFns,
        ...openCloseEmitFnsTemp,
      }
      /*  挂在到全局添加open，close 函数 */
      if(!Vue.prototype.$popup){
          Vue.prototype.$popup = function $popup(eventName: string, data: any) {
          openCloseEmitFns[eventName](data)
        }
      }

    }

    function injectFnToCtor(open: (v: any) => void, close: () => void, toggle: () => void) {
    // openName、closeName分别决定弹窗的开启和关闭。
      const openClose = {
        open,
        close,
        toggle,
      }
      /*  注入函数open，close 到被弹出组件 */
      const targetMethod = (target as any).options.methods

      ;(target as any).options.methods = {
        ...openClose,
        ...targetMethod,
      }
    }

    function getFnChange(ctor: Component, eventChangeName: string) {
      // eslint-disable-next-line prettier/prettier
      return (ctor as any).options.methods?.[eventChangeName] ?? function() {
        throw new Error(`被注入组件没有提供消息接收函数${eventChangeName}，默认为函数change`)
      }
    }

    return function(ctor: Component) {
      // 被注入页（主页）,指定接收数据函数的函数名
      const eventChangeName = `${eventName}:change`
      const changeName = `change`
      // 从被注入页（主页）中获取函数[changeName]
      const change = getFnChange(ctor, eventChangeName)

      // 从被注入组件（主页）获取到函数change，当参数传递出去。
      // 函数将被change绑定到 弹出组件 [changeName]事件
      // 既 ：被注入组件的函数change（函数名由changeName决定），绑定到 弹窗组件，绑定事件由changeName决定
      const { open, close, emit,toggle } = _dialog(target, {...options,change,changeName})

      injectFnToTarget(open, toggle, close, emit, ctor)
      injectFnToCtor(open, close, toggle)

    }
  }

  return InjectPopup
}
