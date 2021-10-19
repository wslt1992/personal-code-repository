import {
  RequestReturn,
  Request,
  RequestBaseUrl,
  Url,
  RequestTips,
  RequestSuccess,
  RequestConfirm,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
// import { formatDate } from '~/plugins/filters'

@RequestBaseUrl(RECORD_SERVER + '/applications')
export default class Apps {
  @Url()
  appsList(id: string): string {
    return `/paging?applicationTypeId=${id}`
  }

  @RequestTips('停用')
  switchFalse(id: string, resourceVersion: string): RequestReturn {
    return this.switch(id, false, resourceVersion)
  }

  @RequestTips('启用')
  switchTrue(id: string, resourceVersion: string): RequestReturn {
    return this.switch(id, true, resourceVersion)
  }

  @Request('put')
  switch(id: string, enable: boolean, resourceVersion: string): RequestReturn {
    return {
      url: `/${id}`,
      data: { enable, applicationId: id, resourceVersion },
    }
  }

  @RequestSuccess()
  @RequestTips(0)
  @Request('put')
  update(
    applicationTypeId: string,
    data: {
      applicationTypeId: string
      name: string
      description: string
      url: string
      logo: string
      resourceVersion: string
      applicationId: number
    },
  ): RequestReturn {
    return { url: `${applicationTypeId}`, data }
  }

  @RequestSuccess()
  @RequestTips(0)
  @Request('post')
  increase(data: {
    applicationTypeId: string
    name: string
    description: string
    url: string
    logo: string
  }): RequestReturn {
    return { url: '', data }
  }

  @RequestConfirm('确认删除此应用吗')
  @RequestSuccess()
  @RequestTips('删除')
  @Request('delete')
  delete(applicationId: string): RequestReturn {
    return {
      url: `/${applicationId}`,
      data: { applicationId },
    }
  }

  @Request('put')
  click(applicationId: string): RequestReturn {
    return {
      url: `/increaseClicks/${applicationId}`,
      data: { applicationId },
    }
  }
}
