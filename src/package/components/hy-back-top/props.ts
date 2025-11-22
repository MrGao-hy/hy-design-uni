import type IProps from './typing'
import type { CSSProperties, PropType } from 'vue'
import type HyIconProps from '../hy-icon/typing'

const backTopProps = {
    /**
     * 返回顶部的形状
     * @values circle,square
     * */
    mode: {
        type: String,
        default: 'circle'
    },
    /** 自定义图标属性集合 */
    icon: {
        type: Object as PropType<HyIconProps>
    },
    /** 提示文字 */
    text: String,
    /** 返回顶部滚动时间 */
    duration: {
        type: Number,
        default: 500
    },
    /** 滚动距离 */
    scrollTop: {
        type: Number,
        default: 0
    },
    /** 距离顶部多少距离显示，单位px */
    top: {
        type: Number,
        default: 400
    },
    /** 返回顶部按钮到底部的距离，单位px */
    bottom: {
        type: Number,
        default: 100
    },
    /** 返回顶部按钮到右边的距离，单位px */
    right: {
        type: Number,
        default: 20
    },
    /** 层级 */
    zIndex: {
        type: Number,
        default: 888
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({
            transform: 'rotate(180deg)'
        })
    },
    /** 自定义外部类名 */
    customClass: String,
}

export default backTopProps
