import type { CSSProperties } from 'vue'
export interface IActionSheetAction {
    /**
     * 选项名称
     */
    name: string
    /**
     * 描述信息
     */
    sub?: string
    /**
     * 颜色
     */
    color?: string
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 加载中状态
     */
    loading?: boolean
}
export interface IActionSheetPanel {
    /**
     * 图片地址
     */
    iconUrl: string
    /**
     * 标题内容
     */
    name: string
}
export interface HyActionSheetProps {
    /**
     * 操作菜单是否展示 ( 默认 false )
     * */
    modelValue?: boolean
    /**
     * 菜单选项
     * */
    actions?: IActionSheetAction[]
    /**
     * 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示
     * */
    panels?: Array<IActionSheetPanel | IActionSheetPanel[]>
    /**
     * 圆角值 (默认 20 )
     * */
    round?: string | number
    /**
     * 标题
     * */
    title?: string
    /**
     * 标题文字位置
     * */
    titleAlign?: HyApp.RowCenterType
    /**
     * 取消按钮的提示文字,不为空时显示按钮
     * */
    cancelText?: string
    /**
     * 点击某个菜单项时是否关闭弹窗 （默认 true ）
     * */
    closeOnClickAction?: boolean
    /**
     * 点击遮罩是否允许关闭  (默认 true )
     * */
    closeOnClickOverlay?: boolean
    /**
     * 弹框动画持续时间 ( 默认 200 )
     * */
    duration?: number
    /**
     * 菜单层级 ( 默认 100 )
     * */
    zIndex?: number
    /**
     * 处理底部安全区 （默认 true ）
     * */
    safeAreaInsetBottom?: boolean
    /**
     * 自定义外部样式
     * */
    customStyle?: CSSProperties
    /**
     * 自定义外部类名
     * */
    customClass?: string
    /**
     * 自定义标题类名
     * */
    customHeaderClass?: string
}

interface SelectEventParams {
    /**
     * 选中的内容
     * */
    item: any
    /**
     * 选中的横向索引
     * */
    rowIndex?: number
    /**
     * 选中的竖列索引
     * */
    colIndex?: number
    /**
     * 选中的索引
     * */
    index?: number
}
export interface IActionSheetEmits {
    /** 选中了某个动作时触发 */
    (e: 'select', params: SelectEventParams): void
    /** 点击取消按钮时触发 */
    (e: 'cancel'): void
    /** 点击遮罩或关闭按钮时触发 */
    (e: 'close'): void
    /** 打开面板时触发 */
    (e: 'open'): void
    /** 手动更新弹窗显示隐藏 */
    (e: 'update:modelValue', visible: boolean): void
}
