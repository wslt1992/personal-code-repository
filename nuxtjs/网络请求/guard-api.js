// 门禁系统模块API

import {generateBcosUrl} from '~/api/serviceList'
import xmeshRequest from '@/utils/ajaxRequest'

/**
 * 设备
 */
const Guard_Base = generateBcosUrl('/entranceGuards')
const modelUrl = generateBcosUrl('/devicemodel/entranceGuard')

const active = {
  /**
   * 添加设备
   * @method createDevice
   * @param {object} options
   * @return {object} 添加响应参数
   */
  createDevice: options => {
    return xmeshRequest('$post', Guard_Base, options)
  },

  /**
   * 更新设备
   * @method updateDevice
   * @param {object} options
   * @param {string} id 设备id
   * @return {object} 更新响应参数
   */
  updateDevice: (options, id) => {
    return xmeshRequest('$put', `${Guard_Base}/${id}`, options)
  },

  /**
   * 删除设备
   * @method deleteDevice
   * @param {object} options
   * @param {string} id 设备id
   * @return {object} 删除响应参数
   */
  deleteDevice: (options, id) => {
    return xmeshRequest('$delete', `${Guard_Base}/${id}`, options)
  },

  /**
   * 查找设备
   * @method queryDevice
   * @param {object} options
   * @param {string} id 设备id
   * @return {object} 删除响应参数
   */
  queryDevice: (options, id) => {
    return xmeshRequest('$get', `${Guard_Base}/${id}`, options)
  },

  /**
   * @method queryModels
   * @param {object} options
   * @return {Array[]} 获取中控品牌列表
   */
  queryModels: options => {
    return xmeshRequest('$get', modelUrl, options)
  },

  /**
   * 获取api路径
   * @method findApi
   * @return {string} 返回会议设备路径
   */
  findApi() {
    return Guard_Base
  },
}

export default active
