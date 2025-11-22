import type { Ref, ToRefs } from 'vue'

// 折叠面板组组件的Props接口
export interface HyFoldingPanelGroupProps {
    /**
     * 当前激活的面板索引，支持v-model
     */
    modelValue?: number
    /**
     * 是否手风琴模式，默认false
     */
    accordion?: boolean
    /**
     * 是否禁用整个折叠面板组
     */
    disabled?: boolean
    /**
     * 是否显示边框，默认true
     */
    border?: boolean
    /**
     * 面板大小 large, medium, small
     */
    size?: HyApp.SizeType
}

// 父组件提供给子组件的配置接口
export interface HyFoldingPanelGroupConfig extends ToRefs<HyFoldingPanelGroupProps> {
    /**
     * 当前激活的索引
     */
    activeIndex: Ref<number | string>
    /**
     * 更新激活索引的方法
     */
    updateActiveIndex: (index: number | string) => void
}

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
