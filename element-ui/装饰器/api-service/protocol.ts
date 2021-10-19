import {
  RequestBaseUrl,
  RequestReturn,
  RequestTips,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
import { ProtocolActiveTypeUpdate } from '~/pages/resourceSharing/protocol/index-type'
@RequestBaseUrl(RECORD_SERVER + '/protocol')
export default class Protocol {
  @RequestTips('保存')
  @Request('post')
  increase(data: { content: string; title: string }): RequestReturn {
    return { url: '', data }
  }

  @RequestTips('保存')
  @Request('put')
  update(data: ProtocolActiveTypeUpdate): RequestReturn {
    return { url: `/${data.protocolId}/details`, data }
  }

  @RequestPayload()
  @Request('get')
  details(): RequestReturn {
    return { url: '' }
  }
}
