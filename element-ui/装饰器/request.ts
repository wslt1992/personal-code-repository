import { join } from 'path'
import { AxiosRequestConfig, Method } from 'axios'
import { Message, MessageBox } from '@femessage/element-ui'
import { isRequestSuccess } from '~/utils'

export type RequestReturn = AxiosRequestConfig
/* 将对象中的函数(返回值为RequestReturn)，返回值变化为R */
export type FnReturnTypeToR<T extends Object,R> = {
  [key in keyof T]: T[key] extends (...args: any[]) => RequestReturn
      ? (...args: Parameters<T[key]>) => R
      : T[key]
}
export type FnReturnTypeToPromise<T extends Object> = FnReturnTypeToR<T,Promise<any>>
export type APIReturnPromise<T> = {
  [key in keyof T]: FnReturnTypeToPromise<T[key]>
}
type TipsType = {successMsg: string, errorMsg: string}

function get$Axios(){
  return window.$nuxt.$axios
}
function get$Router(){
  return window.$nuxt.$router
}
const baseUrlSymbol = Symbol('request baseUrl')

export function Request(method: Method) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue(...args)
      // eslint-disable-next-line prettier/prettier
      const url = join(target[baseUrlSymbol], value.url ?? '')
      return get$Axios().request({
        method,
        ...value,
        url
      })
    }
  }
}

export function Url() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue(...args)
      // eslint-disable-next-line prettier/prettier
      return join(target[baseUrlSymbol], value ?? '')
    }
  }
}

export function RequestBaseUrl(...paths: string[]) {
  return function(target: any) {
    target.prototype[baseUrlSymbol] = paths.reduce((path:string,subPath:string)=>{
      return join(path,subPath)
    })
  }
}


const TipsTemplate = [
  { successMsg: '提交成功', errorMsg: '提交失败' },
]
export function RequestTips(
    msg:Partial<TipsType> | number | string
) {
  msg = typeof msg === 'number' ? TipsTemplate[msg]??'' :
      typeof msg === 'string' ? {
        successMsg: msg + '成功',
        errorMsg: msg + '失败',
      } : msg

  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue.apply(target,args)
      if (value instanceof Promise) {
        value.then(isRequestSuccess).then((bool: boolean) => {
          bool
              ? Message({
                message: (msg as TipsType).successMsg??'',
                type: 'success',
              })
              : Message({
                message: (msg as TipsType).errorMsg??'',
                type: 'error',
              })
        }).catch(() => {
          // eslint-disable-next-line prettier/prettier
          Message.error({ message: (msg as TipsType).errorMsg??'网络访问出错' })
        })
      }
      return value
    }
  }
}


export function RequestConfirm(
    tips:string
) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      return MessageBox.confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return oldValue.apply(target,args)
      }).catch(() => {
        return false
      });
    }
  }
}

/* 最后把promise值改为true和false，便于el-data-table的‘操作’返回promise.resole(true/false)更新 */
export function RequestSuccess() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue.apply(target,args)
      if (value instanceof Promise) {
        return value.then(isRequestSuccess)
      }
      return value
    }
  }
}
export function RequestPayload() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldMethod = descriptor.value
    descriptor.value = function(...args: any) {
      const value = oldMethod.apply(target,args)
      if (value instanceof Promise) {
        return value.then(data=>data.data.payload)
      }
      return value
    }
  }
}

export function RequestBack() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldMethod = descriptor.value

    descriptor.value = (...args: any) => {
      const value = oldMethod.apply(target,args)
      if (value instanceof Promise) {
        value.then(isRequestSuccess).then((bool: boolean) => {
          if(bool){
            get$Router().back()
          }
        })}
      return value
    }
  }
}
