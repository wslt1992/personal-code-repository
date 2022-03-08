import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestPayload,
  Url,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/interfaceLogStatistics')
export default class InterfaceLogStatistics {
  @RequestPayload()
  @Request('get')
  top5(): RequestReturn {
    return {
      url: `/top5`,
    }
  }

  @RequestPayload()
  @Request('get')
  top2(): RequestReturn {
    return {
      url: `/indexInterface`,
    }
  }

  @Url()
  monitorList(): string {
    return `paging`
  }

  @Url()
  monitorListDetails(interfaceId: any, deptId: any, type: any): string {
    return `/${interfaceId}/${deptId}/${type}`
  }
}
