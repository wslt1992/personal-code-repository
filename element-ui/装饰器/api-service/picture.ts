import {
  RequestReturn,
  Request,
  RequestBaseUrl,
  RequestTips,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(RECORD_SERVER + '/pictures')
export default class Picture {
  @RequestTips('保存')
  @Request('post')
  increase(data: {
    pictureId: string
    title: string
    subtitle: string
    url: string
    picture: string
  }): RequestReturn {
    return { url: '', data }
  }

  @RequestPayload()
  @Request('get')
  details(): RequestReturn {
    return {
      url: ``,
    }
  }
}
