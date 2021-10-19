import AxiosInterface from './axios'
import {
  RequestReturn,
  Request,
  RequestBaseUrl,
} from '~/pages/resourceSharing/apiServices/request'
// import { formatDate } from '~/plugins/filters'

@RequestBaseUrl('/apiserver')
export default class ApplicantAPI extends AxiosInterface {
  apiServerList() {
    return this.axios.get('/apiserver/paging').then(data => data.data.payload)
  }

  @Request('post')
  approval(apiId: number | string, responseParamIds: any): RequestReturn {
    // return this.axios.post('/apiserver', { apiId, responseParamIds })
    return { url: '', data: { apiId, responseParamIds } }
  }

  @Request('get')
  apiServerDetails(apiId: any): RequestReturn {
    // isApply: 1 表示申请页
    return { url: `/${apiId}`, params: { isApply: 1 } }
  }

  apiServerDetailsNoApply(apiId: any) {
    // isApply: 1 表示申请页
    return this.axios
      .get(`/apiserver/${apiId}`, { params: { isApply: 0 } })
      .then(data => data.data.payload)
  }

  /**
   * 已经申请的列表
   * @returns {*}
   */
  applyPage(page: any) {
    /* return this.axios
      .get(`/apiserver/applypage`, { params: { page } })
      .then(data => data.data.payload) */

    // 设置加数据
    return Promise.resolve({
      totalElements: 1000,
      content: [
        {
          apiName: '1',
          status: '1',
          body_type: '企业',
          service_type: '精准查询',
          api_type: '通用接口',
          applyTime: '1628648756',
        },
        {
          apiName: '1',
          status: '2',
          body_type: '个人',
          service_type: '属性查询',
          api_type: '自定义接口',
          applyTime: '1628648756',
        },
        {
          apiName: '1',
          status: '3',
          body_type: '个人',
          service_type: '属性查询',
          api_type: '自定义接口',
          applyTime: '1628648756',
        },
        {
          apiName: '1',
          status: '4',
          body_type: '企业',
          service_type: '精准查询',
          api_type: '通用接口',
          applyTime: '1628648756',
        },
      ],
    })
  }

  // 改变状态
  modifyApplyState(id: any, status: number) {
    return this.axios
      .put(`/approval/${id}`, { id, status })
      .then(data => data.data.payload)
  }

  // 1审核中 2已撤回 3已退回 4使用中/已审批
  reApply(id: any) {
    this.modifyApplyState(id, 1)
  }

  revoke(id: any) {
    this.modifyApplyState(id, 2)
  }

  back(id: any) {
    this.modifyApplyState(id, 3)
  }

  /**
   * 取消
   * @param id
   * @returns {*}
   */
  cancel(id: any) {
    return this.axios.delete(`/apiserver/${id}`).then(data => data.data.payload)
  }
}
