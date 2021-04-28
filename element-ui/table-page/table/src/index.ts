import Vue, { VNode } from 'vue'
import Helper, { HelperType, TableEvent } from './helper'
import { cloneDeep } from 'lodash'

/* 重置数据对象 */
let reset:Record<string, any>|null = null

let helper:HelperType|null = null
export default Vue.extend({
  name: 'table-page',
  props: {
    url: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      default: () => ({})
      // required: true

    },
    uniqueKey: {
      type: String,
      default: 'id'
    }
  },

  created () {
    reset = cloneDeep(this.query)

    /* 初始化helper */
    helper = Helper(this)

    /* 初始化 */
    helper.query()
  },
  mounted ():void {
    this.initConfirm()
  },
  data () {
    return {
      header: null,
      tableData: []
    }
  },
  methods: {
    initConfirm ():void {
      const resetClick = () => {
        this.$nextTick(() => {
          for (const key in reset) {
            if (Object.hasOwnProperty.call(reset, key)) {
              this.query[key] = cloneDeep(reset[key])
            }
          }
        })
      }

      // eslint-disable-next-line no-unused-expressions
      const _confirm = () => { helper?.query() }

      /* 给拥有标记“TableEvent.confirm”,添加 响应事件 “confirm” */
      const btConfirm = this.$el.querySelector(`[table=${TableEvent.confirm}`)
      // eslint-disable-next-line no-unused-expressions
      btConfirm?.addEventListener('click', _confirm)

      /* 给拥有标记“TableEvent.reset”,添加 响应事件 “reset” */
      const btReset = this.$el.querySelector(`[table=${TableEvent.reset}`)
      // eslint-disable-next-line no-unused-expressions
      btReset?.addEventListener('click', resetClick)

      /* 给拥有标记“TableEvent.deleterows”,添加 响应事件 “deleterows” */
      const btDeleteRows = this.$el.querySelector(`[table=${TableEvent.deleterows}`)
      // eslint-disable-next-line no-unused-expressions
      btDeleteRows?.addEventListener('click', () => { helper?.deleteRows() })
    }
  },
  render (h):VNode {
    /* header vnode */
    const header = helper?.getRenderHeader.call(this, h)

    /* table vnode */
    const table = helper?.getRenderTable.call(this, h)

    /* footer vnode */
    const footer = helper?.getRenderFooter.call(this, h)

    return h('div', {}, [header, table, footer])
  }
})
