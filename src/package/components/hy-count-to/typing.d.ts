export interface ICountToEmits {
    /** 结束执行函数 */
    end: []
}

/** HyCountTo 组件实例暴露的方法 */
export interface ICountToExpose {
    /**
     * 开始滚动数字
     */
    start: () => void
    /**
     * 停止滚动
     */
    stop: () => void
    /**
     * 重新开始或暂停滚动
     */
    reStart: () => void
    /**
     * 恢复滚动（暂停状态下）
     */
    resume: () => void
    /**
     * 重置到初始值
     */
    reset: () => void
}
