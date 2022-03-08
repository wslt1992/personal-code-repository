import {
  RequestReturn,
  Request,
  RequestBaseUrl,
  Url,
  RequestTips,
  RequestSuccess,
  RequestConfirm,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
// import { formatDate } from '~/plugins/filters'
@RequestBaseUrl(RECORD_SERVER + '/applicationTypes')
export default class AppMap {
  @Url()
  atlas(): string {
    return `/paging`
  }

  // @RequestSuccess()
  @RequestTips('停用')
  switchFalse(
    applicationTypeId: string,
    resourceVersion: string,
  ): RequestReturn {
    return this.switch(applicationTypeId, false, resourceVersion)
  }

  // @RequestSuccess()
  @RequestTips('启用')
  switchTrue(
    applicationTypeId: string,
    resourceVersion: string,
  ): RequestReturn {
    return this.switch(applicationTypeId, true, resourceVersion)
  }

  @Request('put')
  switch(
    applicationTypeId: string,
    enable: boolean,
    resourceVersion: string,
  ): RequestReturn {
    return {
      url: `/${applicationTypeId}`,
      data: { enable, applicationTypeId, resourceVersion },
    }
  }

  @RequestSuccess()
  @RequestTips(0)
  @Request('put')
  update(
    applicationTypeId: string,
    data: {
      name: string
      description: string
      resourceVersion: number
      enable: boolean
    },
  ): RequestReturn {
    return {
      url: `/${applicationTypeId}`,
      data: { ...data, applicationTypeId },
    }
  }

  @RequestSuccess()
  @RequestTips(0)
  @Request('post')
  increase(name: string, description: string, enable: boolean): RequestReturn {
    return { url: '', data: { name, description, enable } }
  }

  @RequestConfirm('确认删除此应用分类吗')
  @RequestSuccess()
  @RequestTips('删除')
  @Request('delete')
  delete(applicationTypeId: string): RequestReturn {
    return {
      url: `/${applicationTypeId}`,
      data: { applicationTypeId },
    }
  }

  @RequestPayload()
  @Request('get')
  list(): RequestReturn {
    return {
      url: `/list`,
    }
  }
}
