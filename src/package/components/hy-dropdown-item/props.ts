import type { DropdownMenuItem } from '../hy-dropdown-item/typing'
import type { CSSProperties, PropType } from 'vue'

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
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default dropdownItemProps
