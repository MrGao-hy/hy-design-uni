import type { CSSProperties, PropType } from 'vue'
import type { SwitchValue } from './typing'
import type { HyIconProps } from '../hy-icon/typing'

const switchProps = {
    /** 通过v-model双向绑定的值 */
    modelValue: {
        type: [String, Number, Boolean] as PropType<SwitchValue>,
        default: false
    },
    /** 是否处于加载中 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 开关尺寸，单位px */
    size: {
        type: [String, Number],
        default: 'medium'
    },
    /** 打开时的背景色 */
    activeColor: String,
    /** 关闭时的背景色 */
    inactiveColor: String,
    /** 打开选择器时通过change事件发出的值 */
    activeValue: {
        type: [String, Number, Boolean] as PropType<SwitchValue>,
        default: true
    },
    /** 关闭选择器时通过change事件发出的值 */
    inactiveValue: {
        type: [String, Number, Boolean] as PropType<SwitchValue>,
        default: false
    },
    /** 打开选择器时图标 */
    activeIcon: String,
    /** 关闭选择器时图标 */
    inactiveIcon: String,
    /** 图标 */
    icon: Object as PropType<HyIconProps>,
    /** 是否开启异步变更，开启后需要手动控制输入值 */
    asyncChange: {
        type: Boolean,
        default: false
    },
    /** 圆点与外边框的距离 */
    space: {
        type: Number,
        default: 0
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}
export default switchProps
