import type { ExtractPropTypes } from 'vue'
import type pickerProps from './props'

export interface HyPickerProps extends ExtractPropTypes<typeof pickerProps> {}

export interface PickerColumnVo {
    /**
     * value必填,回填根据这个值判断
     * */
    value: string | number
    /**
     * 显示文本
     * */
    label?: string
    /**
     * 任意数据
     * */
    [key: string]: any
}

export type SelectValueVo = {
    value: string[]
    index?: number
    indexs?: number[]
    // values为当前变化列的数组内容
    values?: Array<any>
    columnIndex?: number
}

export interface IPickerEmits {
    /** 关闭选择器时触发 */
    (e: 'close'): void
    /** 点击取消按钮 */
    (e: 'cancel'): void
    /** 点击确定按钮，返回当前选择的值	 */
    (e: 'confirm', params: SelectValueVo): void
    /** 当选择值变化时触发 */
    (e: 'change', params: SelectValueVo): void
    /** 显示隐藏触发 */
    (e: 'update:show', show: boolean): void
    /** 选中值触发 */
    (e: 'update:modelValue', value: any): void
}

export interface IPickerExpose {
    /**
     * 设置某一列的值
     * @param columnIndex 列索引，从0开始
     * @param values 该列的选项数组
     */
    setColumnValues: (columnIndex: number, values: Array<string | PickerColumnVo>) => void
    /**
     * 手动触发确认选择
     */
    onConfirm: () => void
    /**
     * 关闭选择器弹窗
     */
    cancel: () => void
}
