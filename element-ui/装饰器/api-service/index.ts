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

/*
示例 FnReturnTypeToPromise 用法
let api = {
  applicantAPI: new ApplicantAPI(),
  feedbacks: (new Feedbacks() as any) as FnReturnTypeToPromise<Feedbacks>,
} */

@Injectable('api')
export class Api {
  phaseI = new PhaseI() as FnReturnTypeToPromise<PhaseI>
  apply = new Apply() as FnReturnTypeToPromise<Apply>
  applicantAPI = new ApplicantAPI() as FnReturnTypeToPromise<ApplicantAPI>
  feedbacks = new Feedbacks() as FnReturnTypeToPromise<Feedbacks>
  appMap = new AppMap() as FnReturnTypeToPromise<AppMap>
  apps = new Apps() as FnReturnTypeToPromise<Apps>
  global = new Global() as FnReturnTypeToPromise<Global>
  picture = new Picture() as FnReturnTypeToPromise<Picture>
  content = new Content() as FnReturnTypeToPromise<Content>
  interfaceM = new InterfaceManager() as FnReturnTypeToPromise<InterfaceManager>
  interface = new Interface() as FnReturnTypeToPromise<Interface>
  protocol = new Protocol() as FnReturnTypeToPromise<Protocol>
  model = new Model() as FnReturnTypeToPromise<Model>
  message = new Message() as FnReturnTypeToPromise<Message>
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
