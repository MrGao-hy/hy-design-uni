import type { DateModeEnum } from '../../index'

type IParam = {
    /** 值 */
    value: string | number
    /** 时间模型 */
    mode: DateModeEnum
}
export interface IDatetimePickerEmits {
    /** 关闭选择器时触发 */
    close: []
    /** 点击取消按钮 */
    cancel: []
    /** 点击确定按钮，返回当前选择的值 */
    confirm: [param: IParam]
    /** 当选择值变化时触发 */
    change: [param: IParam]
    /** 更新值触发 */
    'update:modelValue': [value: IParam['value']]
    /** 更新值关闭值 */
    'update:show': [value: boolean]
}
