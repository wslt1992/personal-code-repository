import {
  RequestBaseUrl,
  Request,
  RequestPayload,
  RequestReturn,
} from '~/pages/resourceSharing/apiServices/request'

// 一期接口
@RequestBaseUrl('data-catalogue-api')
export default class PhaseI {
  /**
   * 获取首页banner位置下的 统计
   */
  @RequestPayload()
  @Request('get')
  getIndexTotal(): RequestReturn {
    return { url: '/home/total' }
  }
}
