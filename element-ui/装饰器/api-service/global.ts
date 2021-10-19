import {
  RequestBaseUrl,
  RequestReturn,
  Url,
  Request,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
// import { formatDate } from '~/plugins/filters'

enum UploadType {
  apps = 2,
  banner = 3,
}

@RequestBaseUrl(RECORD_SERVER)
export default class Global {
  @Url()
  uploadUrl(type: number): string {
    return `minios/image/${type}`
  }

  uploadUrlApps(): string {
    return this.uploadUrl(UploadType.apps)
  }

  uploadUrlBanner(): string {
    return this.uploadUrl(UploadType.banner)
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
