import type { CSSProperties, PropType } from 'vue'
import type { HyIconProps } from '../hy-icon/typing'
import type { CustomKeysVo, GridItemVo } from './typing'

const gridProps = {
    /** 数据列表 */
    list: {
        type: Array as PropType<(GridItemVo | string)[]>,
        default: () => []
    },
    /** 自定义键值 */
    customKeys: {
        type: Object as PropType<CustomKeysVo>,
        default: () => ({
            name: 'name',
            icon: 'icon'
        })
    },
    /** 宫格的列数 */
    col: {
        type: Number,
        default: 5
    },
    /** 是否显示宫格的边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** 单个宫格高度 */
    itemHeight: {
        type: [Number, String],
        default: '80px'
    },
    /**
     * 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
     * @values left,center,right
     * */
    align: {
        type: String,
        default: 'left'
    },
    /** 间隔 */
    gap: {
        type: [Number, String],
        default: 0
    },
    /** 宫格的背景颜色 */
    bgColor: {
        type: String,
        default: 'transparent'
    },
    /** 图标属性api配置集合 */
    iconConfig: Object as PropType<HyIconProps>,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default gridProps
