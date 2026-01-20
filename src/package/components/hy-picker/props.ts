import type { PickerColumnVo } from './typing'
import type { PropType } from 'vue'
import type { HyInputProps } from '../hy-input/typing'
import { useTranslate } from '../../libs'

const { t } = useTranslate('picker')

const pickerProps = {
    /** 显示到输入框值 */
    modelValue: {
        type: [String, Array],
        default: ''
    },
    /** 是否显示弹窗 */
    show: {
        type: Boolean,
        default: false
    },
    /** 弹窗弹出模式 */
    popupMode: {
        type: String,
        default: 'bottom'
    },
    /** 分割数组条件 */
    separator: {
        type: String,
        default: '/'
    },
    /** 是否显示顶部的操作栏 */
    showToolbar: {
        type: Boolean,
        default: true
    },
    /** 顶部标题 */
    title: String,
    /** 二维数组，设置每一列的数据 */
    columns: {
        type: Array as unknown as PropType<
            (string | PickerColumnVo)[][] | (string | PickerColumnVo)[]
        >,
        default: []
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
    confirmColor: String,
    /** 每列中可见选项的数量 */
    visibleItemCount: {
        type: Number,
        default: 5
    },
    /** 显示到选项对象中，需要展示的属性键名 */
    labelKey: {
        type: String,
        default: 'label'
    },
    /** 显示到选项对象中，需要展示的属性键名 */
    valueKey: {
        type: String,
        default: 'value'
    },
    /** 是否允许点击遮罩关闭选择器 */
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    /** 各列的默认索引 */
    defaultIndex: {
        type: Array as PropType<number[]>,
        default: []
    },
    /** 是否在手指松开时立即触发change事件 */
    immediateChange: {
        type: Boolean,
        default: true
    },
    /** 最高层级 */
    zIndex: {
        type: Number,
        default: 10076
    },
    /** 是否显示输入框 */
    hasInput: {
        type: Boolean,
        default: false
    },
    /** 输入框集合属性 */
    input: {
        type: Object as PropType<HyInputProps>,
        default: () => {}
    },
    /** 是否自定义选择器nav左边内容 */
    toolbarRightSlot: {
        type: Boolean,
        default: false
    }
}

export default pickerProps
