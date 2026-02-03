<template>
    <view v-if="show" class="refresh-indicator">
        <hy-loading :text="text || '正在刷新...'"></hy-loading>
    </view>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
    show: boolean
    text?: string
}>()
</script>

<style lang="scss" scoped>
/* 刷新指示器样式 */
.refresh-indicator {
    position: fixed;
    top: 80rpx;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 16rpx 32rpx;
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: fadeIn 0.3s ease;
}

.loading-icon {
    animation: spin 1s linear infinite;
}

.refresh-text {
    font-size: 24rpx;
    color: #667eea;
    margin-left: 12rpx;
}

/* 淡入动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
}

/* 旋转动画 */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
    .refresh-indicator {
        background: rgba(44, 44, 44, 0.95);
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
    }

    .refresh-text {
        color: #8a96ff;
    }
}
</style>
