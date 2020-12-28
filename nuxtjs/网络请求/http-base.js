/*
 * @Description 如果服务很多，可以将服务 API 的公共部分抽离出来
 * @Example /security/api/v1/login, /security/api/v1/token
 * 将 /security/api 抽离后，如果服务路径更改只需要改动此处
 */
import path from 'path'

export const VERSION = 'v1'
export const PROJECT_NAME = 'bcos'
export const PROJECT_API = `/${PROJECT_NAME}/api/${VERSION}`

// user-center 用户中心
export const USER_CENTER = PROJECT_API

/**
 * 生成完整url
 * @param uri
 * @returns {string}
 */
export function generateBcosUrl(uri) {
  return path.join(PROJECT_API, uri)
}

export const join = path.join
