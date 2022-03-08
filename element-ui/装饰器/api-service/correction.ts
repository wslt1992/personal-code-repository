import {
  RequestBaseUrl,
  // RequestConfirm,
  RequestSuccess,
  Request,
  Url,
  RequestReturn,
  RequestTips,
  RequestConfirm,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(RECORD_SERVER + '/corrections')
export default class Correction {
  /*   @RequestConfirm('你确定要取消当前吗？')
  @RequestSuccess()
  @RequestTips('取消')
  @Request('delete')
  delete(collectionManagementId: string): RequestReturn {
    return { url: `${collectionManagementId}` }
  } */

  @RequestSuccess()
  @RequestTips('提交')
  @Request('post')
  add(correction: any): RequestReturn {
    return { url: ``, data: correction }
  }

  @RequestSuccess()
  @RequestTips('修改')
  @Request('put')
  put(correction: any, status?: string): RequestReturn {
    if (status) {
      return {
        url: `${correction.correctionId}`,
        data: { ...correction, status },
      }
    } else {
      return {
        url: `${correction.correctionId}`,
        data: { ...correction },
      }
    }
  }

  audit(correction: any): RequestReturn {
    const status = '1'
    return this.put(correction, status)
  }

  @RequestConfirm('确定要重新提交当前纠错吗?')
  pending(correction: any): RequestReturn {
    const status = '0'
    return this.put(correction, status)
  }

  @RequestConfirm('确定要撤回当前纠错吗?')
  revoke(correction: any): RequestReturn {
    const status = '3'
    return this.put(correction, status)
  }

  edit(correction: any): RequestReturn {
    let status = correction.status
    if (status === '已撤回') {
      status = '3'
    } else if (status === '已退回') {
      status = '2'
    }
    return this.put(correction, status)
  }

  @RequestConfirm('确定要退回当前纠错吗?')
  disagree(correction: any): RequestReturn {
    const status = '2'
    return this.put(correction, status)
  }
  /*  @RequestPayload()
  @Request('get')
  getContent(contentId: string): RequestReturn {
    return {
      url: `${contentId}`,
    }
  } */

  @Url()
  list(): string {
    return `/paging`
  }
}
