import type { CSSProperties, PropType } from 'vue'
import type { IIndexItem } from './typing'

const indexBarProps = {
    /**
     * 当前激活的索引
     */
    modelValue: {
        type: String,
        default: '',
        required: true
    },
    /**
     * 索引列表数据
     */
    indexList: {
        type: Array as PropType<IIndexItem[]>,
        default: () => []
    },
    /**
     * 索引栏位置
     * @values left, right
     */
    position: {
        type: String,
        default: 'right'
    },
    /**
     * 是否显示索引字母提示
     */
    showToast: {
        type: Boolean,
        default: true
    },
    /**
     * 索引项颜色
     */
    indexColor: {
        type: String,
        default: ''
    },
    /**
     * 激活索引项颜色
     */
    activeIndexColor: {
        type: String,
        default: ''
    },
    /**
     * 索引项背景色
     */
    indexBgColor: {
        type: String,
        default: 'transparent'
    },
    /**
     * 激活索引项背景色
     */
    activeIndexBgColor: {
        type: String,
        default: ''
    },
    /**
     * 索引项大小
     */
    indexSize: {
        type: [Number, String],
        default: 12
    },
    /**
     * 索引栏高度
     */
    height: {
        type: [Number, String],
        default: '100%'
    },
    /**
     * 索引栏宽度
     */
    width: {
        type: [Number, String],
        default: 20
    },
    /**
     * 自定义样式
     */
    customStyle: Object as PropType<CSSProperties>,
    /**
     * 自定义外部类名
     */
    customClass: String
} as const

export default indexBarProps
