export interface MenuParamsVo {
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
    change: [temp: MenuParamsVo, index: number]
    /** 选中触发 */
    'update:modelValue': [id: MenuParamsVo['id']]
}
