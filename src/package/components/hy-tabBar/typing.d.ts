import type HyBadgeProps from '../hy-badge/typing'

export interface TabListVo {
    /**
     * @description 标题
     * */
    name: string
    /**
     * @description icon图标或者图片
     * */
    icon: string
    /**
     * @description 徽标值
     * */
    badge?: number
}

export interface HyTabBarProps {
    /**
     * @description tab当前值
     * */
    modelValue: number
    /**
     * @description 导航栏值
     * {
     *     name: 中文名,
     *     icon: uview-plus里面的矢量图标库
     * }
     * */
    list: TabListVo[]
    /**
     * @description 文字颜色
     * */
    color?: string
    /**
     * @description 底部导航栏底部背景颜色（颜色设置必须要和页面背景颜色一样，才有重合感觉）
     * 支持渐变色--linear-gradient(155deg, #192b6e, #a6307c)
     * */
    baseBgColor?: string
    /**
     * @description 底部导航栏背景颜色
     * 支持渐变色--linear-gradient(155deg, #192b6e, #a6307c)
     * */
    barBgColor?: string
    /**
     * @description 点击突出按钮的背景颜色
     * 支持渐变色--linear-gradient(0deg, #ffa576,#0951eb)
     * */
    activeColor?: string
    /**
     * @description 徽标属性集合
     * */
    badge?: Partial<HyBadgeProps>
}

export interface ITabBarEmits {
    (e: 'update:modelValue', index: number): void
    (e: 'change', index: number): void
}
