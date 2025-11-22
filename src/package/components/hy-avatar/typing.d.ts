import type { CSSProperties } from 'vue'

export default interface HyAvatarProps {
    /**
     * @description 头像路径，如加载失败，将会显示默认头像(不能为相对路径)
     * */
    src?: string

    /**
     * @description 头像形状  （ circle (默认) | square）
     * */
    shape?: HyApp.ShapeType
    /**
     * @description 头像尺寸，可以为指定字符串(large, default, mini)，或者数值 （默认 40 ）
     * */
    size?: number | HyApp.SizeType
    /**
     * @description 头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值 （默认 'scaleToFill' ）
     * */
    mode?: string
    /**
     * @description 用文字替代图片，级别优先于src
     * */
    text?: string
    /**
     * @description 背景颜色，一般显示文字时用 （默认 '#c0c4cc' ）
     * */
    bgColor?: string
    /**
     * @description 文字颜色 （默认 '#ffffff' ）
     * */
    color?: string
    /**
     * @description 文字大小  （默认 18 ）
     * */
    fontSize?: number | string
    /**
     * @description 显示的图标
     * */
    icon?: string
    /**
     * @description 显示小程序头像，只对百度，微信，QQ小程序有效  （默认 false ）
     * */
    mpAvatar?: boolean
    /**
     * @description 是否使用随机背景色  （默认 false ）
     * */
    randomBgColor?: boolean
    /**
     * @description 加载失败的默认头像(组件有内置默认图片)
     * */
    defaultUrl?: string
    /**
     * @description 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
     * */
    colorIndex?: number
    /**
     * @description 组件标识符  （默认 'level' ）
     * */
    name?: string
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

export interface IAvatarEmit {
    /** 点击头像触发 */
    (e: 'click', name: string, e: Event): void
}
