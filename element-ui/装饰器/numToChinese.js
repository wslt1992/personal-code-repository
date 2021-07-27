function stateToChinese(state) {
  const stateChinese = ['审核中', '已撤回', '已退回', '已审批']
  return stateChinese[state]
}
const numToChinese = {
  stateToChinese,
}
export default numToChinese
