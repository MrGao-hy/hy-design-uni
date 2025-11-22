import type { IActionSheetAction, IActionSheetPanel } from './typing'
import type { CSSProperties, PropType } from 'vue'

const actionSheetProps = {
    /** 操作菜单是否展示 */
    modelValue: {
        type: Boolean,
        default: false,
        required: true
    },
    /** 菜单选项列表 */
    actions: {
        type: Array as PropType<IActionSheetAction[]>,
        default: () => []
    },
    /** 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 */
    panels: {
        type: Array as PropType<Array<IActionSheetPanel | IActionSheetPanel[]>>,
        default: () => []
    },
    /** 操作菜单是否展示 */
    round: {
        type: [String, Number],
        default: 20
    },
    /** 标题 */
    title: String,
    /**
     * 标题文字位置
     * @values left,center,right
     * */
    titleAlign: {
        type: String,
        default: 'center'
    },
    /** 取消按钮的提示文字,不为空时显示按钮 */
    cancelText: String,
    /** 点击某个菜单项时是否关闭弹窗 */
    closeOnClickAction: {
        type: Boolean,
        default: true
    },
    /** 点击遮罩是否允许关闭 */
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
    /** 弹框动画持续时间 */
    duration: {
        type: Number,
        default: 200
    },
    /** 菜单层级 */
    zIndex: {
        type: Number,
        default: 100
    },
    /** 处理底部安全区 */
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    /** 自定义外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String,
    /** 自定义标题类名 */
    customHeaderClass: String
}

export default actionSheetProps
