import type { CSSProperties, PropType } from 'vue'

const checkboxItemProps = {
    /** checkbox的名称 */
    value: {
        type: String,
        default: ''
    },
    /** 是否默认选中 */
    checked: {
        type: Boolean,
        default: false
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** label提示文字 */
    label: {
        type: String,
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default checkboxItemProps
