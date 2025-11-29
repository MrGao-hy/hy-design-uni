<template>
    <view class="sticky-container" :style="{ zIndex: zIndex }">
        <!-- 哨兵元素：用于检测是否吸顶 -->
        <!-- 它的位置通过 absolute 定位到吸顶触发线的位置 -->
        <view class="sticky-sentinel" :id="sentinelId" :style="sentinelStyle"></view>

        <!-- 实际内容区域 -->
        <view class="sticky-content" :class="{ 'is-sticky': isFixed }" :style="contentStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'

// --- 类型定义 ---
interface TrackParams {
    traceId?: string // 埋点 ID
    pageName?: string // 页面名称
    [key: string]: any // 其他参数
}

interface Props {
    offsetTop?: number // 吸顶距离顶部的位置 (rpx 或 px，内部会转 px)
    zIndex?: number // 层级
    enableTrack?: boolean // 是否开启埋点
    trackParams?: TrackParams // 埋点透传参数
}

const props = withDefaults(defineProps<Props>(), {
    offsetTop: 0,
    zIndex: 99,
    enableTrack: false,
    trackParams: () => ({})
})

const emit = defineEmits(['change', 'track'])

// --- 状态与实例 ---
const instance = getCurrentInstance()
const isFixed = ref(false) // 是否处于吸顶状态
// 生成唯一的 ID，防止页面有多个吸顶组件时冲突
const sentinelId = `sentinel_${Math.floor(Math.random() * 100000)}`
let observer: UniApp.IntersectionObserver | null = null

// --- 计算属性 ---

// 处理 offsetTop，虽然 props 可能是 rpx，但 style 中最好统一单位，这里简化处理直接用 px
// 如果传入的是 rpx 数值，建议在父组件 uni.upx2px 转换后传入，或者在这里做转换
const topPx = computed(() => {
    return typeof props.offsetTop === 'number' ? props.offsetTop : 0
})

// 内容区域的样式
const contentStyle = computed(() => ({
    position: 'sticky' as const, // 强制断言
    top: `${topPx.value}px`,
    zIndex: props.zIndex
}))

// 哨兵的样式
// 核心逻辑：哨兵绝对定位在容器顶部，高度为 0，向上偏移 offsetTop 的距离
// 当这个位置滚出视口时，意味着 sticky 生效了
const sentinelStyle = computed(() => ({
    position: 'absolute' as const,
    top: `-${topPx.value}px`,
    left: 0,
    height: '1px',
    width: '100%',
    visibility: 'hidden' as const,
    pointerEvents: 'none' as const
}))

// --- 核心逻辑 ---

const initObserver = () => {
    if (!instance) return

    // 创建交叉观察器
    observer = uni.createIntersectionObserver(instance)

    // 观察哨兵元素与视口的交叉情况
    observer
        .relativeToViewport({ top: 0 }) // 顶部边界
        .observe(`#${sentinelId}`, (res) => {
            // res.intersectionRatio === 0 意味着完全移出视口
            // res.boundingClientRect.top < 0 意味着是从上方移出的（而不是下方）

            const isStickyNow = res.boundingClientRect.top < 0

            // 状态防抖：只有状态改变时才触发
            if (isStickyNow !== isFixed.value) {
                isFixed.value = isStickyNow
                handleStatusChange(isStickyNow)
            }
        })
}

// 处理状态变更与埋点
const handleStatusChange = (status: boolean) => {
    // 1. 抛出基础状态变更事件 (用于 UI 逻辑)
    emit('change', status)

    // 2. 处理埋点逻辑
    if (props.enableTrack) {
        const eventData = {
            action: status ? 'sticky_start' : 'sticky_end', // 吸顶开始 | 吸顶结束
            timestamp: Date.now(),
            ...props.trackParams
        }

        // 抛出埋点专用事件
        emit('track', eventData)

        // 开发环境打印，方便调试
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Sticky Track]: ${status ? '吸顶' : '取消吸顶'}`, eventData)
        }
    }
}

// --- 生命周期 ---
onMounted(() => {
    // 稍微延时确保 DOM 渲染完成
    setTimeout(() => {
        initObserver()
    }, 100)
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
})
</script>

<style scoped>
.sticky-container {
    position: relative;
    /* 解决某些场景下 z-index 失效问题 */
    isolation: isolate;
}

/* 可以在这里添加吸顶后的默认阴影效果，或者通过 slot 自定义 */
.sticky-content.is-sticky {
    /* 示例：吸顶时添加底部阴影 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
