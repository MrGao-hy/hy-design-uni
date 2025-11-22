import type { DropdownMenuItem } from '../hy-dropdown-item/typing'
import type { PropType } from 'vue'

const dropdownItemProps = {
    /** 获取值 */
    modelValue: [String, Number],
    /** 标题 */
    title: String,
    /** 下拉选择值 */
    menus: {
        type: Array as unknown as PropType<DropdownMenuItem[]>,
        default: []
    },
    /** 禁用组件点击 */
    disabled: {
        type: Boolean,
        default: false
    }
}

export default dropdownItemProps
