import {cloneDeep, isArray, isDate, isObject} from 'lodash'

const timeUtils = {
    dateToTimestamp(date) {
        if (isDate(date)) return date.getTime()
    },
    /**
     * 用于提交数据，服务器需要时间戳，而此时对象里为date类型数据
     * 遍历obj，找出date对象并转为时间戳
     * @param obj
     */
    objPropertyToTimestamp(obj) {
        const tempObj = cloneDeep(obj)
        if (!isObject(obj)) {
            return
        }
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                return
            }
            if (!isDate(obj[key])) {
                continue
            }

            obj[key] = this.dateToTimestamp(obj[key])
        }
        return tempObj
    },

    /**
     * 时间数组转化为时间戳
     * [date1,date2]---> timestamp1-timestamp2
     * @param timeRange
     * @returns {string}
     * @constructor
     */
    TimeRangeToTimestampString(timeRange) {
        if (!isArray(timeRange) || !isDate(timeRange[0])) {
            return ''
        }
        return timeRange[0].getTime() + '-' + timeRange[1].getTime()
    },
}
export default timeUtils
