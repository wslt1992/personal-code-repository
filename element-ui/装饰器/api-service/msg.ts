import {
  RequestBaseUrl,
  RequestReturn,
  Url,
  Request,
  RequestSuccess,
  RequestConfirm,
  RequestTips,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/messages')
export default class Message {
  @Url()
  list(): string {
    return '/paging'
  }

  @RequestConfirm('您确定要删除当前消息？')
  @RequestSuccess()
  @RequestTips('删除')
  @Request('delete')
  deleteMSg(data: Record<string, any>): RequestReturn {
    return {
      url: `${data.messageId}`,
      data,
    }
  }

  @RequestSuccess()
  @Request('put')
  changeReadToTrue(data: Record<string, any>): RequestReturn {
    return {
      url: `${data.messageId}`,
      data: { ...data, read: true },
    }
  }

  @RequestPayload()
  @Request('get')
  typeList(): RequestReturn {
    return {
      url: `type/list`,
    }
  }
}
