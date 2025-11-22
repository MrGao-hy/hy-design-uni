import type { SubmitBarIconMenus } from './typing'
import type { CSSProperties, PropType } from 'vue'

const submitBarProps = {
    /** 左边菜单栏 */
    menus: {
        type: Array as unknown as PropType<SubmitBarIconMenus[]>,
        default: []
    },
    /** 绝对定位 */
    fixed: {
        type: Boolean,
        default: true
    },
    /** 是否显示边框 */
    border: {
        type: Boolean,
        default: true
    },
    /** 加载左边按钮loading */
    leftLoading: {
        type: Boolean,
        default: false
    },
    /** 加载右边按钮loading */
    rightLoading: {
        type: Boolean,
        default: false
    },
    /** 左边icon的颜色 */
    iconColor: String,
    /** 左边文字的颜色 */
    iconLabelColor: {
        type: String,
        default: '#909193FF'
    },
    /** 右边按钮文字颜色 */
    textColor: String,
    /** 显示左边按钮 */
    showLeftBtn: {
        type: Boolean,
        default: true
    },
    /** 显示右边按钮 */
    showRightBtn: {
        type: Boolean,
        default: true
    },
    /** 左边按钮文字 */
    leftBtnText: {
        type: String,
        default: '加入购物车'
    },
    /** 右边按钮文字 */
    rightBtnText: {
        type: String,
        default: '立即购买'
    },
    /** 左边按钮颜色，支持渐变色 */
    leftBtnColor: {
        type: String,
        default: '#ed3f14'
    },
    /** 有边按钮颜色，支持渐变色 */
    rightBtnColor: {
        type: String,
        default: '#ff7900'
    },
    /**
     * 按钮的形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'circle'
    },
    /** 层级 */
    zIndex: {
        type: [Number, String],
        default: 999
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default submitBarProps
