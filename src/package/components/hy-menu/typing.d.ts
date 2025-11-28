export type ModelValueVo = string | number
export interface MenusType {
    /**
     *  唯一id
     * */
    id: string | number
    /**
     *  标题
     * */
    title: string
    /**
     *  是否禁用
     * */
    disabled?: boolean
    /**
     *  icon
     * */
    icon?: string
    /**
     *  徽标值
     * */
    badge?: number
    /**
     *  键值
     * */
    [key: string]: string | number
}

export interface IMenuEmits {
    /** 选中触发 */
    (e: 'change', temp: MenusType): void
    /** 选中触发 */
    (e: 'update:modelValue', id: MenusType['id']): void
}
