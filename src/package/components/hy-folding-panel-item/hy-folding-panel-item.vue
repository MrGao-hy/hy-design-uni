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

        <!-- 面板内容：静态 CSS transition + max-height 兜底，多端必出动画 -->
        <view
            :class="[
                'hy-folding-panel-item__content-wrapper',
                {
                    'is-expanded': isExpanded,
                    'is-measuring': measuring,
                    'is-limited-scroll': allowInnerScroll
                }
            ]"
            :style="wrapperStyle"
            @transitionend="onTransitionEnd"
        >
            <view
                :class="['hy-folding-panel-item__content', uniqueContentClass]"
                :style="customStyle"
            >
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
import { ref, computed, inject, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import type { IFoldingPanelConfig, IFoldingPanelItemEmits, IFoldingPanelItemExpose } from './typing'
import { getRect, IconConfig } from '../../libs'
import foldingPanelItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 折叠面板项组件
 *
 * 动画实现要点（uni-app 全端兼容必出动画）：
 * 1. 静态 CSS 写死 transition（height + max-height 双属性过渡），不通过 :style 动态开关
 * 2. 测量阶段用 is-measuring 类临时脱屏（position:absolute + visibility:hidden + height:auto）
 *    保证 overflow:hidden 不裁剪、布局不受影响，getRect 一定能拿到真实高度
 * 3. 缓存测得的高度，非 resize() 主动调用不复测，避免异步卡顿
 * 4. 若测量失败（极个别情况），fallback 到 max-height=9999rpx，至少保证有展开动画
 *
 * @displayName hy-folding-panel-item
 */

const props = defineProps(foldingPanelItemProps)

// 事件定义
const emit = defineEmits<IFoldingPanelItemEmits>()

// 尝试从父组件注入配置
const groupConfig = inject<IFoldingPanelConfig>('hy-folding-panel')

// 当前组件实例（微信小程序 getRect 限定查询范围）
const instance = getCurrentInstance()

// 内部展开状态
const expanded = ref(props.defaultOpen)

// 计算当前是否展开
const isExpanded = computed(() => {
    if (groupConfig?.accordion?.value) {
        return groupConfig.activeIndex.value === props.index
    }
    return expanded.value
})

/** 是否处于"脱屏测量模式" */
const measuring = ref(false)

/** 动画结束后限高场景是否允许内部滚动（由 @transitionend 兜底 setTimeout 双保险） */
const allowInnerScroll = ref(false)

/** 缓存的真实内容高度（px），>=1 表示已测过 */
const cachedRealHeight = ref<number>(0)

/** 已测过一次则使用缓存，不再复测（避免异步卡顿） */
const hasMeasured = computed(() => cachedRealHeight.value > 0)

/** 当前项内容区唯一查询类名，避免多面板冲突 */
const uniqueContentClass = computed(() => `hy-folding-panel-item__content--${props.index}`)

/** contentHeight 上限数值解析 */
const isLimited = computed(() => {
    if (!props.contentHeight || props.contentHeight === 'auto') return false
    const limit =
        typeof props.contentHeight === 'number'
            ? props.contentHeight
            : parseFloat(props.contentHeight as string)
    return !isNaN(limit) && limit > 0
})

const parsedLimitPx = computed(() => {
    if (!isLimited.value) return Infinity
    return typeof props.contentHeight === 'number'
        ? props.contentHeight
        : parseFloat(props.contentHeight as string)
})

/** wrapper 的内联样式（仅用于 height/max-height 精确值，transition 固定写在 CSS） */
const wrapperStyle = computed(() => {
    const style: Record<string, string> = {}

    // 测量阶段由 CSS 类控制高度，不覆盖 style
    if (measuring.value) return style

    if (isExpanded.value) {
        // 展开：优先用精确 height（动画最准确）
        if (hasMeasured.value) {
            const finalH = Math.min(cachedRealHeight.value, parsedLimitPx.value)
            style.height = `${finalH}px`
            // max-height 作为过渡兜底，限高时保护
            style.maxHeight = `${finalH + 1}px`
        } else {
            // 未测量 fallback：max-height 兜底展开（有动画，仅不精确）
            style.maxHeight = '9999rpx'
            style.height = 'auto'
        }
    } else {
        // 折叠：精确 0
        style.height = '0px'
        style.maxHeight = '0px'
    }
    return style
})

/**
 * 脱屏测量真实内容高度：
 * 1. 加 is-measuring 类 → 绝对定位 + visibility:hidden + height:auto + overflow:visible
 * 2. nextTick 后 getRect 测量（此时内容必完整展开，不受裁剪）
 * 3. 关 measuring 类，回到正常流
 */
const measureInDetached = async (): Promise<number> => {
    measuring.value = true
    allowInnerScroll.value = false
    await nextTick()

    let height = 0
    try {
        const rect = await getRect(`.${uniqueContentClass.value}`, false, instance)
        height = rect?.height || 0
    } catch (e) {
        // 极端情况下的 fallback：保证不为 0
        height = 0
    }

    measuring.value = false
    // 关 measuring 后等待一帧回到文档流
    await nextTick()
    return height
}

/**
 * 触发展开/折叠：
 * - 展开前若未测过高度 → 先脱屏测量 → 缓存 → 再开启 isExpanded → CSS transition 生效
 * - 已缓存 → isExpanded 变化直接由静态 CSS transition 从 0 过渡到目标高度
 * - 折叠由 isExpanded 由 true→false，CSS 自动从目标高度过渡到 0
 */
const ensureReadyAndToggle = async (nextExpanded: boolean) => {
    allowInnerScroll.value = false

    if (nextExpanded && !hasMeasured.value) {
        const h = await measureInDetached()
        cachedRealHeight.value = h > 0 ? h : cachedRealHeight.value
    }

    // 切换展开状态（同步触发 watch）
    if (groupConfig?.accordion?.value) {
        groupConfig.updateActiveIndex(props.index)
    } else {
        expanded.value = nextExpanded
    }

    // 动画结束后限高场景开启内部滚动
    if (nextExpanded) {
        setTimeout(() => {
            if (isExpanded.value && isLimited.value) {
                allowInnerScroll.value = true
            }
        }, 350)
    }
}

/**
 * 过渡结束回调：限高场景开启内部滚动
 */
const onTransitionEnd = (e: Event) => {
    // 只在目标属性是 height / max-height 时处理
    const ev = e as unknown as { propertyName?: string }
    const prop = ev.propertyName || ''
    if (prop && !['height', 'max-height'].includes(prop)) return
    if (isExpanded.value && isLimited.value) {
        allowInnerScroll.value = true
    }
}

// 处理点击事件
const handleClick = () => {
    if (props.disabled) return
    const nextExpand = !isExpanded.value

    // 事件按 Vue 语义：change 回调接收"目标状态"，open/close 对应目标语义
    emit('click', props.index)
    if (nextExpand) {
        emit('open', props.index)
    } else {
        emit('close', props.index)
    }
    emit('change', nextExpand, props.index)
    if (groupConfig?.accordion?.value) {
        emit('child-click', props.index)
    }

    ensureReadyAndToggle(nextExpand)
}

// 父级手风琴模式下 group 主动切换 activeIndex（如父级 v-model 改值）时的响应
watch(
    isExpanded,
    async (val) => {
        // 父级指令到达时如果要展开但未测量 → 脱屏测量 + 缓存
        if (val && !hasMeasured.value) {
            const h = await measureInDetached()
            if (h > 0) cachedRealHeight.value = h
        }
        allowInnerScroll.value = false
        if (val && isLimited.value) {
            setTimeout(() => (allowInnerScroll.value = true), 350)
        }
    },
    { immediate: false }
)

// 对外暴露的方法
defineExpose<IFoldingPanelItemExpose>({
    open: () => {
        if (props.disabled) return
        emit('open', props.index)
        emit('change', true, props.index)
        ensureReadyAndToggle(true)
    },

    close: () => {
        if (props.disabled) return
        emit('close', props.index)
        emit('change', false, props.index)
        ensureReadyAndToggle(false)
    },

    toggle: () => {
        handleClick()
    },

    getExpanded: () => isExpanded.value,

    /** 重新测量高度（内容动态变化后调用） */
    resize: async () => {
        const h = await measureInDetached()
        if (h > 0) cachedRealHeight.value = h
    }
})

// 初始化：如果 defaultOpen=true，则脱屏测量一次并直接展开（不动画，避免首屏抖动）
onMounted(async () => {
    await nextTick()

    if (props.defaultOpen) {
        if (groupConfig && props.index !== -1) {
            groupConfig.updateActiveIndex(props.index)
        } else {
            expanded.value = true
        }
    }

    // 首屏无论是否 defaultOpen，先测量一次缓存（不改变展开状态，不触发动画）
    const h = await measureInDetached()
    if (h > 0) cachedRealHeight.value = h

    // 若是 defaultOpen，设置滚动可用
    if (props.defaultOpen && isLimited.value) {
        allowInnerScroll.value = true
    }
})
</script>

<style lang="scss">
@use './index.scss';
</style>
