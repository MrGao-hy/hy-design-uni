import type { IGap, MenusType } from './typing'
import { IconConfig } from '../../libs'
import type { CSSProperties, PropType } from 'vue'

const floatButtonProps = {
    /** 菜单栏集合 */
    menus: {
        type: Array as PropType<MenusType[]>,
        default: []
    },
    /**
     * 打开方向
     * @values row,column
     * */
    direction: {
        type: String,
        default: 'column'
    },
    /** 按钮显示的图标 */
    icon: {
        type: String,
        default: IconConfig.PLUS
    },
    /** 按钮图标大小 */
    iconSize: String,
    /** 按钮图标颜色 */
    iconColor: String,
    /** 到边框最小距离 */
    gap: {
        type: Object as PropType<IGap>,
        default: { left: 16, right: 16, top: 16, bottom: 40 }
    },
    /** 层级 */
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 按钮背景颜色 */
    bgColor: String,
    /** 按钮文字 */
    text: String,
    /** 按钮文字大小 */
    fontSize: {
        type: [Number, String],
        default: 12
    },
    /** 按钮文字的颜色 */
    textColor: String,
    /**
     * 按钮的尺寸
     * @values small,medium,large
     * */
    size: {
        type: [String, Number],
        default: 'medium'
    },
    /**
     * 按钮的形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'circle'
    },
    /** 按钮的透明度 */
    opacity: {
        type: Number,
        default: 1
    },
    /** 是否显示阴影 */
    shadow: {
        type: Boolean,
        default: true
    },
    /** 是否显示漂浮的动画 */
    float: {
        type: Boolean,
        default: true
    },
    /** 是否固定位置 */
    fixed: {
        type: Boolean,
        default: true
    },
    /** 是否能拖动 */
    draggable: {
        type: Boolean,
        default: true
    },
    /**
     * 悬浮按钮位置
     * @values left-top,left-bottom,right-top,right-bottom,left-center,right-center,top-center,bottom-center
     * */
    position: {
        type: String,
        default: 'right-bottom'
    },
    /** 禁用点击打开菜单栏 */
    expandable: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default floatButtonProps
