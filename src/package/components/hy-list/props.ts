import type { PropType } from 'vue'

const listProps = {
    /** 数据列表 */
    list: {
        type: Array as PropType<(string | Record<string, any>)[]>,
        default: () => []
    },
    /** 容器高度，必须给个高度，否则加载全部数据 */
    containerHeight: {
        type: String,
        default: '100%'
    },
    /** 子容器的高度，必须和内容一致，否则计算有问题 */
    itemHeight: {
        type: [String, Number],
        default: '40px'
    },
    /** 子容器的底部，会计算到容器内 */
    marginBottom: {
        type: [String, Number],
        default: 10
    },
    /** 子容器的内边距 */
    padding: {
        type: [String, Number],
        default: 10
    },
    /** 子容器的圆角，单位px */
    borderRadius: {
        type: [String, Number],
        default: '3px'
    },
    /** 容器背景色 */
    background: {
        type: String,
        default: 'transparent'
    },
    /** 是否显示边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** 展示几列 */
    line: {
        type: Number,
        default: 1
    },
    /** 每一项的唯一标识key */
    keyField: {
        type: String,
        default: 'id'
    },
    /**
     * 加载状态
     * @values loadMore,loading,noMore
     * */
    load: {
        type: String,
        default: 'loadMore'
    },
    /** 显示底部加载状态 */
    showDivider: {
        type: Boolean,
        default: true
    }
}

export default listProps
