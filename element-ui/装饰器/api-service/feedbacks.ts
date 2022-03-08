import { join } from 'path'
import {
  RequestReturn,
  Request,
  RequestBaseUrl,
  Url,
  RequestTips,
  RequestConfirm,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(join(RECORD_SERVER, '/feedbacks'))
export default class Feedbacks {
  @RequestConfirm('你确定要归档吗？')
  @RequestTips('归档')
  @Request('put')
  updateFeedbackArchive(feedbackId: string, sortOut = true): RequestReturn {
    // isApply: 1 表示申请页
    const url = `/${feedbackId}/${sortOut}`
    return { url }
  }

  @RequestConfirm('你确定要取消归档吗？')
  @RequestTips('取消归档')
  @Request('put')
  updateFeedbackArchiveFalse(
    feedbackId: string,
    sortOut = false,
  ): RequestReturn {
    const url = `/${feedbackId}/${sortOut}`
    return { url }
  }

  // 归档
  @Url()
  feedbackListTrue(): string {
    return `/paging?sortOut=true`
  }

  @Url()
  feedbackListFalse(): string {
    return `/paging?sortOut=false`
  }

  @RequestTips(0)
  @Request('post')
  increase(content: string): RequestReturn {
    return { url: '', data: { content } }
  }
}
