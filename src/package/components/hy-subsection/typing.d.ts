export interface SubSectionItemVo extends AnyObject {
    name: string
    value: string | number
}

export type SubSectionVo = string | number | SubSectionItemVo

export interface ISubsectionEmits {
    /** 改变触发 */
    (e: 'change', index: number): void
    /** 改变触发 */
    (e: 'update:modelValue', value: any): void
}
