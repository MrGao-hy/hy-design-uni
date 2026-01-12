<template>
    <view class="hy-swipe-action">
        <!-- 底层 actions -->
        <view class="hy-swipe-action__actions">
            <view
                v-for="(item, index) in actions"
                :key="item.key"
                class="hy-swipe-action__action"
                :style="getActionStyle(index, item)"
                @click.stop="onActionClick(item)"
            >
                {{ item.text }}
            </view>
        </view>

        <!-- 内容层 -->
        <view
            class="hy-swipe-action__content"
            :style="contentStyle"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface HySwipeActionItem {
    key: string
    text: string
    color?: string
}

const props = defineProps({
    actions: {
        type: Array as PropType<HySwipeActionItem[]>,
        default: () => []
    },
    buttonWidth: {
        type: Number,
        default: 64 // rpx
    }
})

const emit = defineEmits<{
    (e: 'action', item: HySwipeActionItem): void
}>()

const startX = ref(0)
const offsetX = ref(0)
const dragging = ref(false)

const maxOffset = computed(() => props.actions.length * props.buttonWidth)

/**
 * 手势
 */
const onTouchStart = (e: TouchEvent) => {
    startX.value = e.touches[0].clientX
    dragging.value = true
}

const onTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - startX.value

    // 只处理左滑
    if (deltaX < 0) {
        offsetX.value = Math.max(deltaX, -maxOffset.value)
    }
}

const onTouchEnd = () => {
    dragging.value = false

    // 超过一半直接展开
    if (Math.abs(offsetX.value) > maxOffset.value / 2) {
        offsetX.value = -maxOffset.value
    } else {
        offsetX.value = 0
    }
}

const onActionClick = (item: HySwipeActionItem) => {
    emit('action', item)
    offsetX.value = 0
}

/**
 * 内容层样式
 */
const contentStyle = computed(() => ({
    transform: `translateX(${offsetX.value}rpx)`,
    transition: dragging.value ? 'none' : 'transform 0.25s ease-out'
}))

/**
 * ⭐ 核心：阶梯式 action 位移
 */
const getActionStyle = (index: number, item: HySwipeActionItem) => {
    const x = offsetX.value + (index + 1) * props.buttonWidth

    const translateX = Math.min(0, Math.max(-props.buttonWidth, x))

    return {
        width: `${props.buttonWidth}rpx`,
        backgroundColor: item.color || '#ff4d4f',
        transform: `translateX(${translateX}rpx)`,
        transition: dragging.value ? 'none' : 'transform 0.2s ease-out'
    }
}
</script>

<style scoped lang="scss">
.hy-swipe-action {
    position: relative;
    overflow: hidden;
}

.hy-swipe-action__actions {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    z-index: 1;
}

.hy-swipe-action__action {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 26rpx;
}

.hy-swipe-action__content {
    position: relative;
    z-index: 2;
    background-color: #fff;
}
</style>
