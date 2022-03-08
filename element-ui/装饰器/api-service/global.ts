import {
  RequestBaseUrl,
  RequestReturn,
  Url,
  Request,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
// import { formatDate } from '~/plugins/filters'

enum UploadType {
  apps = 'application',
}

@RequestBaseUrl(RECORD_SERVER)
export default class Global {
  @Url()
  uploadUrl(type?: string): string {
    if (type) {
      return `/documents/upload?folder=${type}`
    }
    return `/documents/upload`
  }

  uploadUrlApps(): string {
    return this.uploadUrl(UploadType.apps)
  }

  uploadUrlBanner(): string {
    return this.uploadUrl()
  }

  @Request('get')
  getUploadFile(type: UploadType): RequestReturn {
    return { url: `minios/list/${type}` }
  }

  // 查询应用图片
  getUploadFileApps(): RequestReturn {
    return this.getUploadFile(UploadType.apps)
  }

  // 获取应用图库列表
  @Request('get')
  getAppsList(): RequestReturn {
    return { url: `../../../app-group-icon/filenames.json` }
  }
}
