import type { CSSProperties } from 'vue'

export default interface HyQrcodeProps {
    /**
     * @description 实例ID字符串(如果有多个二维码组件必须设置不一样的cid)
     * */
    cid?: string
    /**
     * @description 二维码大小
     * */
    size?: string | number

    /**
     * @description 二维码内容
     * */
    text: string
    /**
     * @description 是否显示二维码
     * */
    show?: boolean
    /**
     * @description 二维码背景色
     * */
    background?: string
    /**
     * @description 二维码颜色
     * */
    foreground?: string
    /**
     * @description 定位角点颜色
     * */
    pdGround?: string
    /**
     * @description 容错级别
     * */
    lv?: number
    /**
     * @description 是否是自定义组件
     * */
    usingComponents?: boolean
    /**
     * @description 二维码中间图标
     * */
    icon?: string
    /**
     * @description 二维码中间图标大小
     * */
    iconSize?: string | number
    /**
     * @description 显示加载状态
     * */
    showLoading?: boolean
    /**
     * @description 加载中提示语
     * */
    loadingText?: string
    /**
     * @description 是否预览
     * */
    allowPreview?: boolean
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

export interface IQrcodeEmits {
    /** 二维码生成成功 */
    (e: 'result', res: any): void
    /** 打开图片事件 */
    (e: 'preview', res: string, event: Event): void
    /** 长按事件 */
    (e: 'longPress'): void
}
