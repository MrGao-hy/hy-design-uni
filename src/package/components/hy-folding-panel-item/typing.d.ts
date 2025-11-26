import foldingPanelProps from '../hy-folding-panel/props'
import type { ExtractPropTypes, ToRefs } from 'vue'

export interface IFoldingPanelConfig extends ToRefs<ExtractPropTypes<typeof foldingPanelProps>> {
    /**
     * 当前激活的索引
     */
    activeIndex: Ref<number | string>
    /**
     * 更新激活索引的方法
     */
    updateActiveIndex: (index: number | string) => void
}

// 折叠面板项组件的事件接口
export interface IFoldingPanelItemEmits {
    /**
     * 点击面板时触发
     */
    (e: 'click', index: number | string): void
    /**
     * 面板打开时触发
     */
    (e: 'open', index: number | string): void
    /**
     * 面板关闭时触发
     */
    (e: 'close', index: number | string): void
    /**
     * 面板状态改变时触发
     */
    (e: 'change', expanded: boolean, index: number | string): void
    /**
     * 子项点击时通知父组件
     */
    (e: 'child-click', index: number | string): void
}
