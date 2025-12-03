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
        default: 'auto'
    },
    /** 是否斑马纹 */
    stripe: {
        type: Boolean,
        default: false
    },
    /** 是否带有纵向边框 */
    border: {
        type: Boolean,
        default: true
    },
    /** 加载状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 空数据提示 */
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    /** 行数据的唯一键名 */
    rowKey: {
        type: String,
        default: 'id'
    }
}

export default tableProps
