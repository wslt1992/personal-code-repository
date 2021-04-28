import Vue, { CreateElement, VNode } from 'vue'
import { CombinedVueInstance, ExtendedVue } from 'vue/types/vue'
import path from 'path'
import { AxiosStatic } from 'axios'
export type HelperType = {
  confirm:any,
  getDeleteCell:any,
  setUrl:any,
  setTotal:any,
  setUniqueProperty:any,
  http:any,
  getRenderFooter:any,
  getRenderTable:any,
  getRenderHeader:any,
  query:any,
  deleteRows:any,
}

export enum TableEvent {
  confirm = 'confirm',
  reset = 'reset',
  deleterows = 'deleterows'
}

let axios:AxiosStatic
export function setAxios (a:AxiosStatic) {
  axios = a
}
export default function helper (ctx: CombinedVueInstance<any, any, any, any, any>) {
  let _url: string = ctx.url
  let _uniqueKey = ctx.uniqueKey
  let _total = 0
  const _ctx = ctx
  let _currentPage:number|string = 1
  let _deleteRow:Record<string, any>[] = []
  /* 配置清单 */
  function setDeleteRow (row:Record<string, unknown>[]) {
    _deleteRow = row
  }
  function setUrl (url: string) {
    _url = url
  }
  function setUniqueProperty (uniqueKey: string) {
    _uniqueKey = uniqueKey
  }
  function setTotal (total: number) {
    _total = total
  }
  function confirm (url: string, query: unknown): () => Promise<unknown> {
    return function _confirm () {
      console.log('axios', url, query)
      return Promise.resolve('axios')
      // return axios.post(url)
    }
  }
  function setCurrentPage (currentPage: number|string) {
    _currentPage = currentPage
  }
  function getDeleteCell (h: CreateElement) {
    /*   const res = Vue.compile(`<el-table-column
      fixed="right"
      label="操作"
      min-width="60">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>`) */

    return h('el-table-column', {
      props: {
        fixed: 'right',
        label: '操作',
        'min-width': ''
      },
      scopedSlots: {
        default: (scope: Record<string, any>) => h('el-button', {
          props: { type: 'text', size: 'small' },
          on: {
            click: () => { deleteRow(scope) }
          }
        }, '移除')
      }
    })
    /* return Vue.extend({
      methods: {
        deleteRow: http.deleteRow
      },
      // render: res.render,
      render: function (h) {
        return h('el-table-column', {
          props: {
            fixed: 'right',
            label: '操作',
            'min-width': ''
          },
          scopedSlots: {
            default: scope => h('el-button', {
              props: { type: 'text', size: 'small' },
              on: {
                click: () => { this.deleteRow(scope) }
              }
            }, '移除')
          }
        })
      }
    }) */
  }

  const http = {
    deleteRows (tableDatas: Record<string, any>[]) {
      let url = _url
      for (const tableData of tableDatas) {
        console.log(url)
        url = path.join(url, tableData[_uniqueKey])
      }
      console.log(url)
      return axios.delete(url)
    },
    deleteRow (tableData: Record<string, any>) {
      const url = path.join(_url, tableData.row[_uniqueKey])
      return axios.delete(url, { params: { [_uniqueKey]: tableData.row[_uniqueKey] } })
    },
    query (query:any): Promise<Record<string, any>> {
      return axios.get(_url, { params: { ...query } })
    },
    create (params:any) {
      return axios.get(_url, { ...params })
    }
  }

  function deleteRows (tableDatas = _deleteRow) {
    http.deleteRows(tableDatas).then((data: any) => {
      if (Number(data?.code) === 0) {
        query()
      }
    })
  }
  function deleteRow (tableData: Record<string, any>) {
    http.deleteRow(tableData).then((data: any) => {
      if (Number(data?.code) === 0) {
        query()
      }
    })
  }
  function query (page: string|number = _currentPage) {
    /* 初始化 */
    http.query({ ..._ctx.query, page }).then((data) => {
      const payload = data.data.payload
      _ctx.tableData = data.data.payload.list
      // eslint-disable-next-line no-unused-expressions
      setTotal(payload.total)
    })
  }
  function getRenderFooter (this: Vue, h: CreateElement): VNode {
    const footerDate = this.$scopedSlots.footer?.({ total: _total, currentPage: _currentPage })
    const propsData = footerDate?.[0].componentOptions?.propsData as {total:number}
    if (propsData) {
      propsData.total = _total
    }
    const listeners = footerDate?.[0].componentOptions?.listeners as { 'current-change': (val: string) => void }
    /* 添加页变化 */
    const _currentChange = listeners['current-change']
    listeners['current-change'] = function (val: string) {
      // console.log(`当前页index: ${val}`)
      _currentChange(val)
      setCurrentPage(val)
      query(val)
    }

    return h(
      'div', {
        class: ['footer']
      },
      // [this.$scopedSlots.table?.(this.tableData)]
      [footerDate]
    )
  }

  function getRenderTable (this: Vue, h: CreateElement): VNode {
    const cell = getDeleteCell(h)
    const tableData = this.$scopedSlots.table?.((this as Vue & { tableData: Record<string, unknown> }).tableData)

    const propsData = tableData?.[0].componentOptions?.propsData as {data:Record<string, unknown>}
    if (propsData) {
      propsData.data = (this as Vue & { tableData: Record<string, unknown> }).tableData
    }

    // eslint-disable-next-line no-unused-expressions
    tableData?.[0].componentOptions?.children?.push(cell)

    const listeners = tableData?.[0].componentOptions?.listeners as { 'selection-change': (val: Record<string, unknown>[]) => void } || {}
    /* 添加页变化 */
    const _selectionChange = listeners?.['selection-change']
    listeners['selection-change'] = function (val: Record<string, unknown>[]) {
      // eslint-disable-next-line no-unused-expressions
      _selectionChange?.(val)
      console.log(val)
      setDeleteRow(val)
    }
    const componentOptions = tableData?.[0].componentOptions
    if (componentOptions) {
      componentOptions.listeners = listeners
    }
    return h(
      'div', {
        class: ['table']
      },
      // [this.$scopedSlots.table?.(this.tableData)]
      [tableData]
    )
  }

  function getRenderHeader (this: Vue, h: CreateElement) {
    return h(
      'div', {
        class: ['header']
      },
      [this.$scopedSlots.header?.({})]
    )
  }

  return {
    confirm,
    getDeleteCell,
    setUrl,
    setTotal,
    setUniqueProperty,
    http,
    getRenderFooter,
    getRenderTable,
    getRenderHeader,
    query,
    deleteRows
  }
}
