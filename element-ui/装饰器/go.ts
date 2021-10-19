import { RawLocation } from 'vue-router/types/router'
import { RouterGO } from '~/pages/resourceSharing/apiServices/router-go'

@RouterGO('/resourceSharing/apiServices/applicant')
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

  goAppliedApiCustom(): RawLocation {
    return '/custom-api-apply'
  }

  goApiLog(): RawLocation {
    return '/api-log'
  }

  goAPIDocument(id: number | string): RawLocation {
    return '/document-api/' + id
  }
}

@RouterGO('/resourceSharing/apiServices/manager')
class ManagerApi {
  goManagerAudit(): RawLocation {
    return '/audit'
  }

  goAuditDetail(): RawLocation {
    return '/audit-detail'
  }
}

@RouterGO('/resourceSharing/dataServiceMG/commonInterface')
class ManagerApi2 {
  goIndex(): RawLocation {
    return '/'
  }

  goCreate(): RawLocation {
    return '/create'
  }

  goDetail(id: number): RawLocation {
    return '/detail/' + id
  }
}

export default new RouterApi()

const managerApi = new ManagerApi()
const managerApi2 = new ManagerApi2()
export { managerApi, managerApi2 }
