import {ENTRANCE_GUARD} from '~/const/entrance-guard'
import {ASSET} from '~/const/asset-path'
import {COMMUNITY} from '~/const/community'
import {MEETING_PATH} from '~/const/meeting-path'
import {USER_MENU} from '~/const/user-path'
import {REPORT_PATH} from '~/const/report-path'

import {isArray} from 'lodash'
const isFlat = true



/*
* nuxtjs中间件，在路由改变后，判断当前路径，动态改变菜单栏
* */

/**
 * 根据路径，获取当前侧边菜单栏
 * @param path
 * @returns {*[]}
 */
function switchRouterPath(path) {
  // 获取单个菜单组,平铺菜单项
  function getMenuFlatDatum() {
    return menuData[key]
  }
  function getMenuFlatDatumChildren() {
    return menuData[key].children
  }

  const key = path.split('/')[1]
  if (key && getMenuFlatDatum()) {
    if (isFlat && isArray(getMenuFlatDatumChildren())) {
      return [...getMenuFlatDatumChildren()]
    }
    return [getMenuFlatDatum()]
  }
  return []
}

const menuData = {
  entranceGuard: ENTRANCE_GUARD,
  'assets-page': ASSET,
  community: COMMUNITY,
  'meeting-manager': MEETING_PATH,
  userManage: USER_MENU,
  report: REPORT_PATH,
}
export default async ({store, route}) => {
  const setSiderMenu = 'setSiderMenu'
  store.commit(setSiderMenu, switchRouterPath(route.path))
}
