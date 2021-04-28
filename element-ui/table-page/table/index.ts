import Table from './src/index'
import helper, { setAxios } from './src/helper'
import { AxiosStatic } from 'axios'
import { VueConstructor } from 'vue/types/vue'
const install = (Vue:VueConstructor, options:{axios:AxiosStatic}): void => {
  // Vue.component(Table.name, Table)
  Vue.component('table-page', Table)
  setAxios(options.axios)
}

export default install
