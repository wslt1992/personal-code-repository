import { join } from 'path'
import {
  RequestReturn,
  Request,
  RequestBaseUrl,
  RequestTips,
  RequestPayload,
  RequestBack,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(join(RECORD_SERVER, '/orgDsApplyList'))
export class ResourceAuditList {
  @RequestPayload()
  @Request('get')
  auditDetails(orgDsApplyListId: string): RequestReturn {
    return { url: `/${orgDsApplyListId}` }
  }
}
@RequestBaseUrl(join(RECORD_SERVER, '/org/ds/audit'))
export class ResourceAudit {
  /* 资源审批明细 */
  @RequestPayload()
  @Request('get')
  auditDetail(orgDsId: string): RequestReturn {
    return { url: `detail/${orgDsId}` }
  }

  /* 局领导审批 */
  @RequestBack()
  @RequestTips('审批')
  @Request('post')
  bossPass(orgDsId: string, data: any): RequestReturn {
    const url = `boss/confirm/${orgDsId}`
    return { url, data }
  }

  // 主管领导审批
  @RequestBack()
  @RequestTips('审批')
  @Request('post')
  leaderPass(orgDsId: string, data: any): RequestReturn {
    const url = `leader/confirm/${orgDsId}`
    return { url, data }
  }

  // 一键审批
  @RequestTips('审批')
  @Request('post')
  allPass(orgDsId: string): RequestReturn {
    const url = `/pass/${orgDsId}`
    return { url }
  }

  // 一键不审批
  @RequestTips('不通过')
  @Request('post')
  allNotPass(orgDsId: string): RequestReturn {
    const url = `/un/pass/${orgDsId}`
    return { url }
  }

  @RequestPayload()
  @Request('get')
  track(orgDsId: string): RequestReturn {
    return { url: `/track/${orgDsId}` }
  }

  @RequestPayload()
  @Request('get')
  trackSimple(orgDsId: string, applyLogId: string): RequestReturn {
    return { url: `/apply/log/track/${orgDsId}/${applyLogId}` }
  }

  /* 科员审核 */
  @RequestBack()
  @RequestTips('审批')
  @Request('post')
  staffAudit(orgDsId: string, data: any[]): RequestReturn {
    const url = `/confirm/${orgDsId}`
    return {
      url,
      data,
    }
  }
}

@RequestBaseUrl(RECORD_SERVER, '/orgDsOaorg')
// @RequestBaseUrl(join(RECORD_SERVER, '/orgDsOaorg'))
export class ResourceAuditPerson {
  /* 获取部门 */
  @RequestPayload()
  @Request('get')
  getGroup(): RequestReturn {
    return { url: `queryOrgTree` }
  }

  /* 通过部门获取人员 */
  @RequestPayload()
  @Request('get')
  getPersonsByGroupID(orgId: string): RequestReturn {
    return { url: `/user/${orgId}` }
  }
}
