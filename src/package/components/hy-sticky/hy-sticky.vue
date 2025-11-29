<template>
    <view>
        <!-- 哨兵必须在 sticky 前面 -->
        <view :id="sentinelId" class="hy-sticky__sentinel"></view>

        <!-- 占位元素：当吸顶后占据原高度，避免页面抖动 -->
        <view v-if="isFixed" :style="{ height: placeholderHeight + 'px' }" />

        <view
            ref="stickyRef"
            :class="['hy-sticky', isFixed ? 'hy-sticky__fixed' : '']"
            :style="mergedStyle"
        >
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, getCurrentInstance, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { addUnit, getRect } from '../../libs'
import type { IStickyEmits } from './typing'
import stickyProps from './props'

const props = defineProps(stickyProps)
const emit = defineEmits<IStickyEmits>()

const instance = getCurrentInstance()
const sentinelId = `hy-sticky-sentinel-${Math.random().toString(36).slice(2, 9)}`
const stickyRef = ref<HTMLElement | null>(null)
const isFixed = ref(false)
const placeholderHeight = ref(0)
let observer: UniApp.IntersectionObserver | null = null
let rafTimer = 0

// 组件样式（吸顶时使用 fixed/fallback）
// 注意：position: sticky 在部分平台失效时，我们使用绝对 fixed 样式做回退
const mergedStyle = computed<CSSProperties>(() => {
    if (!props.enable) return {}
    if (isFixed.value) {
        // fixed 样式回退，尽量跟 sticky 表现一致
        return {
            position: 'fixed',
            top: addUnit(props.offsetTop),
            left: '0px',
            right: '0px',
            zIndex: props.zIndex
            // 保持宽度，如果需要你可以传入宽度样式到 custom style slot
        }
    } else {
        return {
            position: 'sticky',
            top: addUnit(props.offsetTop),
            zIndex: props.zIndex
        }
    }
})

// Helper: 查询哨兵和 sticky 高度/位置
const querySentinel = (): Promise<{
    sentinelTop: number
    sentinelBottom: number
    stickyHeight: number
}> => {
    return new Promise((resolve) => {
        const query = uni.createSelectorQuery().in(instance!)
        query
            .select(`#${sentinelId}`)
            .boundingClientRect()
            .selectViewport()
            .exec((res: any[]) => {
                // res 结构：[ sentinelRect, viewportRect ]
                const sentinelRect = res[0] || {}
                const viewportRect = res[1] || {}
                const stickyRectQuery = uni.createSelectorQuery().in(instance!)
                stickyRectQuery
                    .select('.hy-sticky')
                    .boundingClientRect()
                    .exec((r2: any[]) => {
                        const stickyRect = (r2 && r2[0]) || {}
                        resolve({
                            sentinelTop: sentinelRect.top ?? 0,
                            sentinelBottom: sentinelRect.bottom ?? 0,
                            stickyHeight: stickyRect.height ?? 0
                        })
                    })
            })
    })
}

// IntersectionObserver 初始化（优先）
const initObserver = async () => {
    if (!props.enable) return
    // 先断开之前的
    observer?.disconnect()
    observer = null

    try {
        // 若用户传入 scrollSelector，则使用 relativeTo(container)
        const ins = instance!
        const io = uni.createIntersectionObserver(ins, {
            thresholds: [0, 1]
        })

        if (props.scrollSelector) {
            // 使用相对容器（scroll-view）
            io.relativeTo(`.${props.scrollSelector}`, { top: props.offsetTop })
        } else {
            // 使用视口
            io.relativeToViewport({ top: -props.offsetTop })
        }

        io.observe(`#${sentinelId}`, (res) => {
            const fixed = res.boundingClientRect.top <= props.offsetTop
            if (fixed !== isFixed.value) {
                // 当切换为 fixed，记录占位高度
                if (fixed) {
                    // 获取 sticky 高度作为占位
                    getRect('.hy-sticky', false, instance).then((rect) => {
                        placeholderHeight.value = rect?.height ? rect.height : 0
                    })
                } else {
                    placeholderHeight.value = 0
                }
                isFixed.value = fixed
                emit('change', fixed)
            }
        })

        observer = io
    } catch (e) {
        // createIntersectionObserver 在极少数平台可能抛错，交给回退逻辑
        observer = null
    }
}

const pageScrollHandler = () => {
    if (rafTimer) return
    rafTimer = requestAnimationFrame(async () => {
        rafTimer = 0

        const { sentinelBottom, stickyHeight } = await querySentinel()
        const offset = props.offsetTop

        // 用 bottom 判断，保证吸顶时位置保持 offset
        const fixed = sentinelBottom <= offset

        if (fixed !== isFixed.value) {
            isFixed.value = fixed

            if (fixed) {
                placeholderHeight.value = stickyHeight
            } else {
                placeholderHeight.value = 0
            }

            emit('change', fixed)
        }
    })
}

const onPageScrollListener = (e: any) => {
    // 仅当 enable 时才处理
    if (!props.enable) return
    // 如果我们已经有 observer 且工作正常，则可以不必依赖回退（但保留检查以防万一）
    // 这里仍然执行 pageScrollHandler 以防 observer 未触发
    pageScrollHandler()
}

// 供外部触发重置（比如内容加载高度变化）
const refresh = async () => {
    await nextTick()
    // 重新测高度
    getRect('.hy-sticky', false, instance).then((rect) => {
        placeholderHeight.value = rect?.height ? rect.height : 0
    })
    // 重新 init observer
    await initObserver()
    // 手动触发一次检测
    pageScrollHandler()
}

onMounted(() => {
    nextTick(async () => {
        await initObserver()

        // 始终绑定 page scroll 回退（能兼容大多数场景）
        // 注意：如果页面使用 scroll-view（而非页面滚动），你应传入 scrollSelector 以使用 relativeTo(container)
        onPageScroll && onPageScroll(onPageScrollListener)
    })
})

onUnmounted(() => {
    observer?.disconnect()
    observer = null
    // 解除 pageScroll 监听：uni-app 没有 onPageScroll.off，onPageScroll 是全局注册的，通常不需要解绑
    // 但是我们清理 raf
    if (rafTimer) cancelAnimationFrame(rafTimer)
})

// 如果 enable 改变，重置
watch(
    () => props.enable,
    (v) => {
        if (v) {
            refresh()
        } else {
            observer?.disconnect()
            observer = null
            isFixed.value = false
            placeholderHeight.value = 0
        }
    }
)

defineExpose({
    refresh
})
</script>

<style lang="scss" scoped>
@import './index.scss';
@import './index.scss';
</style>
