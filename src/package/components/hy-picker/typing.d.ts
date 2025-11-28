export interface PickerColumnVo extends AnyObject {
    /**
     * @description id必填
     * */
    id: string
    /**
     * @description 显示文本
     * */
    text?: string
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
