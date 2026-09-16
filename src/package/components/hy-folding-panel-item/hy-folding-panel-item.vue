<template>
    <view
        class="hy-folding-panel-item"
        :class="{
            'hy-folding-panel-item--disabled': groupConfig?.props.disabled || disabled,
            'is-active': isSelected,
            'hy-folding-panel-item--border': groupConfig?.props.border
        }"
    >
        <!-- 面板头部 -->
        <view
            :class="[
                'hy-folding-panel-item__header',
                `hy-folding-panel-item--${groupConfig?.props.size}`
            ]"
            @click="handleClick"
        >
            <slot v-if="$slots.header" name="header"></slot>
            <template v-else>
                <view class="hy-folding-panel-item__left">
                    <slot v-if="$slots.title" name="title"></slot>
                    <template v-else>
                        <view v-if="icon" class="hy-folding-panel-item__icon">
                            <hy-icon :src="icon" :color="iconColor" :size="iconSize" />
                        </view>
                        <text class="hy-folding-panel-item__title">{{ title }}</text>
                    </template>
                </view>
                <view class="hy-folding-panel-item__right">
                    <text v-if="value" class="hy-folding-panel-item__value">{{ value }}</text>
                    <view
                        class="hy-folding-panel-item__arrow"
                        :class="{ 'hy-folding-panel-item__arrow--up': isSelected }"
                    >
                        <hy-icon :name="IconConfig.DOWN"></hy-icon>
                    </view>
                </view>
            </template>
        </view>

        <!-- 面板内容：body 保持自然高度，wrapper 只负责高度过渡 -->
        <view
            :id="wrapperId"
            :class="[
                'hy-folding-panel-item__content-wrapper',
                {
                    'is-expanded': expanded,
                    'is-transitioned': transitionInited,
                    'is-limited-scroll': allowInnerScroll
                }
            ]"
            :style="wrapperStyle"
            @transitionend="handleTransitionEnd"
        >
            <view :id="contentId" class="hy-folding-panel-item__content" :style="customStyle">
                <slot v-if="$slots.default"></slot>
                <text v-else>{{ content || '' }}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-folding-panel-item'
}
</script>

<script setup lang="ts">
import {
    computed,
    getCurrentInstance,
    inject,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    nextTick
} from 'vue'
import type { IFoldingPanelContext } from '../hy-folding-panel/typing'
import type { IFoldingPanelItemEmits, IFoldingPanelItemExpose } from './typing'
import { getRect, getPx, guid, IconConfig, sleep } from '../../libs'
import foldingPanelItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 折叠面板项组件
 *
 * 状态由父组件的 modelValue 派生；本组件只维护动画高度，
 * 避免父子双方各持有一份展开状态。
 *
 * @displayName hy-folding-panel-item
 */

const props = defineProps(foldingPanelItemProps)

// 事件定义
const emit = defineEmits<IFoldingPanelItemEmits>()

// 父组件上下文与当前实例
const groupConfig = inject<IFoldingPanelContext | undefined>('hy-folding-panel')
const instance = getCurrentInstance()

// 小程序内同组件会被多次渲染，使用唯一 id 查询内容节点
const contentId = guid(16)
const wrapperId = guid(16)

/** 父组件 modelValue 派生的选中态 */
const isSelected = computed(() => groupConfig?.isExpanded(props.index) ?? false)

/** 统一读取自身与面板组的禁用状态 */
const disabled = computed(() => props.disabled || groupConfig?.props.disabled)

/** 动画态：选中态变化后，先锁定目标高度，再驱动 wrapper 过渡 */
const expanded = ref(false)
const contentHeight = ref(0)
const autoHeight = ref(false)
const transitionInited = ref(false)
const allowInnerScroll = ref(false)
let updateToken = 0
let transitionTimer: ReturnType<typeof setTimeout> | undefined

/** 内容高度限制，auto 表示不限制 */
const parsedLimitPx = computed(() => {
    if (props.contentHeight === 'auto') return Infinity
    const limit = getPx(props.contentHeight)
    return limit > 0 ? limit : Infinity
})

const isLimited = computed(() => Number.isFinite(parsedLimitPx.value))

