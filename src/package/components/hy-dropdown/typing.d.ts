import type { CSSProperties } from 'vue'

export default interface HyDropdownProps {
    /**
     * @description 标题和选项卡选中的颜色（默认#2979ff）
     * */
    activeColor?: string
    /**
     * @description 标题和选项卡未选中的颜色（默认#606266）
     * */
    inactiveColor?: string
    /**
     * @description 点击遮罩是否关闭菜单（默认true）
     * */
    closeOnClickMask?: boolean
    /**
     * @description 是否粘性定位（默认true）
     * */
    sticky?: boolean
    /**
     * @description 标题菜单的高度，单位任意（默认80）
     * */
    height?: number | string
    /**
     * @description 标题菜单是否显示下边框（默认false）
     * */
    borderBottom?: boolean
    /**
     * @description 标题的字体大小，单位任意，数值默认为rpx单位（默认28）
     * */
    titleSize?: number
    /**
     * @description 菜单展开内容下方的圆角值，单位任意（默认0）
     * */
    borderRadius?: number
    /**
     * @description 图标名称
     * */
    menuIcon?: string
    /**
     * @description 图标大小
     * */
    menuIconSize?: number
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}
