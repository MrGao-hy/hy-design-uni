import type { CSSProperties, PropType } from 'vue'
import { IconConfig, useTranslate } from '../../libs'
import type { HyIconProps } from '../hy-icon/typing'

const { t } = useTranslate('search')

const searchProps = {
    /** 输入框初始值 */
    modelValue: {
        type: String,
        default: ''
    },
    /**
     * 搜索框形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'circle'
    },
    /** 搜索框背景颜色 */
    bgColor: String,
    /** 占位文字内容 */
    placeholder: {
        type: String,
        default: () => t('placeholder')
    },
    /**
     * 设置右下角按钮的文字，兼容性详见uni-app文档
     * @valuse send,search,next,go,done
     * */
    confirmType: {
        type: String,
        default: 'search'
    },
    /** 是否启用清除控件 */
    clearable: {
        type: Boolean,
        default: true
    },
    /** 是否自动获得焦点 */
    autoFocus: {
        type: Boolean,
        default: false
    },
    /** 键盘收起时，是否自动失去焦点 */
    autoBlur: {
        type: Boolean,
        default: true
    },
    /** 键盘弹起时，是否自动上推页面 */
    adjustPosition: {
        type: Boolean,
        default: true
    },
    /** 是否显示右侧控件 */
    showAction: {
        type: Boolean,
        default: true
    },
    /** 右侧控件文字 */
    actionText: {
        type: String,
        default: () => t('search')
    },
    /** 右侧控件的样式，对象形式 */
    actionStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 输入框内容水平对齐方式 */
    inputAlign: {
        type: String,
        default: 'left'
    },
    /** 自定义输入框样式，对象形式 */
    inputStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 是否启用输入框 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 边框颜色，配置了颜色，才会有边框 */
    borderColor: {
        type: String,
        default: 'transparent'
    },
    /** 输入框字体颜色 */
    color: String,
    /** placeholder的颜色 */
    placeholderColor: {
        type: String,
        default: ''
    },
    /** 输入框左边的图标属性集合，可以为图标名称或图片路径 */
    searchIcon: {
        type: [Boolean, Object] as PropType<HyIconProps | boolean>,
        default: { name: IconConfig.SEARCH }
    },
    /** 组件与其他上下左右之间的距离，带单位的字符串形式，如"30px" */
    margin: {
        type: [String, Number],
        default: 0
    },
    /** 是否开启动画，见上方说明 */
    animation: {
        type: Boolean,
        default: false
    },
    /** 输入框最大能输入的长度，-1为不限制长度 */
    maxlength: {
        type: Number,
        default: -1
    },
    /** 输入框高度，单位px */
    height: {
        type: Number,
        default: 30
    },
    /** 搜索框左边显示内容 */
    label: String,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default searchProps
