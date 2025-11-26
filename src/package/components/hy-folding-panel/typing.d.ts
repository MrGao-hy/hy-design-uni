// 折叠面板组组件的事件接口
export interface IFoldingPanelGroupEmits {
    /**
     * v-model 同步事件
     */
    (e: 'update:modelValue', value: number | string): void
    /**
     * 面板状态改变时触发
     */
    (e: 'change', index: number | string): void
    /**
     * 面板打开时触发
     */
    (e: 'open', index: number | string): void
    /**
     * 面板关闭时触发
     */
    (e: 'close', index: number | string): void
}
