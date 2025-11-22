import { IconConfig } from '../../libs/config'
import type { CSSProperties, PropType } from 'vue'

const navbarProps = {
    /** 是否开启顶部安全区适配 */
    safeAreaInsetTop: {
        type: Boolean,
        default: true
    },
    /** 固定在顶部时，是否生成一个等高元素，以防止塌陷 */
    placeholder: {
        type: Boolean,
        default: false
    },
    /** 导航栏是否固定在顶部 */
    fixed: {
        type: Boolean,
        default: true
    },
    /** 导航栏底部是否显示下边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** 左边返回图标的名称，只能组件自带的图标 */
    leftIcon: {
        type: String,
        default: IconConfig.LEFT
    },
    /** 左边的提示文字 */
    leftText: String,
    /** 右边的提示文字 */
    rightText: String,
    /** 右边返回图标的名称，只能组件自带的图标 */
    rightIcon: String,
    /** 导航栏标题，如设置为空字符，将会隐藏标题占位区域 */
    title: String,
    /** 导航栏副标题 */
    sub: String,
    /** 文字颜色 */
    titleColor: String,
    /** 导航栏背景设置 */
    bgColor: String,
    /** 导航栏标题的最大宽度，内容超出会以省略号隐藏 */
    titleWidth: {
        type: [String, Number],
        default: '400rpx'
    },
    /** 导航栏高度(不包括状态栏高度在内，内部自动加上) */
    height: {
        type: [String, Number],
        default: '44px'
    },
    /** 左侧返回图标的大小 */
    leftIconSize: {
        type: [String, Number],
        default: 20
    },
    /** 左侧返回图标的颜色 */
    leftIconColor: String,
    /** 点击左侧区域(返回图标)，是否自动返回上一页（默认 false ） */
    autoBack: {
        type: Boolean,
        default: false
    },
    /** 标题的样式，对象或字符串 */
    titleStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default navbarProps
