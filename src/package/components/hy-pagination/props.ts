import type { CSSProperties, PropType } from 'vue'
import { useTranslate } from '../../libs'

const { t } = useTranslate('pagination')

const paginationProps = {
    /** 当前页 */
    modelValue: {
        type: Number,
        default: 1
    },
    /** 总页数，如果有total，则优先使用total计算页数 */
    totalPage: {
        type: Number,
        default: 1
    },
    /** 是否展示分页为Icon图标 */
    showIcon: {
        type: Boolean,
        default: false
    },
    /** 是否展示总条数 */
    showMessage: {
        type: Boolean,
        default: false
    },
    /** 总条数 */
    total: {
        type: Number,
        default: 0
    },
    /** 每页条数 */
    pageSize: {
        type: Number,
        default: 10
    },
    /** 上一页文本 */
    prevText: {
        type: String,
        default: () => t('prev')
    },
    /** 下一页文本 */
    nextText: {
        type: String,
        default: () => t('next')
    },
    /** 总页数只有一页时是否隐藏 */
    hideIfOnePage: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    }
}

export default paginationProps
