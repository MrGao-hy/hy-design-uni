export interface StepListVo {
    /**
     * @description 标题
     * */
    title?: string
    /**
     * @description 描述
     * */
    desc?: string
    /**
     * @description 是否错误
     * */
    error?: boolean
}

export interface IStepsEmits {
    /** 值改成触发 */
    (e: 'change', index: number): void
    /** 值改成触发 */
    (e: 'update:current', index: number): void
}
