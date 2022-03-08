import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  // Url,
  RequestPayload,
  RequestTips,
  RequestSuccess,
  // RequestTips,
  // RequestSuccess,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_OPEN_API } from '~/api/serviceList'

@RequestBaseUrl(RECORD_OPEN_API + '/interfaces')
export default class Interface {
  /* 通用展示列表 */
  @RequestPayload()
  @Request('get')
  getCommonInterfaceList(
    ontologyModelId: string,
    name: string = '',
    page: number,
    size = 8,
  ): RequestReturn {
    return {
      url: '/normal/list',
      params: { ontologyModelId, name, page, size },
    }
  }

  @RequestSuccess()
  @RequestTips({
    successMsg: '申请成功',
    errorMsg: '有效时间内同个接口已存在申请，不能重复添加',
  })
  @Request('post')
  apply(
    interfaceId: string,
    effectiveTime: string | number,
    purpose: string,
  ): RequestReturn {
    return {
      url: `${interfaceId}/apply`,
      data: { interfaceId, effectiveTime, purpose },
    }
  }

  @RequestPayload()
  @Request('get')
  applyedList(search: any, page: number = 1, size: number = 10): RequestReturn {
    return {
      url: `personalApplys`,
      params: { page, size, ...search, name: search.name.trim() },
    }
  }

  /* 最新api */
  @RequestPayload()
  @Request('get')
  newest(): RequestReturn {
    return {
      url: `/list/lastApi`,
    }
  }

  @RequestPayload()
  @Request('get')
  nameUnique(name: string): RequestReturn {
    return {
      url: `/nameCheck`,
      params: { name },
    }
  }

  /* 热门数据 */
  @RequestPayload()
  @Request('get')
  apiTop10(): RequestReturn {
    return {
      url: `/list/apitop10`,
      params: { name },
    }
  }
}