/** 过渡目标高度；测量失败且未限高时交给自然高度兜底 */
const wrapperStyle = computed(() => {
    const style: Record<string, string> = {}

    if (!expanded.value) {
        style.height = '0px'
        return style
    }
    if (isLimited.value) {
        const height = Math.min(contentHeight.value || parsedLimitPx.value, parsedLimitPx.value)
        style.height = `${height}px`
    } else if (!autoHeight.value && contentHeight.value > 0) {
        style.height = `${contentHeight.value}px`
    }
    return style
})

/** 测量内容自然高度；wrapper 折叠时 body 仍可测到完整高度 */
async function measureContentHeight() {
    try {
        const rect = await getRect(`#${contentId}`, false, instance)
        return Number(rect?.height) || 0
    } catch (e) {
        return 0
    }
}

/** 按最新选中态同步动画 */
async function updateExpand() {
    const token = ++updateToken
    const nextExpanded = isSelected.value
    const nextHeight = await measureContentHeight()

    contentHeight.value = nextHeight
    autoHeight.value = false
    allowInnerScroll.value = false
    clearTransitionTimer()

    // 与 wd 的节奏一致：先让固定高度进入下一帧，再驱动高度过渡
    await sleep(33)

    if (token !== updateToken || isSelected.value !== nextExpanded) return
    expanded.value = nextExpanded
    transitionInited.value = true
    if (nextExpanded) scheduleTransitionEnd()
}

function clearTransitionTimer() {
    if (transitionTimer === undefined) return
    clearTimeout(transitionTimer)
    transitionTimer = undefined
}

/** transitionend 在部分小程序端不可靠，用同时长定时器兜底 */
function scheduleTransitionEnd() {
    clearTransitionTimer()
    transitionTimer = setTimeout(finishExpanded, 330)
}

function finishExpanded() {
    clearTransitionTimer()
    if (!expanded.value || !isSelected.value) return

    if (isLimited.value) {
        allowInnerScroll.value = true
    } else {
        autoHeight.value = true
    }
}

/** 过渡结束后恢复自然高度，限高场景则开启内部滚动 */
function handleTransitionEnd(event: Event) {
    const detail = event as unknown as {
        currentTarget?: { id?: string }
        target?: { id?: string }
        propertyName?: string
    }
    const eventId = detail.target?.id || detail.currentTarget?.id
    if (eventId && eventId !== wrapperId) return

    const propertyName = detail.propertyName || ''
    if (propertyName && propertyName !== 'height') return
    finishExpanded()
}

/** 点击子项时只派发事件，状态更新统一交给父组件 */
function handleClick() {
    if (disabled.value) return

    const nextExpanded = !isSelected.value
    emit('click', props.index)
    if (nextExpanded) {
        emit('open', props.index)
    } else {
        emit('close', props.index)
    }
    emit('change', nextExpanded, props.index)
    if (groupConfig?.props.accordion) emit('child-click', props.index)
    groupConfig?.toggle(props.index, nextExpanded)
}

watch(isSelected, () => {
    updateExpand()
})

onMounted(async () => {
    await nextTick()

    // 兼容旧的 defaultOpen 用法，但初始值仍收敛到父组件 modelValue
    if (props.defaultOpen && groupConfig && !isSelected.value) {
        groupConfig.toggle(props.index, true)
        await nextTick()
    }

    await updateExpand()
})

// 对外暴露的方法
defineExpose<IFoldingPanelItemExpose>({
    open: () => {
        if (disabled.value || isSelected.value) return
        emit('open', props.index)
        emit('change', true, props.index)
        groupConfig?.toggle(props.index, true)
    },

    close: () => {
        if (disabled.value || !isSelected.value) return
        emit('close', props.index)
        emit('change', false, props.index)
        groupConfig?.toggle(props.index, false)
    },

    toggle: () => {
        handleClick()
    },

    getExpanded: () => expanded.value,

    /** 内容动态变化后重新测量，保证下一次折叠动画从真实高度开始 */
    resize: async () => {
        // 等插槽渲染完成后再测量，避免拿到新增数据前的高度
        await nextTick()
        const nextHeight = await measureContentHeight()
        if (!isSelected.value) return

        contentHeight.value = nextHeight
        if (isLimited.value) {
            allowInnerScroll.value = true
            return
        }

        // 从 auto 切到新固定高度，让内容增长也有高度过渡，结束后再恢复 auto
        autoHeight.value = false
        scheduleTransitionEnd()
    }
})

onBeforeUnmount(() => {
    clearTransitionTimer()
})
</script>

<style lang="scss">
@use './index.scss';
</style>
