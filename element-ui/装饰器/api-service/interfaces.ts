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
  @RequestTips('接口申请')
  @Request('post')
  apply(interfaceId: string): RequestReturn {
    return {
      url: `${interfaceId}/apply`,
      data: { interfaceId },
    }
  }

  @RequestPayload()
  @Request('get')
  applyedList(search: any, page: number = 1): RequestReturn {
    return {
      url: `personalApplys`,
      params: { page, size: 10, ...search },
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
}
