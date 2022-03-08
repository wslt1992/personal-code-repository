import {
  RequestBaseUrl,
  RequestReturn,
  Url,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER)
export default class Catalog {
  @Url()
  list(): string {
    return '/departmentDataCatalogues/paging'
  }

  @Url()
  departmentDataCollation(code: string): string {
    return `systemDataCatalogues/paging?departmentCode=${code}`
  }

  @RequestPayload()
  @Request('get')
  getTables(
    departmentCode: string,
    systemId: string,
    tableName: string,
  ): RequestReturn {
    return {
      url: `/systemDataCatalogues/tables`,
      params: { departmentCode, systemId, tableName },
    }
  }

  @RequestPayload()
  @Request('get')
  getCounts(tableName: string): RequestReturn {
    return {
      url: `/systemDataCatalogues/counts`,
      params: { tableName },
    }
  }

  @Url()
  getTableAttribute(tableName: string): string {
    return `systemDataCatalogues/fields/paging?tableName=${tableName}`
  }

  @Request('get')
  requestTableAttribute(tableName: string): RequestReturn {
    return {
      url: `systemDataCatalogues/fields/paging?tableName=${tableName}`,
      params: { size: 99999 },
    }
  }

  @Url()
  getTableData(tableName: string): string {
    return `systemDataCatalogues/data/paging?tableName=${tableName}`
  }

  @Url()
  word(): string {
    // todo 后台没有提供参数
    return `systemDataCatalogues/export/word`
  }
}
