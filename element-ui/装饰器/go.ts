import { RawLocation } from 'vue-router/types/router'
import { RouterGO } from '~/pages/apiServices/router-go'

@RouterGO('/apiServices/applicant')
class RouterApi {
  /**
   * 跳转到申请页
   * @param id
   */
  goApply(id: number | string): RawLocation {
    return 'apply/' + id
  }

  goResult(): RawLocation {
    return '/result'
  }

  goDirectorApi(): RawLocation {
    return '/director-api'
  }

  goAppliedApi(): RawLocation {
    return { path: '/applied-api' }
  }

  goAPIDocument(id: number | string): RawLocation {
    return '/document-api' + id
  }
}

@RouterGO('/apiServices/manager')
class ManagerApi {
  goManagerAudit(): RawLocation {
    return '/audit'
  }

  goAuditDetail(): RawLocation {
    return '/audit-detail'
  }
}

export default new RouterApi()

export const managerApi = new ManagerApi()
