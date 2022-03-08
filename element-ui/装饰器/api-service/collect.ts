import {
  RequestBaseUrl,
  RequestConfirm,
  RequestSuccess,
  RequestTips,
  Request,
  Url,
  RequestReturn,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(RECORD_SERVER + '/collectionManagements')
export default class Collect {
  @RequestConfirm('你确定要取消当前吗？')
  @RequestSuccess()
  @RequestTips('取消')
  @Request('delete')
  delete(collectionManagementId: string): RequestReturn {
    return { url: `${collectionManagementId}` }
  }

  @RequestConfirm('你确定要收藏当前服务吗？')
  @RequestTips('收藏')
  @Request('post')
  add(collectionManagement: any): RequestReturn {
    return { url: ``, data: { ...collectionManagement } }
  }

  @RequestConfirm('你确定要收藏选中的服务吗？')
  @RequestTips('收藏')
  @Request('post')
  addBatch(collectionManagements: any[]): RequestReturn {
    return { url: `batch`, data: collectionManagements }
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
