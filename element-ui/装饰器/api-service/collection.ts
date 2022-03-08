import {
  RequestBaseUrl,
  RequestReturn,
  Url,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER)
export default class Collection {
  @Url()
  list(): string {
    return '/departmentDataCollation/paging'
  }

  @Url()
  departmentDataCollation(code: string): string {
    return `systemDataCollation/paging?departmentCode=${code}`
  }

  @RequestPayload()
  @Request('get')
  getTables(
    departmentCode: string,
    systemId: string,
    tableName: string,
  ): RequestReturn {
    return {
      url: `/systemDataCollation/tables`,
      params: { departmentCode, systemId, tableName },
    }
  }

  @RequestPayload()
  @Request('get')
  getCounts(tableName: string): RequestReturn {
    return {
      url: `/systemDataCollation/counts`,
      params: { tableName },
    }
  }

  @Url()
  getTableAttribute(tableName: string): string {
    return `systemDataCollation/fields/paging?tableName=${tableName}`
  }

  @Request('get')
  requestTableAttribute(tableName: string): RequestReturn {
    return {
      url: `systemDataCollation/fields/paging?tableName=${tableName}`,
      params: { size: 99999 },
    }
  }

  @Url()
  getTableData(tableName: string): string {
    return `systemDataCollation/data/paging?tableName=${tableName}`
  }
}
