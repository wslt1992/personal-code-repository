import { join } from 'path'
import {
  RequestBaseUrl,
  Request,
  RequestPayload,
  RequestReturn,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(join(RECORD_SERVER, '/dataAssetsLargeStatistics'))
export default class DataAssets {
  /**
   * 组织top10
   */
  @RequestPayload()
  @Request('get')
  getTop10Org(): RequestReturn {
    return { url: '/getOrgTop10' }
  }

  /* 主题top10 */
  @RequestPayload()
  @Request('get')
  getTop10Theme(): RequestReturn {
    return { url: 'getThemeTop10' }
  }

  /* 数据资产数据合集 */
  @RequestPayload()
  @Request('get')
  getDataCollection(): RequestReturn {
    return { url: '/list' }
  }
}
