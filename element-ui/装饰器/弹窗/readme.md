### @InjectDialog

```typescript

@InjectDialog(useAgreement, 'agreement', { title: '服务接口使用协议' })
@InjectDialog(apply, 'apply', { title: '服务接口申请' })
@Component({
  components: {
    TabPage,
  },
  name: 'Director',
})
export default class Director extends Vue {
  created() {
      // 打开窗口
    ;(this as any).$popup('agreement:open')
    ;(this as any).$popup('apply:open')
      
     //向UseAgreement发送数据
    ;(this as any).$popup('agreement:emit', 'index page emit data')
     //向apply发送数据
    ;(this as any).$popup('apply:emit', 'index page emit data apply')
      
      
    setTimeout(() => {
        // 关闭窗口
      ;(this as any).$popup('agreement:close')
      ;(this as any).$popup('apply:close')
    }, 3000)

    // 切换窗口  
 	;(this as any).$popup('agreement:toggle')
 	;(this as any).$popup('apply:toggle')
     
  }
   /* 接收apply发出的数据 */
  ['apply:change'](v: any) {
    console.log('接收到数据：', v)
  }

  /* 接收agreement发出的数据 */
  ['agreement:change'](v: any) {
    console.log('接收到数据：', v)
  }
}
```



```typescript
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'UseAgreement',
})
export default class UserComponent extends Vue {
    // * 接收Director发送的数据
  @Prop() readonly emitData: any
  created() {
      //# 向Director发送数据
    this.$emit('changeCustome', { str: '使用vue自带$emit发送数据' })
      // 使用close关闭窗口，close为默认，由closeName决定关闭窗口函数
      this.close()
      //使用open关闭窗口，open为默认，由openName决定关闭窗口函数 
      this.open()
  }
}
```



- changeName: 指定通信事件'changeCustome'
  - 决定Director接收数据的函数
  - 决定UserComponent回传数据事件
- 主
- 这两个函数可以在**弹出组件**以 `this.open()` `this.close()`调用，分别打开或关闭窗口
- `@InjectDialog`，
  - param1，需要被弹出的内容。
  - param2：指定事件名。
  - param3：原element-ui下**el-dialog**、**el-drawer**的配置项
  - 省略参数2自定义名字，直接写参数3。参见上文注释代码



### @InjectDrawer

`@InjectDrawer` `@InjectDialog`使用方式相同


```typescript
@InjectDrawer(
  apply, 'apply', { title: '服务接口申请' },
)
```



### 注意

- 同时使用`@InjectDrawer`、`@InjectDialog`，或使用多次使用，需要指定event名，名必须唯一
