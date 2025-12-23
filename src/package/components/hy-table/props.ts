import type { PropType } from 'vue'
import type { ITableColumn } from './typing'

const tableProps = {
    /** 数据源 */
    data: {
        type: Array,
        default: () => []
    },
    /** 列配置 */
    columns: {
        type: Array as PropType<ITableColumn[]>,
        default: () => []
    },
    /** 表格高度，如 '500rpx' */
    height: {
        type: [String, Number],
        default: 400
    },
    /** 行高，如 '500rpx' */
    rowHeight: {
        type: [String, Number],
        default: 50
    },
    /** 是否斑马纹 */
    stripe: {
        type: Boolean,
        default: false
    },
    /** 是否带有横向边框 */
    border: {
        type: Boolean,
        default: true
    },
    /** 加载状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 行数据的唯一键名 */
    rowKey: {
        type: String,
        default: 'id'
    },
    /** 显示表头 */
    showHeader: {
        type: Boolean,
        default: true
    },
    /** 空状态的图片 */
    emptyUrl: {
        type: String,
        default: ''
    },
    /** 空状态的描述 */
    emptyDes: {
        type: String,
        default: ''
    }
}

export default tableProps
