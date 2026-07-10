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
    select: [params: SelectEventParams]
    /** 点击取消按钮时触发 */
    cancel: []
    /** 点击遮罩或关闭按钮时触发 */
    close: []
    /** 打开面板时触发 */
    open: []
    /** 手动更新弹窗显示隐藏 */
    'update:modelValue': [visible: boolean]
}
