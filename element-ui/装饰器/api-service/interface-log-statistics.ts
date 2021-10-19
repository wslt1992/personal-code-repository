import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestPayload,
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
}
