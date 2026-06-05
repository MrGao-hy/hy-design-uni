import type { HyIconProps } from '../hy-icon/typing'

export interface GridItemVo {
    /**
     * 图标名称或图片地址
     * */
    icon?: string
    /**
     * 名称
     * */
    name?: string
    /**
     * 图标属性api配置
     * */
    iconProps?: Partial<HyIconProps>
    /**
     * 自定义内容键值对
     * */
    [key: string]: any
}

export interface CustomKeysVo {
    /**
     * 自定义标题键名
     * */
    name: string
    /**
     * 自定义icon键名
     * */
    icon: string
}

export interface IGridEmits {
    /** 点击小菜单触发 */
    (e: 'click', name: string | GridItemVo): void
}
