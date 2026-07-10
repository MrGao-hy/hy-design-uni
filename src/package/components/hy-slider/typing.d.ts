export interface ISliderEmits {
    /** 开始滑动触发 */
    start: []
    /** 触发事件（拖动过程中） */
    changing: [value: number | number[]]
    /** 触发事件 */
    change: [value: number | number[]]
    /** 数值改变触发 */
    'update:modelValue': [value: number | number[]]
}
