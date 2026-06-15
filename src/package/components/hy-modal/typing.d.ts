export interface HyModalProps {
    /** 是否显示模态框 */
    modelValue: boolean
    /** 标题内容 */
    title?: string
    /** 模态框内容 */
    content?: string
    /** 确认按钮的文字 */
    confirmText?: string
    /** 取消按钮的文字 */
    cancelText?: string
    /** 是否显示确认按钮 */
    showConfirmButton?: boolean
    /** 是否显示取消按钮 */
    showCancelButton?: boolean
    /** 确认按钮的颜色 */
    confirmColor?: string
    /** 取消按钮的颜色 */
    cancelColor?: string
    /** 对调确认和取消的位置 */
    buttonReverse?: boolean
    /** 是否开启缩放模式 */
    zoom?: boolean
    /** 弹窗的圆角 */
    round?: string | number
    /** 点击确认按钮自动关闭 */
    autoClose?: boolean
    /** 加载按钮 */
    loading?: boolean
    /** 是否允许点击遮罩关闭Modal */
    closeOnClickOverlay?: boolean
    /** 往上偏移的值 */
    negativeTop?: number
    /** modal宽度 */
    width?: string | number
    /** 确认按钮的样式 */
    confirmButtonShape?: 'circle' | 'square'
    /** 文案对齐方式 */
    contentTextAlign?: 'left' | 'center' | 'right'
}

export interface IModalEmits {
    /** 点击确认按钮时触发 */
    (e: 'confirm'): void
    /** 点击取消按钮时触发 */
    (e: 'cancel'): void
    /** 点击遮罩关闭时触发 */
    (e: 'close'): void
    /** 更新值触发 */
    (e: 'update:modelValue', show: boolean): void
    (e: 'update:loading', show: boolean): void
}
