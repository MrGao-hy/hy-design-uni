export interface SubSectionItemVo extends AnyObject {
    name: string
    value: string | number
}

export type SubSectionVo = string | number | SubSectionItemVo

export interface ISubsectionEmits {
    /** 改变触发 */
    change: [index: number]
    /** 改变触发 */
    'update:modelValue': [value: any]
}
