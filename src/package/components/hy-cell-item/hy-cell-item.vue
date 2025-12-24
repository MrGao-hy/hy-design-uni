<template>
    <view
        :class="cellClass"
        :hover-class="hoverClass"
        :style="customStyle"
        :hover-stay-time="250"
        @tap="clickHandler"
    >
        <view class="hy-cell-item__left">
            <view v-if="icon || $slots.icon" class="hy-cell-item__left--icon">
                <!-- @slot 图标插槽 -->
                <slot v-if="$slots.icon" name="icon" :icon="item?.icon"></slot>
                <hy-icon
                    v-else
                    :size="iconSize"
                    :name="icon?.name"
                    :color="!!(disabled || cellConfig?.disabled.value) ? '#FFFFFF3F' : icon?.color"
                    :bold="icon?.bold"
                    :customPrefix="icon?.customPrefix"
                    :imgMode="icon?.imgMode"
                    :width="icon?.width"
                    :height="icon?.height"
                    :top="icon?.top"
                    :stop="icon?.stop"
                    :round="icon?.round"
                    :customStyle="icon?.customStyle"
                    :customClass="icon?.customClass"
                ></hy-icon>
            </view>
            <view class="hy-cell-item__left--title">
                <!-- @slot 列表标题插槽 -->
                <slot v-if="$slots.title" name="title" :title="title"></slot>
                <text v-else class="hy-cell-item__left--title__text">
                    {{ title }}
                </text>
                <!-- @slot 列表小标题插槽 -->
                <slot v-if="$slots.sub" name="sub" :sub="sub"></slot>
                <text v-else-if="sub" class="hy-cell-item__left--title__sub">
                    {{ sub }}
                </text>
            </view>
        </view>
        <view
            class="hy-cell-item__center"
            :style="{
                justifyContent:
                    cellConfig?.arrange.value === 'left'
                        ? 'flex-start'
                        : cellConfig?.arrange.value === 'right'
                          ? 'flex-end'
                          : 'center'
            }"
        >
            <!-- @slot 值内容插槽 -->
            <slot v-if="$slots.value" name="value" :record="item"></slot>
            <text v-else-if="value" class="hy-cell-item__center--value">
                {{ value }}
            </text>
        </view>
        <view
            :class="[
                'hy-cell-item__right',
                `hy-cell-item__right--${cellConfig?.arrowDirection.value}`
            ]"
            v-if="cellConfig?.isRightIcon.value"
        >
            <!-- @slot 右边按钮插槽 -->
            <slot v-if="$slots['right-icon']" name="right-icon" :icon="rightIcon"></slot>
            <hy-icon
                v-else
                :name="rightIcon?.name || IconConfig.RIGHT"
                :color="!!(disabled || cellConfig?.disabled.value) ? '#FFFFFF3F' : rightIcon?.color"
                :bold="rightIcon?.bold"
                :customPrefix="rightIcon?.customPrefix"
                :imgMode="rightIcon?.imgMode"
                :width="rightIcon?.width"
                :height="rightIcon?.height"
                :stop="rightIcon?.stop"
                :round="rightIcon?.round"
                :customStyle="rightIcon?.customStyle"
                :customClass="rightIcon?.customClass"
            ></hy-icon>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-cell-item',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import cellItemProps from './props'
import type { ICellContext } from './typing'
import { IconConfig } from '../../libs'
import type { ICellEmits } from '../hy-cell/typing'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

const props = defineProps(cellItemProps)
const emit = defineEmits<ICellEmits>()
const cellConfig = inject<ICellContext>('hy-cell')

// 单元格类名
const cellClass = computed(() => {
    return [
        'hy-cell-item',
        `hy-cell-item--${cellConfig?.size.value}`,
        cellConfig?.border.value && 'hy-border__bottom',
        (props.disabled || cellConfig?.disabled.value) && 'hy-cell-item__disabled',
        props.customClass
    ]
})

// 计算什么时候出现点击状态
const hoverClass = computed(() => {
    if (!(props.disabled || cellConfig?.disabled.value) && cellConfig?.clickable.value) {
        return 'hy-cell-item__clickable'
    } else {
        return ''
    }
})

// 图标大小
const iconSize = computed(() => {
    switch (cellConfig?.size.value) {
        case 'large':
            return 25
        case 'medium':
            return 20
        case 'small':
            return 15
    }
})

/**
 * 点击cell
 * */
const clickHandler = (e: Event) => {
    if (cellConfig?.disabled.value || props.disabled) return
    if (props.stop) e.stopPropagation()

    emit('click', props.name)
    cellConfig?.onClick(props.name)
    if (props.url) {
        uni.navigateTo({
            url: props.url
        })
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
