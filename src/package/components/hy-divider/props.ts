import { IconConfig } from '../../libs/config'
import type { CSSProperties, PropType } from 'vue'
import { useTranslate } from '../../libs'

const { t } = useTranslate('loadMore')

const dividerProps = {
    /** 是否虚线 */
    dashed: {
        type: Boolean,
        default: false
    },
    /** 是否细线 */
    hairline: {
        type: Boolean,
        default: true
    },
    /** 是否以点替代文字，优先于text字段起作用 */
    dot: {
        type: Boolean,
        default: false
    },
    /**
     * 内容文本的位置
     * @values left,center,right
     * */
    textPosition: {
        type: String,
        default: 'center'
    },
    /** 文本内容，如果为loadMore就是加载前，如果为loading就是加载中，如果为noMore就是没有更多 */
    text: {
        type: String,
        default: ''
    },
    /** 文本大小 */
    textSize: {
        type: [String, Number],
        default: 14
    },
    /** 文本颜色 */
    textColor: String,
    /** 线条颜色 */
    lineColor: String,
    /** 加载图标 */
    loadingIcon: {
        type: String,
        default: IconConfig.LOADING
    },
    /** 加载前的提示语 */
    loadMoreText: {
        type: String,
        default: () => t('loadMore')
    },
    /** 加载中提示语 */
    loadingText: {
        type: String,
        default: () => t('loading')
    },
    /** 没有更多的提示语 */
    noMoreText: {
        type: String,
        default: () => t('finished')
    },
    /** 上边距 */
    marginTop: {
        type: [String, Number],
        default: 0
    },
    /** 下边距 */
    marginBottom: {
        type: [String, Number],
        default: 0
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default dividerProps
