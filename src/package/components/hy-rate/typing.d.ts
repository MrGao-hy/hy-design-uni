export interface IRateEmits {
    /** 选中的星星发生变化时触发 */
    change: [index: number]
    /** 更新值触发 */
    'update:modelValue': [index: number]
}
