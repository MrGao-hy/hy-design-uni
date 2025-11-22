import type { CSSProperties } from 'vue'

export type NoticeBarModeVo = 'closable' | 'link' | ''

export default interface HyNoticeBarProps {
    /**
     * @description 显示的内容，数组
     * */
    text: string[] | string
    /**
     * @description 通告滚动模式，row-横向滚动，column-竖向滚动 ( 默认 'row' )
     * */
    direction?: HyApp.DirectionType
    /**
     * @description direction = row时，是否使用步进形式滚动  ( 默认 false )
     * */
    step?: boolean
    /**
     * @description 是否显示左侧的音量图标 ( 默认 'volume' )
     * */
    icon?: string | HyIconConfig
    /**
     * @description 通告模式，link-显示右箭头，closable-显示右侧关闭图标
     * */
    mode?: NoticeBarModeVo
    /**
     * @description 文字颜色，各图标也会使用文字颜色 ( 默认 '#f9ae3d' )
     * */
    color?: string
    /**
     * @description 背景颜色 ( 默认 '#fdf6ec' )
     * */
    bgColor?: string
    /**
     * @description 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度 ( 默认 80 )
     * */
    speed?: number
    /**
     * @description 字体大小 ( 默认 14 )
     * */
    fontSize?: number | string
    /**
     * @description 滚动一个周期的时间长，单位ms ( 默认 2000 )
     * */
    duration?: number
    /**
     * @description 是否禁止用手滑动切换 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序（默认34） ( 默认 true )
     * */
    disableTouch?: boolean
    /**
     * @description 分布
     * */
    justifyContent?: HyApp.JustifyContentType
    /**
     * @description 跳转类型
     * */
    linkType?: HyApp.NavigationType
    /**
     * @description 跳转地址
     * */
    url?: string
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

export interface INoticeBarEmits {
    (e: 'click', index: number): void
    (e: 'close'): void
}
