import type { CSSProperties, PropType } from 'vue'
import type { HyInputProps } from '../hy-input/typing'
import { useTranslate } from '../../libs'

const { t } = useTranslate('addressPicker')

const addressPickerProps = {
    /** 用于控制选择器的弹出和收起 */
    show: {
        type: Boolean,
        default: false
    },
    /**
     * 弹出层弹出方向
     * @values top,bottom
     * */
    popupMode: {
        type: String,
        default: 'bottom'
    },
    /** 是否显示顶部的操作栏 */
    showToolbar: {
        type: Boolean,
        default: true
    },
    /** 绑定值 */
    modelValue: {
        type: String,
        default: '',
        required: true
    },
    /** 顶部标题 */
    title: String,
    /** 字符串截取数组条件 */
    separator: {
        type: String,
        default: ' '
    },
    /** 是否显示加载中状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 各列中，单个选项的高度 */
    itemHeight: {
        type: Number,
        default: 44
    },
    /** 取消按钮的文字 */
    cancelText: {
        type: String,
        default: () => t('cancel')
    },
    /** 确认按钮的文字 */
    confirmText: {
        type: String,
        default: () => t('confirm')
    },
    /** 取消按钮的颜色 */
    cancelColor: {
        type: String,
        default: '#909193'
    },
    /** 确认按钮的颜色 */
    confirmColor: {
        type: String,
        default: '#3c9cff'
    },
    /** 每列中可见选项的数量 */
    visibleItemCount: {
        type: Number,
        default: 5
    },
    /** 是否允许点击遮罩关闭选择器 */
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    /** 各列的默认索引 */
    defaultIndex: {
        type: Array as PropType<Array<any>>
    },
    /** 是否显示输入框 */
    hasInput: {
        type: Boolean,
        default: false
    },
    /** 输入框集合属性 */
    input: {
        type: Object as PropType<HyInputProps>
    },
    /** 右边插槽 */
    toolbarRightSlot: {
        type: Boolean,
        default: false
    },
    /** 自定义输入框外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    }
}

export default addressPickerProps
