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

/** HyFoldingPanel 组件实例暴露的方法 */
export interface IFoldingPanelExpose {
    /**
     * 打开指定索引的面板
     * @param index 面板索引
     */
    open: (index: number | string) => void
    /**
     * 关闭所有面板
     */
    closeAll: () => void
    /**
     * 切换指定索引面板的状态
     * @param index 面板索引
     */
    toggle: (index: number | string) => void
    /**
     * 关闭指定索引的面板
     * @param index 面板索引
     */
    close: (index: number | string) => void
}
