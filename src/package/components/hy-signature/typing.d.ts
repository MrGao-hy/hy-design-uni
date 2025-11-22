import type { CSSProperties } from 'vue'

export default interface HySignatureProps {
    /**
     * @description 签名笔颜色
     * */
    penColor?: string
    /**
     * @description 签名笔宽度（默认 2 ）
     * */
    lineWidth?: number
    /**
     * @description 清空按钮的文本
     * */
    clearText?: string
    /**
     * @description 撤回按钮的文本
     * */
    revokeText?: string
    /**
     * @description 恢复按钮的文本
     * */
    restoreText?: string
    /**
     * @description 确认按钮的文本
     * */
    confirmText?: string
    /**
     * @description 目标文件的类型（默认 png ）
     * */
    fileType?: string
    /**
     * @description 签名笔颜色
     * */
    quality?: number
    /**
     * @description 目标文件的质量（默认 1 ）
     * */
    exportScale?: number
    /**
     * @description 是否禁用签名板（默认 false ）
     * */
    disabled?: boolean
    /**
     * @description 画布的高度
     * */
    height?: number
    /**
     * @description 画布的宽度
     * */
    width?: number
    /**
     * @description 边框圆角
     * */
    round?: string | number
    /**
     * @description 画板的背景色
     * */
    backgroundColor?: string
    /**
     * @description 是否禁用画布滚动（默认 true ）
     * */
    disableScroll?: boolean
    /**
     * @description 是否开启历史记录（默认 false ）
     * */
    enableHistory?: boolean
    /**
     * @description 撤回和恢复的步长（默认 1 ）
     * */
    step?: number
    /**
     * @description 撤回按钮的文本（默认 撤销 ）
     * */
    undoText?: string
    /**
     * @description 恢复按钮的文本（默认 恢复 ）
     * */
    redoText?: string
    /**
     * @description 是否启用压感模式（默认 false ）
     * */
    pressure?: boolean
    /**
     * @description 压感模式下笔画最小宽度（默认 2 ）
     * */
    minWidth?: number
    /**
     * @description 压感模式下笔画最大宽度（默认 6 ）
     * */
    maxWidth?: number
    /**
     * @description 最小速度阈值，影响压感模式下的笔画宽度变化（默认 1.5 ）
     * */
    minSpeed?: number
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

/**
 * 签名结果类型
 * @property tempFilePath - 生成图片的临时路径
 * @property success - 是否成功生成图片
 * @property width - 生成图片的宽度
 * @property height - 生成图片的高度
 */
export type SignatureResult = {
    tempFilePath: string
    success: boolean
    width: number
    height: number
}

/**
 * 签名线条类型
 * @property points - 线条所包含的所有点的数组
 * @property color - 线条颜色
 * @property width - 线条宽度
 * @property backgroundColor - 线条背景色 (可选)
 * @property isPressure - 是否为笔锋模式的线条 (可选)
 */
export interface Line {
    points: Point[]
    color: string
    width: number
    backgroundColor?: string
    isPressure?: boolean
}

/**
 * 签名点位类型
 * @property x - 点的横坐标
 * @property y - 点的纵坐标
 * @property t - 点的时间戳
 * @property speed - 当前点的绘制速度 (可选)
 * @property distance - 与上一个点的距离 (可选)
 * @property lineWidth - 当前点的线宽 (可选，用于笔锋模式)
 * @property lastX1 - 贝塞尔曲线第一个控制点的x坐标 (可选)
 * @property lastY1 - 贝塞尔曲线第一个控制点的y坐标 (可选)
 * @property lastX2 - 贝塞尔曲线第二个控制点的x坐标 (可选)
 * @property lastY2 - 贝塞尔曲线第二个控制点的y坐标 (可选)
 * @property isFirstPoint - 是否为线条的第一个点 (可选)
 */
export interface Point {
    x: number
    y: number
    t: number
    speed?: number
    distance?: number
    lineWidth?: number
    lastX1?: number
    lastY1?: number
    lastX2?: number
    lastY2?: number
    isFirstPoint?: boolean
}

/**
 * 签名组件暴露的方法类型
 * @property init - 初始化签名板
 * @property clear - 清除签名
 * @property confirm - 确认签名并生成图片
 * @property restore - 恢复上一步操作
 * @property revoke - 撤销上一步操作
 */
export type SignatureExpose = {
    /** 初始化签名板
     * @param forceUpdate - 是否强制更新
     */
    init: (forceUpdate?: boolean) => void
    /** 点击清除按钮清除签名 */
    clear: () => void
    /** 点击确定按钮 */
    confirm: () => void
    /* 点击恢复 */
    restore: () => void
    /* 点击撤回 */
    revoke: () => void
}

export interface ISignatureEmits {
    /** 开始签名时触发 */
    (e: 'start', event: TouchEvent): void
    /** 结束签名时触发 */
    (e: 'end', event: TouchEvent): void
    /** 签名过程中触发 */
    (e: 'signing', event: TouchEvent): void
    /** 确认签名时触发 */
    (e: 'confirm', result: SignatureResult): void
    /** 清空签名时触发 */
    (e: 'clear'): void
}
