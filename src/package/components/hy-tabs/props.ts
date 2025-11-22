import type { TabsItemVo } from './typing'
import type { CSSProperties, PropType } from 'vue'
import type HyBadgeProps from '../hy-badge/typing'

const tabsProps = {
    /** 标签数组，元素为对象，如[{name: '推荐'}] */
    list: {
        type: Array as unknown as PropType<TabsItemVo[]>,
        default: []
    },
    /** 当前选中标签的索引 */
    current: {
        type: Number,
        default: 0
    },
    /** 从list元素对象中读取的键名 */
    keyName: {
        type: String,
        default: 'name'
    },
    /** 滑块移动一次所需的时间，单位秒 */
    duration: {
        type: Number,
        default: 300
    },
    /** 滑块颜色 */
    lineColor: String,
    /** 菜单选择中时的样式 */
    activeStyle: {
        type: Object as PropType<CSSProperties>,
        default: {}
    },
    /** 菜单非选中时的样式 */
    inactiveStyle: {
        type: Object as PropType<CSSProperties>,
        default: {}
    },
    /** 滑块长度 */
    lineWidth: {
        type: [String, Number],
        default: 20
    },
    /** 滑块高度 */
    lineHeight: {
        type: [String, Number],
        default: 3
    },
    /** 滑块背景显示大小，当滑块背景设置为图片时使用 */
    lineBgSize: {
        type: [String, Number],
        default: 'cover'
    },
    /** 菜单item的样式 */
    itemStyle: Object as PropType<CSSProperties>,
    /** 轮播图高度 */
    swiperHeight: {
        type: [String, Number],
        default: 'calc(100vh - 44px)'
    },
    /** 菜单是否可滚动 */
    scrollable: {
        type: Boolean,
        default: true
    },
    /**
     * @description 徽标props全局定义
     * */
    propsBadge: Object as PropType<HyBadgeProps>,
    /** 标签左侧图标样式自定义 */
    iconStyle: Object as PropType<CSSProperties>,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default tabsProps
