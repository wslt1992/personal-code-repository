/**
 * 确认提示框，
 * $confirm().then执行后面的事情
 * @param context
 * @returns {Promise<MessageBoxData>}
 */
export function $confirm(context = '确认删除所选项目吗?') {
    return MessageBox.confirm(context, '', {
        confirmButtonClass: 'el-button--danger',
    }).catch(() => {})
}