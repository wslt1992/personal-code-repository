/**
 * 统计统计 => 数据归集
 */
import axiosRequest from '@/utils/ajaxRequest'
import { RECORD_SERVER } from '../serviceList'
import { RequestData } from '~/types/base-type'

const Current_Base = `${RECORD_SERVER}/interfaceUpdateLogs`
export const apiLog = {
  /**
   * @method 获取排名
   * @param { RequestData<T> } options
   * @return { void }
   */
  getList<T>(options: RequestData<T>) {
    let url = `${Current_Base}/list`
    axiosRequest('$get', url, options)
  },

  getDetail<T>(options: RequestData<T>, id: string | number) {
    let url = `${Current_Base}/${id}/details`
    axiosRequest('$get', url, options)
  },

  // 获取分页基础接口
  findPageApi: () => {
    return `${Current_Base}/paging`
  },
}
