import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_OPEN_API } from '~/api/serviceList'

@RequestBaseUrl(RECORD_OPEN_API + '/orgDsService')
export default class OrgDsService {
  /* 热门数据 */
  @RequestPayload()
  @Request('get')
  getHotData(): RequestReturn {
    return {
      url: '/list/top10',
    }
  }
}
