import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestSuccess,
  RequestConfirm,
  RequestTips,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/applys')
export default class Apply {
  @RequestConfirm('您确定要取消当前申请？')
  @RequestSuccess()
  @RequestTips('取消申请')
  @Request('post')
  cancel(applyId: string): RequestReturn {
    return {
      url: `/${applyId}/cancel`,
    }
  }

  @RequestConfirm('您确定要撤销当前申请？')
  @RequestSuccess()
  @RequestTips('撤销申请')
  @Request('post')
  revoke(applyId: string): RequestReturn {
    return {
      url: `/${applyId}/revoke`,
    }
  }

  @RequestConfirm('您确定要重新申请？')
  @RequestSuccess()
  @RequestTips('重新申请')
  @Request('post')
  reApply(applyId: string): RequestReturn {
    return {
      url: `/${applyId}/reply`,
    }
  }

  @RequestConfirm('您确定要删除当前项？')
  @RequestSuccess()
  @Request('delete')
  deletee(applyId: string): RequestReturn {
    return {
      url: `/${applyId}`,
    }
  }

  @RequestPayload()
  @Request('get')
  details(applyId: string): RequestReturn {
    return {
      url: `/${applyId}/details`,
    }
  }
}
