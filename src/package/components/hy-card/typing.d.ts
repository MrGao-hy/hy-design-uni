import type { CSSProperties } from 'vue'

export default interface HyCardProps {
    /**
     * @description 卡片与屏幕两侧是否留空隙（默认false）
     * */
    full?: boolean

    /**
     * @description 头部左边的标题
     * */
    title?: string
    /**
     * @description 标题颜色（默认#303133）
     * */
    titleColor?: string
    /**
     * @description 标题字体大小，单位rpx（默认15px）
     * */
    titleSize?: string | number
    /**
     * @description 头部右边的副标题
     * */
    subTitle?: string
    /**
     * @description 副标题颜色（默认#909399）
     * */
    subTitleColor?: string
    /**
     * @description 副标题字体大小（默认13px）
     * */
    subTitleSize?: string | number
    /**
     * @description 是否显示边框（默认true）
     * */
    border?: boolean
    /**
     * @description 用于标识点击了第几个卡片
     * */
    index?: string | number
    /**
     * @description 卡片与屏幕两边和上下元素的间距，需带单位，如"30px 20px"（默认15px）
     * */
    margin?: string
    /**
     * @description 卡片整体的圆角值，单位px（默认8px）
     * */
    borderRadius?: string | number
    /**
     * @description 头部自定义样式，对象形式
     * */
    headStyle?: CSSProperties
    /**
     * @description 中部自定义样式，对象形式
     * */
    bodyStyle?: CSSProperties
    /**
     * @description 底部自定义样式，对象形式
     * */
    footStyle?: CSSProperties
    /**
     * @description 是否显示头部的下边框（默认true）
     * */
    headBorderBottom?: boolean
    /**
     * @description 是否显示底部的上边框（默认true）
     * */
    footBorderTop?: boolean
    /**
     * @description 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径
     * */
    thumb?: string
    /**
     * @description 缩略图的宽度，高等于宽，单位px（默认30px）
     * */
    thumbWidth?: string | number
    /**
     * @description 缩略图是否为圆形（默认false）
     * */
    thumbCircle?: boolean
    /**
     * @description // 给head，body，foot的内边距
     * */
    padding?: string | number
    /**
     * @description 头部内边距
     * */
    paddingHead?: string | number
    /**
     * @description 中部内边距
     * */
    paddingBody?: string | number
    /**
     * @description 尾部内边距
     * */
    paddingFoot?: string | number
    /**
     * @description 是否显示头部（默认true）
     * */
    showHead?: boolean
    /**
     * @description 是否显示尾部（默认true）
     * */
    showFoot?: boolean
    /**
     * @description 卡片外围阴影，字符串形式（默认true）
     * */
    boxShadow?: string | boolean
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

type IndexVo = string | number | undefined
export interface ICardEmits {
    /** 整个卡片任意位置被点击时触发 */
    (e: 'click', index: IndexVo): void
    /** 卡片头部被点击时触发 */
    (e: 'head-click', index: IndexVo): void
    /** 卡片主体部分被点击时触发 */
    (e: 'body-click', index: IndexVo): void
    /** 卡片底部部分被点击时触发 */
    (e: 'foot-click', index: IndexVo): void
}
