import type { CSSProperties, PropType } from 'vue'
import type { IIndexItem } from './typing'
import type { LeftRightType } from '../../libs'

const indexBarProps = {
    /**
     * 当前激活的索引
     */
    modelValue: {
        type: [String, Number] as PropType<string | number>,
        default: '',
        required: true
    },
    /**
     * 索引列表数据；未传时自动收集插槽内 hy-index-anchor 的索引值
     */
    indexList: {
        type: Array as PropType<IIndexItem[]>,
        default: () => []
    },
    /**
     * 锚点是否自动吸顶，吸顶时锚点固定于滚动容器顶部
     */
    sticky: {
        type: Boolean,
        default: true
    },
    /**
     * 索引栏位置
     * @values left, right
     */
    position: {
        type: String as PropType<LeftRightType>,
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
     * 索引项大小，单位px
     */
    indexSize: {
        type: [Number, String],
        default: 12
    },
    /**
     * 组件容器高度，单位px，默认撑满父级
     */
    height: {
        type: [Number, String],
        default: '100%'
    },
    /**
     * 索引项宽高，单位px
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
}

export default indexBarProps
