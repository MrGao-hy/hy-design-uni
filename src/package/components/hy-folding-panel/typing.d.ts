import foldingPanelProps from './props'
import type { ExtractPropTypes } from 'vue'

/** 折叠面板索引 */
export type FoldingPanelValue = number | string

/** 折叠面板组的绑定值：手风琴为单个索引，普通模式为索引数组 */
export type FoldingPanelModelValue = FoldingPanelValue | FoldingPanelValue[]

// 折叠面板组组件的事件接口
export interface IFoldingPanelGroupEmits {
    /**
     * v-model 同步事件
     */
    'update:modelValue': [value: FoldingPanelModelValue]
    /**
     * 面板状态改变时触发
     */
    change: [value: FoldingPanelModelValue]
    /**
     * 面板打开时触发
     */
    open: [index: number | string]
    /**
     * 面板关闭时触发
     */
    close: [index: number | string]
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

/** 提供给折叠面板子项的上下文 */
export interface IFoldingPanelContext {
    /**
     * 折叠面板组的响应式属性
     */
    props: ExtractPropTypes<typeof foldingPanelProps>

    /**
     * 切换指定面板
     */
    toggle: (index: FoldingPanelValue, expanded: boolean) => void
    /**
     * 判断指定面板是否展开
     */
    isExpanded: (index: FoldingPanelValue) => boolean
}
