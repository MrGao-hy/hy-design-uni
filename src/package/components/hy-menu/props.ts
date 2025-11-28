import type { MenusType, ModelValueVo } from './typing'
import type { CSSProperties, PropType } from 'vue'
import type { HyIconProps } from '../hy-icon/typing'
import type { HyBadgeProps } from '../hy-badge/typing'

const menuProps = {
    /** 当前值 */
    modelValue: [String, Number] as PropType<ModelValueVo>,
    /** 菜单数据集 */
    list: {
        type: Array as PropType<Array<MenusType>>,
        default: []
    },
    /** 对应的键 */
    id: {
        type: String,
        default: 'id'
    },
    name: {
        type: String,
        default: 'id'
    },
    /** 侧边菜单栏宽度 */
    width: {
        type: [String, Number],
        default: 120
    },
    /** 选中颜色 */
    color: String,
    /** 图标属性值 */
    icon: {
        type: Object as PropType<HyIconProps>,
        default: {}
    },
    /** 徽标属性值 */
    badge: {
        type: Object as PropType<HyBadgeProps>,
        default: {}
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>
}

export default menuProps
