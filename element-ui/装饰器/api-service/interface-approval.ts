import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  Url,
  RequestBack,
  RequestTips,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/applys')
export default class InterfaceApproval {
  @RequestBack()
  @RequestTips('审核')
  @Request('post')
  approvalAgree(id: string): RequestReturn {
    return {
      url: `/${id}/pass/`,
      data: {
        applyId: id,
      },
    }
  }

  @RequestBack()
  @RequestTips('退回申请')
  @Request('post')
  disableApproval(id: string, reviewRemark: string): RequestReturn {
    return {
      url: `/${id}/reject/`,
      data: {
        applyId: id,
        reviewRemark,
      },
    }
  }

  @Url()
  log(id: string): string {
    return `/${id}/record`
  }
}
