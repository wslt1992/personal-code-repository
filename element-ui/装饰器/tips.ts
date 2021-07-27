import { Message } from '@femessage/element-ui'
export function tips(msg:Partial<{success: string, error: string}>) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    descriptor.value = (...args: any) => {
      const value = oldValue(...args)
      value
        .then(() => {
          // eslint-disable-next-line prettier/prettier
          msg.success&&Message.success({ message: msg.success })
        })
        .catch(() => {
          // eslint-disable-next-line prettier/prettier
          Message.error({ message: msg.error??'网络访问出错' })
        })
      return value
    }
  }
}
