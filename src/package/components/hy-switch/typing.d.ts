export type SwitchValue = boolean | number | string

export interface ISwitchEmits {
    /** 改变值触发 */
    (e: 'change', value: SwitchValue): void
    /** 改变值触发 */
    (e: 'update:modelValue', value: SwitchValue): void
}
