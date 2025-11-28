export interface ISliderEmits {
    /** 开始滑动触发 */
    (e: 'start'): void
    /** 触发事件（拖动过程中） */
    (e: 'changing', value: number | number[]): void
    /** 触发事件 */
    (e: 'change', value: number | number[]): void
    /** 数值改变触发 */
    (e: 'update:modelValue', value: number | number[]): void
}
