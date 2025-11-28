export interface IRateEmits {
    /** 选中的星星发生变化时触发 */
    (e: 'change', index: number): void
    /** 更新值触发 */
    (e: 'update:modelValue', index: number): void
}
