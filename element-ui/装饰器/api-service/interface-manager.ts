import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  Url,
  RequestPayload,
  RequestTips,
  RequestSuccess,
  RequestConfirm,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'

@RequestBaseUrl(RECORD_SERVER + '/interfaces')
export default class InterfaceManager {
  @Url()
  _list(interfaceType: string): string {
    return `/list?interfaceType=${interfaceType}`
  }

  commonList(): string {
    return this._list('1')
  }

  customizeList(): string {
    return this._list('2')
  }

  /* 获取公共模型 */
  @RequestPayload()
  @Request('get')
  getCommonModel(
    ontologyModelId: string,
    serviceType: string,
    type: string,
  ): RequestReturn {
    return {
      url: '/normal/ontologyModel',
      params: { ontologyModelId, serviceType, type },
    }
  }

  @RequestTips('脱敏禁用')
  @Request('put')
  desensitizationDisable(id: string): RequestReturn {
    return {
      url: `${id}/desensitization/disable`,
    }
  }

  @RequestTips('脱敏开启')
  @Request('put')
  desensitizationEnable(id: string): RequestReturn {
    return {
      url: `${id}/desensitization/enable`,
    }
  }

  @RequestTips('接口禁用')
  @Request('put')
  statusEnable(id: string): RequestReturn {
    return {
      url: `${id}//status/disable`,
    }
  }

  @RequestTips('接口开启')
  @Request('put')
  statusDisable(id: string): RequestReturn {
    return {
      url: `${id}/status/enable`,
    }
  }

  @RequestPayload()
  @Request('get')
  getBaseInfo(interfaceId: string): RequestReturn {
    return {
      url: `/${interfaceId}/baseInfo`,
    }
  }

  @RequestSuccess()
  @RequestTips('修改')
  @Request('put')
  putBaseInfo(data: any): RequestReturn {
    return {
      url: `/${data.interfaceId}/baseInfo`,
      data,
    }
  }

  getParamsInfo(interfaceId: string): RequestReturn {
    return this.getDetailsInfo(interfaceId)
  }

  // @RequestTips('参数修改')
  // @Request('put')
  // putDetailsInfo(interfaceId: string, info: any): RequestReturn {
  //   return {
  //     url: `/${interfaceId}/details`,
  //     data: info,
  //   }
  // }

  @RequestPayload()
  @Request('get')
  getDetailsInfo(interfaceId: string): RequestReturn {
    return {
      url: `/${interfaceId}/details`,
    }
  }

  @RequestSuccess()
  @RequestTips('修改')
  @Request('put')
  putParamsInfo(data: any): RequestReturn {
    return {
      url: `/${data.interfaceId}/details`,
      data,
    }
  }

  @RequestSuccess()
  @RequestTips('新增通用接口')
  @Request('post')
  createCommonApi(data: any): RequestReturn {
    return {
      url: `/normal`,
      data,
    }
  }

  @RequestSuccess()
  @RequestTips('新增自定义接口')
  @Request('post')
  createCustomApi(data: any): RequestReturn {
    return {
      url: `/customize`,
      data,
    }
  }

  @RequestConfirm('确认删除当前接口吗')
  @RequestSuccess()
  @RequestTips('接口删除')
  @Request('delete')
  deleteInterface(interfaceId: string): RequestReturn {
    return {
      url: `/${interfaceId}`,
      data: { interfaceId },
    }
  }
}
