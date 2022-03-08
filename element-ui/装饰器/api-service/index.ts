import ApplicantAPI from './applicant-api'
import Feedbacks from '~/api/api-service/feedbacks'
import {
  APIReturnPromise,
  FnReturnTypeToPromise,
} from '~/pages/resourceSharing/apiServices/request'
import AppMap from '~/api/api-service/app-map'
import Apps from '~/api/api-service/apps'
import { Injectable } from '~/pages/resourceSharing/apiServices/injector'
import Global from '~/api/api-service/global'
import Picture from '~/api/api-service/picture'
import Content from '~/api/api-service/content'
import InterfaceManager from '~/api/api-service/interface-manager'
import Protocol from '~/api/api-service/protocol'
import Model from '~/api/api-service/model'
import Message from '~/api/api-service/msg'
import Interface from '~/api/api-service/interfaces'
import InterfaceLogStatistics from '~/api/api-service/interface-log-statistics'
import InterfaceApproval from '~/api/api-service/interface-approval'
import PhaseI from '~/api/api-service/phase-I'
import Apply from '~/api/api-service/apply'
import InterfaceUpdateLogs from '~/api/api-service/interface-update-log'
import Collection from '~/api/api-service/collection'
import Collect from '~/api/api-service/collect'
import Elt from '~/api/api-service/elt'
import Correction from '~/api/api-service/correction'
import Catalog from '~/api/api-service/catalog'
import OrgDsService from '~/api/api-service/orgDsService'
import {
  ResourceAudit,
  ResourceAuditList,
  ResourceAuditPerson,
} from '~/api/api-service/resourceAudit'
import DataAssets from '~/api/api-service/datav'

/*
示例 FnReturnTypeToPromise 用法
let api = {
  applicantAPI: new ApplicantAPI(),
  feedbacks: (new Feedbacks() as any) as FnReturnTypeToPromise<Feedbacks>,
} */

@Injectable('api')
export class Api {
  phaseI = new PhaseI() as FnReturnTypeToPromise<PhaseI>
  dataAssets = new DataAssets() as FnReturnTypeToPromise<DataAssets>
  apply = new Apply() as FnReturnTypeToPromise<Apply>
  applicantAPI = new ApplicantAPI() as FnReturnTypeToPromise<ApplicantAPI>
  feedbacks = new Feedbacks() as FnReturnTypeToPromise<Feedbacks>
  appMap = new AppMap() as FnReturnTypeToPromise<AppMap>
  apps = new Apps() as FnReturnTypeToPromise<Apps>
  global = new Global() as FnReturnTypeToPromise<Global>
  picture = new Picture() as FnReturnTypeToPromise<Picture>
  content = new Content() as FnReturnTypeToPromise<Content>
  interfaceM = new InterfaceManager() as FnReturnTypeToPromise<InterfaceManager>
  collect = new Collect() as FnReturnTypeToPromise<Collect>
  elt = new Elt() as FnReturnTypeToPromise<Elt>
  correction = new Correction() as FnReturnTypeToPromise<Correction>
  interfaceUpdateLogs = new InterfaceUpdateLogs() as FnReturnTypeToPromise<
    InterfaceUpdateLogs
  >

  interface = new Interface() as FnReturnTypeToPromise<Interface>
  orgDsService = new OrgDsService() as FnReturnTypeToPromise<OrgDsService>
  protocol = new Protocol() as FnReturnTypeToPromise<Protocol>
  model = new Model() as FnReturnTypeToPromise<Model>
  message = new Message() as FnReturnTypeToPromise<Message>
  collection = new Collection() as FnReturnTypeToPromise<Collection>
  catalog = new Catalog() as FnReturnTypeToPromise<Catalog>
  auditList = new ResourceAuditList() as FnReturnTypeToPromise<
    ResourceAuditList
  >

  auditPerson = new ResourceAuditPerson() as FnReturnTypeToPromise<
    ResourceAuditPerson
  >

  audit = new ResourceAudit() as FnReturnTypeToPromise<ResourceAudit>

  interfaceLogStatistics = new InterfaceLogStatistics() as FnReturnTypeToPromise<
    InterfaceLogStatistics
  >

  interfaceApproval = new InterfaceApproval() as FnReturnTypeToPromise<
    InterfaceApproval
  >
}
export type APIReturnPromiseApi = APIReturnPromise<Api>
const api = new Api()
export default api
