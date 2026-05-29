import type { CascaderOption, CascaderValue, CascaderLazyLoad } from './typing'
import type { PropType } from 'vue'
import type { HyInputProps } from '../hy-input/typing'
import { useTranslate } from '../../libs'

const { t } = useTranslate('cascader')

const cascaderProps = {
    /** 当前选中的值 */
    modelValue: {
        type: Object as PropType<CascaderValue>,
        default: () => ({ value: [], label: [] })
    },
    /** 是否显示级联选择器弹窗 */
    show: {
        type: Boolean,
        default: false
    },
    /** 级联选择器数据源 */
    options: {
        type: Array as PropType<CascaderOption[]>,
        default: () => []
    },
    /** 是否显示顶部工具栏 */
    showToolbar: {
        type: Boolean,
        default: true
    },
    /** 顶部标题 */
    title: String,
    /** 输入框占位提示文字 */
    placeholder: {
        type: String,
        default: () => t('placeholder')
    },
    /** 点击遮罩层是否关闭 */
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    /** 弹出层的 z-index 值 */
    zIndex: {
        type: Number,
        default: 10076
    },
    /** 是否显示输入框 */
    hasInput: {
        type: Boolean,
        default: false
    },
    /** 输入框配置 */
    input: {
        type: Object as PropType<HyInputProps>,
        default: () => {}
    },
    /** 多选时的分隔符 */
    separator: {
        type: String,
        default: ' / '
    },
    /** 选项值对应的 key */
    valueKey: {
        type: String,
        default: 'value'
    },
    /** 选项标签对应的 key */
    labelKey: {
        type: String,
        default: 'label'
    },
    /** 选项子级对应的 key */
    childrenKey: {
        type: String,
        default: 'children'
    },
    /** 异步加载子节点的回调函数，提供后将启用异步加载模式 */
    lazyLoad: {
        type: Function as PropType<CascaderLazyLoad>,
        default: undefined
    },
    /** 选项对象中，标识叶子节点的 key */
    isLeafKey: {
        type: String,
        default: 'isLeaf'
    }
}

export default cascaderProps
