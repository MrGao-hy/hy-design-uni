import type { IOffset, IPlacementVo } from './typing'
import type { CSSProperties, PropType } from 'vue'

const popoverProps = {
    /** 控制 popover 的显示状态 */
    modelValue: {
        type: Boolean,
        default: false
    },
    /** 显示的内容，也可以通过 slot#content 传入 */
    content: {
        type: [String, Array] as PropType<string | any[]>
    },
    /**
     * 指定 popover 的放置位置
     * @values top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
     * */
    placement: {
        type: String,
        default: 'bottom'
    },
    /** 控制 popover 的显示状态 */
    offset: {
        type: [Number, Array, Object] as PropType<IOffset>,
        default: 0
    },
    /** 是否显示关闭按钮 */
    showClose: {
        type: Boolean,
        default: false
    },
    /** 是否禁用 popover */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 当前显示的模式，决定内容的展现形式
     * @values normal,menu
     * */
    mode: {
        type: String,
        default: 'normal'
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default popoverProps
