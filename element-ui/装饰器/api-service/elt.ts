import {
  RequestBaseUrl,
  // RequestConfirm,
  // RequestSuccess,
  // RequestTips,
  Request,
  Url,
  RequestReturn,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(RECORD_SERVER + '/etlCleaningTask')
export default class Elt {
  /* @RequestConfirm('你确定要取消当前吗？')
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
  } */
  @RequestPayload()
  @Request('get')
  getLogDetail(
    etlCleaningTaskId: string,
    jobId: string,
    id: string,
  ): RequestReturn {
    return {
      url: `/${etlCleaningTaskId}/log/${jobId}/${id}`,
    }
  }

  @Url()
  listLog(etlCleaningTaskId: string, jobId: string): string {
    return `/${etlCleaningTaskId}/log/${jobId}/paging`
  }
}
