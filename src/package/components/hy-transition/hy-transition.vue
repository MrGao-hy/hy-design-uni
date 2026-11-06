<template>
    <!-- #ifndef APP-NVUE -->

    <!-- 开启 lockScroll：根节点 catchtouchmove 阻断 slot 区域冒泡 + blocker 兄弟节点覆盖根节点范围外 -->
    <view
        v-if="hasInit && lockScroll"
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

    <!-- 未开启 lockScroll -->
    <view
        v-else-if="hasInit"
        class="hy-transition"
        ref="hy-transition"
        :class="[classes, customClass]"
        :style="[mergeStyle]"
        @tap="clickHandler"
        @transitionend="onTransitionEnd"
    >
        <slot />
    </view>

    <!-- #endif -->

    <!-- #ifdef APP-NVUE -->
    <view
        v-if="hasInit && lockScroll"
        class="hy-transition"
        ref="hy-transition"
        :class="[classes, customClass]"
        :style="[mergeStyle]"
        @tap="clickHandler"
        @touchmove.stop.prevent="noop"
    >
        <slot />
    </view>
    <view
        v-else-if="hasInit"
        class="hy-transition"
        ref="hy-transition"
        :class="[classes, customClass]"
        :style="[mergeStyle]"
        @tap="clickHandler"
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

/**
 * H5 + MP-WEIXIN + APP 端页面滚动锁定策略：
 * - H5：body overflow hidden + window 级 wheel/touchmove/keydown 监听兜底
 * - MP-WEIXIN：wx.setPageStyle 从原生层锁 page 滚动（模拟器+真机都生效）
 *              根节点 catchtouchmove 在模拟器不生效，但真机可以，双重保障
 * - MP-ALIPAY：无 my.setPageStyle 等价 API，仅靠根节点 catchtouchmove
 *              （注意：支付宝小程序 catchtouchmove 真机生效，模拟器无效）
 * - APP：类似 H5，同时 body overflow 和 catchtouchmove 兜底
 *
 * 采用计数式锁状态，支持多弹窗叠加：一个弹窗解锁时，若还有其他弹窗持有锁，
 * 页面保持锁定，避免弹窗层叠时提前解锁导致滚动穿透
 * */
/**
 * 页面滚动锁：模块级计数式，支持多弹窗叠加
 * 每个 hy-transition 在 show && lockScroll 时 acquire 锁，show=false 或 unmount 时 release
 * 全局锁计数归零时才真正解除页面级禁止滚动
 */
// #ifdef H5
let prevBodyOverflow: string | null = null
// #endif
// #ifndef MP-ALIPAY
let pageLockCount = 0
let pageLockAcquired = false

const _acquirePageLock = () => {
    if (pageLockCount++ > 0) return

    // #ifdef H5
    if (prevBodyOverflow === null) {
        prevBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
    }
    window.addEventListener('wheel', onWheelLock, { passive: false })
    window.addEventListener('touchmove', onTouchLock, { passive: false })
    window.addEventListener('keydown', onKeyLock)
    // #endif

    // #ifdef MP-WEIXIN
    if (typeof wx !== 'undefined' && typeof wx.setPageStyle === 'function') {
        try {
            wx.setPageStyle({ style: { overflow: 'hidden' } })
        } catch (e) {
            // setPageStyle 在低版本基础库不可用，静默降级到 catchtouchmove
        }
    }
    // #endif

    // #ifdef APP-PLUS
    if (prevBodyOverflow === null) {
        // APP 端与 H5 同属 webview 渲染，document API 可用
        prevBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
    }
    // #endif

    pageLockAcquired = true
}

const _releasePageLock = () => {
    if (pageLockCount > 0 && --pageLockCount > 0) return
    pageLockCount = 0

    if (!pageLockAcquired) return
    pageLockAcquired = false

    // #ifdef H5 || APP-PLUS
    if (prevBodyOverflow !== null) {
        document.body.style.overflow = prevBodyOverflow
        prevBodyOverflow = null
    }
    // #ifdef H5
    window.removeEventListener('wheel', onWheelLock)
    window.removeEventListener('touchmove', onTouchLock)
    window.removeEventListener('keydown', onKeyLock)
    // #endif
    // #endif

    // #ifdef MP-WEIXIN
    if (typeof wx !== 'undefined' && typeof wx.setPageStyle === 'function') {
        try {
            wx.setPageStyle({ style: { overflow: 'auto' } })
        } catch (e) {
            /* ignore */
        }
    }
    // #endif
}
// #endif

// #ifdef H5 || APP-PLUS
const isScrollableInside = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false
    let node: Element | null = target
    while (node && node !== document.body) {
        const el = node as HTMLElement
        const overflowX = getComputedStyle(el).overflowX
        const overflowY = getComputedStyle(el).overflowY
        const isScroller =
            overflowX === 'auto' ||
            overflowX === 'scroll' ||
            overflowY === 'auto' ||
            overflowY === 'scroll' ||
            el.tagName === 'TEXTAREA' ||
            (el as any).tagName === 'SELECT'
        if (isScroller) return true
        node = node.parentElement
    }
    return false
}

const onWheelLock = (e: WheelEvent) => {
    if (isScrollableInside(e.target)) return
    e.preventDefault()
}
const onTouchLock = (e: TouchEvent) => {
    if (isScrollableInside(e.target)) return
    e.preventDefault()
}
const onKeyLock = (e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space']
    if (keys.includes(e.key)) e.preventDefault()
}
// #endif

const pageLockState = computed(() => props.show && props.lockScroll)
watch(pageLockState, (locked) => {
    // #ifndef MP-ALIPAY
    if (locked) _acquirePageLock()
    else _releasePageLock()
    // #endif
})

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
    // #ifndef MP-ALIPAY
    _releasePageLock()
    // #endif
})
</script>

<style lang="scss">
@use './index.scss';
</style>
