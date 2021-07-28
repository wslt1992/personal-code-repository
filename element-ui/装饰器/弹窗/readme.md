### @InjectDialog

```typescript
/*
@InjectDialog(
  useAgreement
)
*/


/*
@InjectDialog(
  useAgreement,
  { changeName: 'changeCustome',openName: 'open', closeName: 'close' },
)
*/


/* 省略参数2自定义名字，直接写参数3
@InjectDialog(
  useAgreement,
  { title: '服务接口使用协议' },
)
*/

@InjectDialog(
  useAgreement,
  { changeName: 'changeCustome',openName: 'open', closeName: 'close' },
  { title: '服务接口使用协议' },
)
@Component({
  components: {
    TabPage,
  },
  name: 'Director',
})
export default class Director extends Vue {
  created() {
      // 打开弹窗open，函数名可以被指定
    ;(this as any).open()
      // 向UseAgreement发送数据
    ;(this as any).emit('Director')

  }
    // # 接收userAgreement发送的数据
    changeCustome(v: any) {
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
- UserComponent以props方式接收Director发送的数据，字段为emitData
- `openName: 'open' closeName: 'close'`分别指定开启和关闭弹窗的函数名
- 这两个函数可以在**弹出组件**和**被注入组件**以 `this.open()` `this.close()`调用，分别打开或关闭窗口
- `@InjectDialog`，
  - param1，需要被弹出的内容。
  - param2：指定各个函数名或事件名。
  - param3：原element-ui下**el-dialog**、**el-drawer**的配置项
  - 省略参数2自定义名字，直接写参数3。参见上文注释代码



### @InjectDrawer

`@InjectDrawer` `@InjectDialog`使用方式相同

```
@InjectDrawer(
  useAgreement,
  { changeName: 'changeCustome', openName: 'openDrawer', closeName: 'closeDrawer' },
  { title: '服务接口使用协议' },
)
```



### 注意

- 同时使用`@InjectDrawer`、`@InjectDialog`，或使用多次使用，需要指定{ changeName: 'changeCustome', openName: 'openDrawer', closeName: 'closeDrawer' }，函数名必须唯一