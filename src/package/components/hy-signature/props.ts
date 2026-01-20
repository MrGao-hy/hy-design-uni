import type { CSSProperties, PropType } from 'vue'
import { useTranslate } from '../../libs'

const { t } = useTranslate('signature')

const signatureProps = {
    /** 签名笔颜色 */
    penColor: {
        type: String,
        default: '#000'
    },
    /** 签名笔宽度 */
    lineWidth: {
        type: Number,
        default: 3
    },
    /** 清空按钮的文本 */
    clearText: {
        type: String,
        default: () => t('clear')
    },
    /** 撤回按钮的文本 */
    revokeText: {
        type: String,
        default: () => t('revoke')
    },
    /** 恢复按钮的文本 */
    restoreText: {
        type: String,
        default: () => t('restore')
    },
    /** 确认按钮的文本 */
    confirmText: {
        type: String,
        default: () => t('confirm')
    },
    /** 目标文件的类型 */
    fileType: {
        type: String,
        default: 'png'
    },
    /** 签名笔颜色 */
    quality: {
        type: Number,
        default: 1
    },
    /** 目标文件的质量 */
    exportScale: {
        type: Number,
        default: 1
    },
    /** 是否禁用签名板 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 画布的高度 */
    height: {
        type: Number,
        default: 1
    },
    /** 画布的宽度 */
    width: {
        type: Number,
        default: 1
    },
    /** 边框圆角 */
    round: {
        type: String,
        default: '10rpx'
    },
    /** 画板的背景色 */
    backgroundColor: String,
    /** 是否禁用画布滚动 */
    disableScroll: {
        type: Boolean,
        default: true
    },
    /** 是否开启历史记录 */
    enableHistory: {
        type: Boolean,
        default: false
    },
    /** 撤回和恢复的步长 */
    step: {
        type: Number,
        default: 1
    },
    /** 撤回按钮的文本 */
    undoText: String,
    /** 恢复按钮的文本 */
    redoText: String,
    /** 是否启用压感模式 */
    pressure: {
        type: Boolean,
        default: false
    },
    /** 压感模式下笔画最小宽度 */
    minWidth: {
        type: Number,
        default: 2
    },
    /** 压感模式下笔画最大宽度 */
    maxWidth: {
        type: Number,
        default: 6
    },
    /** 最小速度阈值，影响压感模式下的笔画宽度变化 */
    minSpeed: {
        type: Number,
        default: 1.5
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default signatureProps
