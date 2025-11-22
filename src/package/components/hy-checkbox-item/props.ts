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
    }
}

export default checkboxItemProps
