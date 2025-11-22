import { IconConfig } from '../../libs'
import type { CSSProperties, PropType } from 'vue'

const dropdownProps = {
    /** 标题菜单的高度，单位px */
    height: {
        type: [String, Number],
        default: 40
    },
    /** 标题菜单是否显示下边框 */
    borderBottom: {
        type: Boolean,
        default: false
    },
    /** 是否固定定位 */
    sticky: {
        type: Boolean,
        default: true
    },
    /** 标题和选项卡选中的颜色 */
    activeColor: String,
    /** 标题和选项卡未选中的颜色 */
    inactiveColor: String,
    /** 图标名称 */
    menuIcon: {
        type: String,
        default: IconConfig.ARROW_DOWN_FILL
    },
    /** 图标大小 */
    menuIconSize: {
        type: [String, Number],
        default: 14
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    }
}

export default dropdownProps
