import {
  Request,
  RequestBack,
  RequestBaseUrl,
  RequestPayload,
  RequestReturn,
  RequestTips,
  Url,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

enum ContentType {
  STANDARD = 1, // 标准
  SPECIFICATION = 2, // 规范
  REGULATIONS = 3, // 法规
  POLICIES = 4, // 政策
}

@RequestBaseUrl(RECORD_SERVER + '/contents')
export default class Content {
  @Request('post')
  increase(data: {
    title: string
    content: string
    type: ContentType
  }): RequestReturn {
    return { url: '', data }
  }

  @RequestBack()
  @RequestTips(0)
  increaseStandard(data: { title: string; content: string }): RequestReturn {
    return this.increase({ ...data, type: ContentType.STANDARD })
  }

  @RequestBack()
  @RequestTips(0)
  @Request('put')
  update(data: {
    title: string
    content: string
    type: ContentType
    contentId: string
  }): RequestReturn {
    return { url: `${data.contentId}`, data }
  }

  @RequestPayload()
  @Request('get')
  getContent(contentId: string): RequestReturn {
    return {
      url: `${contentId}`,
    }
  }

  @Url()
  list(): string {
    return `/paging`
  }

  @RequestPayload()
  @Request('get')
  list2(page: number): RequestReturn {
    return {
      url: `/paging`,
      params: {
        size: 10,
        page,
      },
    }
  }
}
