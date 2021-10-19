import {
  RequestBaseUrl,
  RequestReturn,
  Request,
  RequestPayload,
} from '~/pages/resourceSharing/apiServices/request'
import { RECORD_SERVER } from '~/api/serviceList'
@RequestBaseUrl(RECORD_SERVER + '/ontologyModel')
export default class Model {
  @RequestPayload()
  @Request('get')
  list(): RequestReturn {
    return { url: 'list' }
  }
}
