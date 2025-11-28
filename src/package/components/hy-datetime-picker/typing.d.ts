import { DateModeEnum } from '../../typing'

type IParam = {
    /** 值 */
    value: string | number
    /** 时间模型 */
    mode: DateModeEnum
}
export interface IDatetimePickerEmits {
    /** 关闭选择器时触发 */
    (e: 'close'): void
    /** 点击取消按钮 */
    (e: 'cancel'): void
    /** 点击确定按钮，返回当前选择的值 */
    (e: 'confirm', param: IParam): void
    /** 当选择值变化时触发 */
    (e: 'change', param: IParam): void
    /** 更新值触发 */
    (e: 'update:modelValue', value: IParam['value']): void
}
