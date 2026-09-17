<template>
    <!-- #ifndef APP-NVUE -->
    <view
        v-if="hasInit"
        class="hy-transition"
        ref="hy-transition"
        :class="[classes, customClass]"
        :style="[mergeStyle]"
        @tap="clickHandler"
        @transitionend="onTransitionEnd"
        @touchmove.stop.prevent="noop"
    >
        <slot />
    </view>
    <!-- #endif -->

    <!-- #ifdef APP-NVUE -->
    <view
        v-if="hasInit"
        class="hy-transition"
        ref="hy-transition"
        :class="[classes, customClass]"
        :style="[mergeStyle]"
        @tap="clickHandler"
        @touchmove.stop.prevent="noop"
    >
        <slot />
    </view>
    <!-- #endif -->
</template>

<script lang="ts">
export default {
    name: 'hy-transition',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import type { CSSProperties } from 'vue'
import { sleep } from '../../libs'
import type { ITransitionEmits } from './typing'
import transitionProps from './props'

/**
 * 该组件用于组件的动画过渡效果。
 * @displayName hy-transition
 */
defineOptions({})

const props = defineProps(transitionProps)
const emit = defineEmits<ITransitionEmits>()

const hasInit = ref<boolean>(false) // 是否渲染组件
const viewStyle = ref<CSSProperties>({}) // 组件内部的样式
const status = ref<string>('') // 记录组件动画的状态
const transitionEnded = ref<boolean>(false) // 组件是否结束的标记
const classes = ref<string>('') // 应用的类名

let transitionId = 0
let endTimer: ReturnType<typeof setTimeout> | undefined
let isAlive = true

const clearEndTimer = () => {
    if (endTimer) {
        clearTimeout(endTimer)
        endTimer = undefined
    }
}

// #ifndef APP-NVUE
// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
const getClassNames = (name: string) => ({
    enter: `hy-${name}-enter hy-${name}-enter-active`,
    'enter-to': `hy-${name}-enter-to hy-${name}-enter-active`,
    leave: `hy-${name}-leave hy-${name}-leave-active`,
    'leave-to': `hy-${name}-leave-to hy-${name}-leave-active`
})

const finishTransition = (id: number) => {
    if (!isAlive || id !== transitionId || transitionEnded.value) return

    transitionEnded.value = true
    clearEndTimer()

    if (status.value === 'leave') {
        emit('afterLeave')
    } else if (status.value === 'enter') {
        emit('afterEnter')
    }

    if (!props.show && hasInit.value) {
        hasInit.value = false
    }
}

const scheduleTransitionEnd = (id: number) => {
    clearEndTimer()
    // transitionend 在部分场景不会触发，定时器作为兜底。
    endTimer = setTimeout(() => {
        endTimer = undefined
        finishTransition(id)
    }, props.duration + 20)
}

type TransitionEndEvent = {
    target?: unknown
    currentTarget?: unknown
}

const onTransitionEnd = (event?: TransitionEndEvent) => {
    // transitionend 会冒泡，只处理当前节点上的过渡结束事件。
    if (event?.target && event?.currentTarget && event.target !== event.currentTarget) {
        return
    }
    finishTransition(transitionId)
}

// vue版本的组件进场处理
const vueEnter = async () => {
    const id = ++transitionId
    clearEndTimer()

    const classNames = getClassNames(props.mode)
    status.value = 'enter'
    emit('beforeEnter')
    hasInit.value = true
    classes.value = classNames.enter

    await nextTick()
    if (!isAlive || id !== transitionId) return

    // 等待一帧，确保初始状态类名已经生效。
    await sleep(20)
    if (!isAlive || id !== transitionId) return

    emit('enter')
    transitionEnded.value = false
    classes.value = classNames['enter-to']
    scheduleTransitionEnd(id)
}

// 动画离场处理
const vueLeave = async () => {
    if (!hasInit.value) return

    const id = ++transitionId
    clearEndTimer()

    const classNames = getClassNames(props.mode)
    status.value = 'leave'
    emit('beforeLeave')
    classes.value = classNames.leave

    await nextTick()
    if (!isAlive || id !== transitionId) return

    await sleep(20)
    if (!isAlive || id !== transitionId) return

    transitionEnded.value = false
    emit('leave')
    classes.value = classNames['leave-to']
    scheduleTransitionEnd(id)
}
// #endif

watch(
    () => props.show,
    (newVal) => {
        // #ifdef APP-NVUE
        // newVal ? nvueEnter() : nvueLeave()
        // #endif
        // #ifndef APP-NVUE
        newVal ? vueEnter() : vueLeave()
        // #endif
    },
    { immediate: true }
)

const mergeStyle = computed(() => {
    const baseStyle = {
        ...props.customStyle,
        ...viewStyle.value
    }

    // #ifndef APP-NVUE
    return {
        ...baseStyle,
        // 动画属性放在后面，避免自定义样式覆盖动画时长和缓动函数。
        transitionDuration: `${props.duration}ms`,
        transitionTimingFunction: props.timingFunction
    }
    // #endif

    // #ifdef APP-NVUE
    return baseStyle
    // #endif
})

/**
 * 组件被点击发出事件
 * */
const clickHandler = (e: Event) => {
    if (props.stop) e.stopPropagation()
    emit('click')
}

function noop() {}

onBeforeUnmount(() => {
    isAlive = false
    transitionId++
    clearEndTimer()
})
</script>

<style lang="scss">
@use './index.scss';
</style>
