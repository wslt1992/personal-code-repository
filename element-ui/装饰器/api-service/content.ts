import {
  Request,
  RequestBaseUrl,
  RequestConfirm,
  RequestPayload,
  RequestReturn,
  RequestSuccess,
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
  @RequestSuccess()
  @RequestTips(0)
  @Request('post')
  increase(data: {
    title: string
    content: string
    type: string
  }): RequestReturn {
    return { url: '', data }
  }

  @RequestSuccess()
  @RequestTips(0)
  @Request('put')
  update(data: {
    title: string
    content: string
    type: ContentType
    contentId: string
  }): RequestReturn {
    const { title, content, type, contentId } = data
    return {
      url: `${data.contentId}`,
      data: { title, content, type, contentId },
    }
  }

  @RequestConfirm('你确定要删除当前内容吗？')
  @RequestSuccess()
  @RequestTips('删除')
  @Request('delete')
  delete(contentId: string): RequestReturn {
    return { url: `${contentId}` }
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
