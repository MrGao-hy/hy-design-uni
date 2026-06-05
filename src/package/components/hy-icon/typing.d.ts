import type { CSSProperties } from 'vue'

export interface HyIconProps {
    /** 图标名称 */
    name?: string
    /** 图标颜色 */
    color?: string
    /** 图标字体大小，单位px */
    size?: number | string
    /** 是否显示粗体 */
    bold?: boolean
    /** 点击图标的时候传递事件出去的index（用于区分点击了哪一个） */
    index?: string
    /** 自定义扩展前缀，方便用户扩展自己的图标库 */
    customPrefix?: string
    /** 图标右侧的label文字 */
    label?: string
    /**
     * label相对于图标的位置，只能right或bottom
     * @values right,bottom
     * */
    labelPos?: string
    /** label字体大小，单位px */
    labelSize?: string
    /** 图标右侧的label文字颜色 */
    labelColor?: string
    /** label与图标的距离，单位px */
    space?: number | string
    /** 图片的mode */
    imgMode?: string
    /** 显示图片小图标时的宽度 */
    width?: string | number
    /** 显示图片小图标时的高度 */
    height?: string | number
    /** 图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途 */
    top?: string | number
    /** 是否阻止事件传播 */
    stop?: boolean
    /** 是否旋转 */
    isRotate?: boolean
    /** 图标圆角 */
    round?: string | number
    /** 定义需要用到的外部样式 */
    customStyle?: CSSProperties
    /** 自定义外部类名 */
    customClass?: string
}

export interface IIconEmits {
    /** 点击图标触发 */
    (e: 'click', index: string, e: Event): void
}
