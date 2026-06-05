import type BadgeProps from '../hy-badge/props'

export interface SubmitBarIconMenus {
    /**
     * icon图标
     * */
    icon: string
    /**
     * 文本
     * */
    text: string
    /**
     * 徽标值
     * */
    badge?: BadgeProps['badge']
    [key: string]: any
}

export interface ISubmitBarEmits {
    /** 点击按钮触发 */
    (e: 'click', index: number): void
    /** 点击左侧小菜单图标触发 */
    (e: 'menuClick', temp: SubmitBarIconMenus, index: number): void
}
