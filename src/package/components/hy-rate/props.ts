import { IconConfig } from '../../libs/config'
import type { CSSProperties, PropType } from 'vue'

const rateProps = {
    /** v-model绑定的值 */
    modelValue: {
        type: Number,
        default: 1
    },
    /** 星星的默认最多数 */
    count: {
        type: Number,
        default: 5
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 是否只读 */
    readonly: {
        type: Boolean,
        default: false
    },
    /** 星星的大小 */
    size: {
        type: Number,
        default: 18
    },
    /** 未激活星星的颜色 */
    inactiveColor: {
        type: String,
        default: '#b2b2b2'
    },
    /** 激活星星的颜色 */
    activeColor: {
        type: String,
        default: '#FFF00D'
    },
    /** 星星之间的间距 */
    gutter: {
        type: Number,
        default: 4
    },
    /** 最小星星数量 */
    minCount: {
        type: Number,
        default: 1
    },
    /** 是否允许半星 */
    allowHalf: {
        type: Boolean,
        default: false
    },
    /** 激活状态的图标 */
    activeIcon: {
        type: String,
        default: IconConfig.STAR_FILL
    },
    /** 未激活状态的图标 */
    inactiveIcon: {
        type: String,
        default: IconConfig.STAR
    },
    /** 是否可触摸 */
    touchable: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}
export default rateProps
