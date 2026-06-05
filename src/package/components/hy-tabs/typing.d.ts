import type { HyBadgeProps } from '../../index'
export interface TabsItemVo {
    /**
     * tab名称
     * */
    name: string
    /**
     * 徽标接收的props
     * */
    badge?: HyBadgeProps
    /**
     * 是否禁用
     * */
    disabled?: boolean
    /**
     * swiper内容值
     * */
    content?: any
    [key: string]: any
}

export interface ITabsExpose {
    /**
     * 计算滑块距离左边距离
     * */
    resize: () => void
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
