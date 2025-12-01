<template>
    <view class="stats-card">
        <view
            v-for="(stat, index) in stats"
            :key="stat.key"
            class="stat-item"
            @click="handleStatClick(stat.key)"
        >
            <text class="stat-number">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
            <view class="stat-divider" v-if="index < stats.length - 1"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
interface StatItem {
    key: string
    label: string
    value: number | string
}

// Props
const props = defineProps<{
    stats: StatItem[]
}>()

// Emits
const emit = defineEmits<{
    (e: 'click', key: string): void
}>()

// 处理统计项点击
const handleStatClick = (key: string) => {
    emit('click', key)
}
</script>

<style lang="scss" scoped>
$primary-color: #667eea;
$shadow-medium: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);

/* 统计数据卡片 - 增强视觉效果 */
.stats-card {
    background: $hy-background--container;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: $shadow-medium;
    display: flex;
    justify-content: space-around;
    animation: fadeInUp 0.6s ease;
    // 添加悬浮效果
    transform: translateY(0);
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-4rpx);
    }
}

/* 统计项 - 添加交互动效 */
.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rpx 0;
    // 添加交互效果
    border-radius: 16rpx;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgba($primary-color, 0.05);
    }
    &:active {
        background-color: rgba($primary-color, 0.1);
    }
}

.stat-number {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    color: #999;
}

.stat-divider {
    width: 2rpx;
    background: #f0f0f0;
}

/* 渐入动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30rpx);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
