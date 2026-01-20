import type { CSSProperties, PropType } from 'vue'
import { useTranslate } from '@/package'

const { t } = useTranslate('readMore')

const readMoreProps = {
    /** 内容超出此高度才会显示展开全文按钮，单位px */
    showHeight: {
        type: Number,
        default: 200
    },
    /** 展开后是否显示收起按钮 */
    toggle: {
        type: Boolean,
        default: true
    },
    /** 关闭时的提示文字 */
    closeText: {
        type: String,
        default: () => t('expand')
    },
    /** 展开时的提示文字 */
    openText: {
        type: String,
        default: () => t('retract')
    },
    /** 提示文字的颜色 */
    color: String,
    /** 提示文字的大小，单位px */
    fontSize: {
        type: Number,
        default: 14
    },
    /** 段落首行缩进的字符个数 */
    textIndent: {
        type: String,
        default: '2em'
    },
    /** 用于在 open 和 close 事件中当作回调参数返回 */
    name: String,
    /** 显示阴影的样式 */
    shadowStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    }
}

export default readMoreProps
