import type { ExtractPropTypes } from 'vue'
import type pickerProps from './props'

export interface HyPickerProps extends ExtractPropTypes<typeof pickerProps> {}

export interface PickerColumnVo {
    /**
     * value必填,回填根据这个值判断
     * */
    value?: string | number
    /**
     * 显示文本
     * */
    label?: string
    /**
     * 任意数据
     * */
    [key: string]: any
}

export type PickerValue = PickerColumnVo | string

export type SelectValueVo = {
    value: PickerValue[]
    index?: number
    indexs?: number[]
    // values为当前变化列的数组内容
    values?: Array<any>
    columnIndex?: number
}

export interface IPickerEmits {
    /** 关闭选择器时触发 */
    close: []
    /** 点击取消按钮 */
    cancel: []
    /** 点击确定按钮，返回当前选择的值	 */
    confirm: [params: SelectValueVo]
    /** 当选择值变化时触发 */
    change: [params: SelectValueVo]
    /** 显示隐藏触发 */
    'update:show': [show: boolean]
    /** 选中值触发 */
    'update:modelValue': [value: any]
}

export interface IPickerExpose {
    /**
     * 设置某一列的值
     * @param columnIndex 列索引，从0开始
     * @param values 该列的选项数组
     */
    setColumnValues: (columnIndex: number, values: PickerValue[]) => void
    /**
     * 手动触发确认选择
     */
    onConfirm: () => void
    /**
     * 关闭选择器弹窗
     */
    cancel: () => void
}
