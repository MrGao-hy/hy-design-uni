import type { NoticeBarModeVo } from './typing'
import { IconConfig } from '../../libs'
import type { CSSProperties, PropType } from 'vue'

const noticeBarProps = {
    /** 显示的内容，数组 */
    text: {
        type: [String, Array] as PropType<string | string[]>,
        default: []
    },
    /**
     * 通告滚动模式，row-横向滚动，column-竖向滚动
     * @values row,column
     * */
    direction: {
        type: String,
        default: 'row'
    },
    /** direction = row时，是否使用步进形式滚动  */
    step: {
        type: Boolean,
        default: false
    },
    /** 是否显示左侧的音量图标 */
    icon: {
        type: String,
        default: IconConfig.NOTIFICATION_FILL
    },
    /**
     * 通告模式，link-显示右箭头，closable-显示右侧关闭图标
     * @values link,closable
     * */
    mode: String,
    /** 文字颜色，各图标也会使用文字颜色 */
    color: {
        type: String,
        default: '#ff9900'
    },
    /** 背景颜色 */
    bgColor: String,
    /** 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度 */
    speed: {
        type: Number,
        default: 80
    },
    /** 字体大小，单位px */
    fontSize: {
        type: [String, Number],
        default: 14
    },
    /** 滚动一个周期的时间长，单位ms */
    duration: {
        type: Number,
        default: 2000
    },
    /** 是否禁止用手滑动切换 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序 */
    disableTouch: {
        type: Boolean,
        default: true
    },
    /**
     * 分布
     * @values flex-start,flex-start,center
     * */
    justifyContent: {
        type: String,
        default: 'flex-start'
    },
    /**
     * 跳转类型
     * @values navigateTo,redirectTo,switchTab,reLaunch
     * */
    linkType: {
        type: String,
        default: 'navigateTo'
    },
    /** 跳转地址 */
    url: String,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default noticeBarProps
