import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/interfaceUpdateLogs')
export default class InterfaceUpdateLogs {
  @RequestPayload()
  @Request('get')
  updateDetail(
    interfaceUpdateLogId: string,
    updateDetailId: string,
  ): RequestReturn {
    return {
      url: `/${interfaceUpdateLogId}/details/${updateDetailId}`,
      params: { interfaceUpdateLogId, updateDetailId },
    }
  }
}
