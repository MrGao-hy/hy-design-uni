<template>
    <view v-if="currentStatus" :class="rootClass" :style="[rootStyle, customStyle]">
        <view :class="`hy-step-item__header ${dot ? 'is-dot' : ''}`">
            <view
                :class="`hy-step-item__indicator ${dot ? 'is-dot' : !!icon || slots.icon ? 'is-icon' : 'is-text'}`"
            >
                <view v-if="dot" class="hy-step-item__dot"></view>
                <slot v-else-if="slots.icon || icon" name="icon">
                    <hy-icon v-if="icon" custom-class="hy-step-item__icon" :name="icon"></hy-icon>
                </slot>
                <view v-else class="hy-step-item__circle">
                    <hy-icon
                        v-if="statusIcon"
                        :custom-class="`hy-step-item__${currentStatus}-icon`"
                        :name="statusIcon"
                        size="var(--hy-step-item-indicator-size, 18px)"
                    ></hy-icon>
                    <text v-else class="hy-step-item__circle-text">{{ index + 1 }}</text>
                </view>
            </view>
            <view v-if="index < childrenLength - 1" class="hy-step-item__line"></view>
        </view>
        <view
            class="hy-step-item__content"
            v-if="slots.title || currentTitle || slots.description || description"
        >
            <slot name="title" v-if="slots.title || currentTitle">
                <text class="hy-step-item__title">{{ currentTitle }}</text>
            </slot>
            <slot name="description" v-if="slots.description || description">
                <text class="hy-step-item__description">{{ description }}</text>
            </slot>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-step-item',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import { IconConfig, useParent, useTranslate } from '../../libs'
import type { IStepGroupContext } from '../hy-step-group/typing'
import { STEP_GROUP_KEY } from '../hy-step-group/steps'
import type { StepStatus } from './typing'
import stepItemProps from './props'

const props = defineProps(stepItemProps)

const slots = useSlots()

const { parent: steps, index } = useParent<IStepGroupContext>(STEP_GROUP_KEY)

const { t } = useTranslate('stepItem')

/** 当前步骤的状态 */
const currentStatus = computed<StepStatus | ''>(() => {
    return getCurrentStatus(index.value)
})

/** 当前步骤的标题（未传 title 时按状态取默认文案） */
const currentTitle = computed<string>(() => {
    return getCurrentTitle(currentStatus.value)
})

/** 根节点样式：垂直方向控制高度，水平方向按步骤数平分宽度 */
const rootStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (steps.value) {
        const { direction, space } = steps.value.props
        if (direction === 'column') {
            if (space && space !== '') {
                style.height = space
            }
        } else {
            // 用 flex 平分而非百分比宽度，兼容 flex 与小程序 grid 容器（如嵌套在 hy-steps 中）
            if (space && space !== '') {
                style.width = space
                style.flex = 'none'
            } else {
                style.flex = 1
            }
        }
    }
    return style
})

/** 根节点类名 */
const rootClass = computed<string>(() => {
    return [
        'hy-step-item',
        `hy-step-item--${currentStatus.value}`,
        canAlignCenter.value ? 'is-center' : '',
        vertical.value ? 'is-vertical' : '',
        props.customClass
    ]
        .filter(Boolean)
        .join(' ')
})

/** 是否居中对齐（仅横向步骤条有效） */
const canAlignCenter = computed<boolean>(() => {
    if (steps.value) {
        const { direction, alignCenter } = steps.value.props
        return Boolean(direction !== 'column' && alignCenter)
    } else {
        return false
    }
})

/** 是否垂直布局 */
const vertical = computed<boolean>(() => {
    if (steps.value) {
        return steps.value.props.direction === 'column'
    } else {
        return false
    }
})

/** 是否使用点状指示器 */
const dot = computed<boolean>(() => {
    if (steps.value) {
        return Boolean(steps.value.props.dot)
    } else {
        return false
    }
})

/** 步骤总数量 */
const childrenLength = computed<number>(() => {
    if (steps.value) {
        return Number(steps.value.children.length)
    } else {
        return 0
    }
})

/** 内置状态指示图标映射（已完成 → 实心对号圆，失败 → 实心叉号圆） */
const statusIconMap: Record<string, string> = {
    finished: IconConfig.CHECK_CIRCLE_FILL,
    error: IconConfig.CLOSE_CIRCLE_FILL
}

/** 内置状态图标名，仅在已完成/失败状态下存在 */
const statusIcon = computed<string>(() => statusIconMap[currentStatus.value])

/**
 * 获取当前步骤状态（status 优先，其次根据 current 计算）
 * @param index 当前步骤索引
 */
function getCurrentStatus(index: number): StepStatus | '' {
    if (props.status) {
        return props.status
    }

    if (steps.value) {
        const { current } = steps.value.props
        if (Number(current) > index) {
            return 'finished'
        } else if (Number(current) === index) {
            return 'process'
        } else {
            return 'wait'
        }
    } else {
        return 'wait' // 未嵌套在 hy-step-group 中时直接渲染未开始状态
    }
}

/**
 * 获取当前步骤标题
 * @param currentStatus 当前状态
 */
function getCurrentTitle(currentStatus: string): string {
    if (props.title) return props.title

    switch (currentStatus) {
        case 'finished':
            return t('finished')
        case 'error':
            return t('failed')
        case 'process':
            return t('process')
        case 'wait':
        default:
            return t('wait')
    }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
