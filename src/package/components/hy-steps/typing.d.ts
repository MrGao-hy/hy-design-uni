export interface StepListVo {
    /**
     * 标题
     * */
    title?: string
    /**
     * 描述
     * */
    docs?: string
    /**
     * 时间日期
     * */
    date?: string
    /**
     * 是否错误
     * */
    error?: boolean
}

export interface IStepsEmits {
    /** 值改成触发 */
    (e: 'change', index: number): void
    /** 值改成触发 */
    (e: 'update:current', index: number): void
}
