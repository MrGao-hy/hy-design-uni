import type { HyIconProps } from '../hy-icon/typing'

export interface GridItemVo {
    /**
     * @description 图标名称或图片地址
     * */
    icon?: string
    /**
     * @description 名称
     * */
    name?: string
    /**
     * @description 图标属性api配置
     * */
    iconConfig?: Partial<HyIconProps>
    /**
     * @description 自定义内容键值对
     * */
    [key: string]: any
}
export interface CustomKeysVo {
    /**
     * @description 自定义标题键名
     * */
    name: string
    /**
     * @description 自定义icon键名
     * */
    icon: string
}

export interface IGridEmits {
    /** 点击小菜单触发 */
    (e: 'click', name: string | Record<string, any>): void
}
