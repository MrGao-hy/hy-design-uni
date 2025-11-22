import { CSSProperties } from 'vue'

export default interface HyIconProps {
    /**
     * @description 图标名称，见示例图标集
     * */
    name: string | HyIconConfig
    /**
     * @description 图标颜色
     * */
    color?: string
    /**
     * @description 图标字体大小，单位px （默认 '16px' ）
     * */
    size?: string | number

    /**
     * @description 是否显示粗体 （默认 false ）
     * */
    bold?: boolean
    /**
     * @description 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
     * */
    index?: string | number
    /**
     * @description 自定义扩展前缀，方便用户扩展自己的图标库 （默认 'hy-icon' ）
     * */
    customPrefix?: string
    /**
     * @description 图标右侧的label文字
     * */
    label?: string
    /**
     * @description label相对于图标的位置，只能right或bottom （默认 'right' ）
     * */
    labelPos?: 'right' | 'bottom'
    /**
     * @description label字体大小，单位px （默认 '15px' ）
     * */
    labelSize?: string | number
    /**
     * @description 图标右侧的label文字颜色
     * */
    labelColor?: string
    /**
     * @description label与图标的距离，单位px （默认 '3px' ）
     * */
    space?: string | number
    /**
     * @description 图片的mode
     * */
    imgMode?: string
    /**
     * @description 显示图片小图标时的宽度
     * */
    width?: string | number
    /**
     * @description 显示图片小图标时的高度
     * */
    height?: string | number
    /**
     * @description 图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途  （默认 0 ）
     * */
    top?: number | string
    /**
     * @description 是否阻止事件传播 （默认 false ）
     * */
    stop?: boolean
    /**
     * @description 是否旋转 （默认 false ）
     * */
    isRotate?: boolean
    /**
     * @description 图标圆角
     * */
    round?: string | number
    /**
     * @description 自定义样式
     * */
    customStyle?: CSSProperties
    /**
     * @description 自定义类名
     * */
    customClass?: string
}

export interface IIconEmits {
    /** 点击图标触发 */
    (e: 'click', index: string, e: Event): void
}
