/**
 * 验证函数模块
 * 1. PortValidator 端口号
 * 2. MACValidator MAC地址
 * 3. IPValidator ip
 * 4. PhoneValidator 11位手机号
 * */

/**
 * @method PortValidator
 * @param {any} rule 规则
 * @param {number} value 校验值
 * @param {function} callback 回调函数
 * @returns {funtion} 回调调用结果
 */
export const PortValidator = (rule, value, callback) => {
  if (value && !/^[0-9]*$/.test(value)) {
    callback(new Error('请输入正确的主机端口'))
  } else if (value > 65535 || value < 0) {
    callback(new Error('端口范围为0~65535'))
  }
  callback()
}

/**
 * @method MACValidator 当前项目 MAC 地址仅支持两字符加 : 隔开的形式
 * @param {any} rule 规则
 * @param {number} value 校验值
 * @param {function} callback 回调函数
 * @returns {funtion} 回调调用结果
 */
export const MACValidator = (rule, value, callback) => {
  let macReg = /^[a-fA-F0-9]{2}([:][a-fA-F0-9]{2})([:][a-fA-F0-9]{2})([:][a-fA-F0-9]{2})([:][a-fA-F0-9]{2})([:][a-fA-F0-9]{2})$/
  if (value && !macReg.test(value)) {
    callback(
      new Error('请输入正确MAC地址, 格式为 34:CF:F6:80:CA:7d, 不区分大小写'),
    )
  }
  callback()
}

/**
 * @method IPValidator 校验ip输入
 * @param {any} rule 规则
 * @param {number} value 校验值
 * @param {function} callback 回调函数
 * @returns {funtion} 回调调用结果
 */
export const IPValidator = (rule, value, callback) => {
  let ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (value && !ipReg.test(value)) {
    callback(new Error('请输入合法的IP地址！'))
  }
  callback()
}

/**
 * @method PhoneValidator 校验手机号输入
 * @param {any} rule 规则
 * @param {number} value 校验值
 * @param {function} callback 回调函数
 * @returns {funtion} 回调调用结果
 */
export const PhoneValidator = (rule, value, callback) => {
  let phoneReg = /^1[3456789]\d{9}$/
  if (value && !phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  }
  callback()
}
