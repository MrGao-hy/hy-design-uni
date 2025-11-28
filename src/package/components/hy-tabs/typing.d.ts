import BadgeProps from '../hy-badge/typing'
export interface TabsItemVo extends AnyObject {
    /**
     * @description tab名称
     * */
    name: string
    /**
     * @description 徽标接收的props
     * */
    badge?: BadgeProps
    /**
     * @description 是否禁用
     * */
    disabled?: boolean
    /**
     * @description swiper内容值
     * */
    content?: any
}

export interface TabsParamsVo extends TabsParamsVo {
    index: number
}
export interface ITabsEmits {
    /** 点击标签时触发 */
    (e: 'click', params: TabsParamsVo): void
    /** 标签索引改变时触发 */
    (e: 'change', item: TabsItemVo, index: number): void
    /** 长按标签时触发 */
    (e: 'longPress', params: TabsParamsVo): void
    /** 标签索引改变时触发 */
    (e: 'update:current', index: number): void
}
