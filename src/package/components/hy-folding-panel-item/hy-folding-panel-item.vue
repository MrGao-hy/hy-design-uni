<template>
    <view
        class="hy-folding-panel-item"
        :class="{
            'hy-folding-panel-item--disabled': groupConfig?.disabled?.value || disabled,
            'is-active': isExpanded,
            'hy-folding-panel-item--border': groupConfig?.border?.value
        }"
    >
        <!-- 面板头部 -->
        <view
            :class="[
                'hy-folding-panel-item__header',
                `hy-folding-panel-item--${groupConfig?.size?.value}`
            ]"
            @click="handleClick"
        >
            <slot v-if="$slots.header" name="header"></slot>
            <template v-else>
                <view class="hy-folding-panel-item__left">
                    <slot v-if="$slots.title" name="title"></slot>
                    <template v-else>
                        <!-- 图标 -->
                        <view v-if="icon" class="hy-folding-panel-item__icon">
                            <hy-icon v-if="icon" :src="icon" :color="iconColor" :size="iconSize" />
                        </view>
                        <!-- 标题 -->
                        <text class="hy-folding-panel-item__title">{{ title }}</text>
                    </template>
                </view>
                <view class="hy-folding-panel-item__right">
                    <!-- 右侧值 -->
                    <text v-if="value" class="hy-folding-panel-item__value">{{ value }}</text>
                    <!-- 箭头 -->
                    <view
                        class="hy-folding-panel-item__arrow"
                        :class="{ 'hy-folding-panel-item__arrow--up': isExpanded }"
                    >
                        <hy-icon :name="IconConfig.DOWN"></hy-icon>
                    </view>
                </view>
            </template>
        </view>

        <!-- 面板内容 -->
        <view
            class="hy-folding-panel-item__content"
            :style="[
                customStyle,
                {
                    height: isExpanded ? (contentHeight ? addUnit(contentHeight) : 'auto') : '0px',
                    overflow: 'hidden'
                }
            ]"
        >
            <slot v-if="$slots.default"></slot>
            <text v-else>{{ content || '' }}</text>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-folding-panel-item'
}
</script>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import type { IFoldingPanelConfig, IFoldingPanelItemEmits } from './typing'
import { addUnit, IconConfig } from '../../libs'
import foldingPanelItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 折叠面板项组件
 * 用于展示可展开/折叠的单个面板项
 * @displayName hy-folding-panel-item
 */

const props = defineProps(foldingPanelItemProps)

// 事件定义
const emit = defineEmits<IFoldingPanelItemEmits>()

// 尝试从父组件注入配置
const groupConfig = inject<IFoldingPanelConfig>('hy-folding-panel')

// 内部展开状态
const expanded = ref(props.defaultOpen)

// 计算当前是否展开
const isExpanded = computed(() => {
    if (groupConfig?.accordion?.value) {
        // 如果在group中，根据group的activeIndex判断
        return groupConfig.activeIndex.value === props.index
    }
    // 独立使用时，使用内部状态
    return expanded.value
})

// 处理点击事件
const handleClick = () => {
    if (props.disabled) return

    if (groupConfig?.accordion?.value) {
        // 在group中时，通知group更新激活索引
        groupConfig.updateActiveIndex(props.index)
        emit('child-click', props.index)
    } else {
        // 独立使用时，切换内部状态
        expanded.value = !expanded.value
    }

    // 触发事件
    emit('click', props.index)
    if (isExpanded.value) {
        emit('close', props.index)
    } else {
        emit('open', props.index)
    }
    emit('change', !isExpanded.value, props.index)
}

// 对外暴露的方法
defineExpose({
    /**
     * 打开面板
     */
    open: () => {
        if (props.disabled) return

        if (groupConfig) {
            groupConfig.activeIndex.value = props.index
        } else {
            expanded.value = true
        }
        emit('open', props.index)
        emit('change', true, props.index)
    },

    /**
     * 关闭面板
     */
    close: () => {
        if (groupConfig) {
            if (groupConfig?.accordion?.value) {
                groupConfig.activeIndex.value = -1
            }
        } else {
            expanded.value = false
        }
        emit('close', props.index)
        emit('change', false, props.index)
    },

    /**
     * 切换面板状态
     */
    toggle: () => {
        handleClick()
    },

    /**
     * 获取当前展开状态
     */
    getExpanded: () => {
        return isExpanded.value
    }
})

// 初始化时如果默认打开且在group中，通知group
onMounted(() => {
    if (props.defaultOpen && groupConfig && props.index !== -1) {
        groupConfig.updateActiveIndex(props.index)
    }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
