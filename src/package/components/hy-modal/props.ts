import { useTranslate } from '../../libs'

const { t } = useTranslate('modal')

const modalProps = {
    /** 是否显示模态框 */
    modelValue: {
        type: Boolean,
        default: false
    },
    /** 标题内容 */
    title: String,
    /** 模态框内容，如传入slot内容，则此参数无效 */
    content: String,
    /** 确认按钮的文字 */
    confirmText: {
        type: String,
        default: () => t('confirm')
    },
    /** 取消按钮的文字 */
    cancelText: {
        type: String,
        default: () => t('cancel')
    },
    /** 是否显示确认按钮 */
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    /** 是否显示取消按钮 */
    showCancelButton: {
        type: Boolean,
        default: false
    },
    /** 确认按钮的颜色 */
    confirmColor: String,
    /** 取消按钮的颜色 */
    cancelColor: String,
    /** 对调确认和取消的位置 */
    buttonReverse: {
        type: Boolean,
        default: false
    },
    /** 是否开启缩放模式 */
    zoom: {
        type: Boolean,
        default: true
    },
    /** 弹窗的圆角 */
    round: {
        type: [String, Number],
        default: 16
    },
    /** 点击确认按钮自动关闭 */
    autoClose: {
        type: Boolean,
        default: true
    },
    /** 加载按钮 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 是否允许点击遮罩关闭Modal */
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    /** 往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 */
    negativeTop: {
        type: Number,
        default: 0
    },
    /** modal宽度，不支持百分比，可以数值，px，rpx单位 */
    width: {
        type: [String, Number],
        default: '550rpx'
    },
    /**
     * 确认按钮的样式,如设置，将不会显示取消按钮
     * @values circle,square
     * */
    confirmButtonShape: String,
    /**
     * 文案对齐方式
     * @values left,center,right
     * */
    contentTextAlign: {
        type: String,
        default: 'left'
    }
} as const

export default modalProps
