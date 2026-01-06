<template>
    <view class="feature-group">
        <view v-if="title" class="feature-title">
            <text class="hy-title">{{ title }}</text>
        </view>
        <view class="feature-list">
            <view
                v-for="item in features"
                :key="item.key"
                class="feature-item"
                @click="handleFeatureClick(item)"
            >
                <view
                    class="feature-icon"
                    :style="{ backgroundColor: getIconBackground(item.iconBg || '#667eea') }"
                >
                    <hy-icon :name="item.icon" size="24" :color="item.iconColor"></hy-icon>
                </view>
                <text class="feature-label">{{ item.label }}</text>
                <view class="feature-right">
                    <view v-if="item.badge" class="feature-badge">
                        {{ item.badge }}
                    </view>
                    <text v-if="item.version" class="version-text">
                        {{ item.version }}
                    </text>
                    <hy-icon v-else :name="IconConfig.RIGHT" size="24" color="#999" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'

interface FeatureItem {
    key: string
    label: string
    icon?: string
    iconColor?: string
    iconBg?: string
    badge?: string | number
    version?: string
    route?: string
    params?: Record<string, any>
}

// Props
const props = defineProps<{
    title?: string
    features: FeatureItem[]
}>()

// Emits
const emit = defineEmits<{
    (e: 'click', item: FeatureItem): void
    (e: 'navigate', route: string, params?: Record<string, any>): void
}>()

// 获取图标背景色（带透明度）
const getIconBackground = (color: string) => {
    // 这里可以实现根据颜色生成半透明背景
    return color.includes('rgba') ? color : `${color}20`
}

// 处理功能项点击
const handleFeatureClick = (item: FeatureItem) => {
    emit('click', item)

    // 如果有路由信息，触发导航事件
    if (item.route) {
        emit('navigate', item.route, item.params)
    }
}
</script>

<style lang="scss" scoped>
/* 功能组 - 增强视觉效果 */
.feature-group {
    background: $hy-background--container;
    border-radius: $hy-border-radius-base;
    margin-bottom: $hy-border-margin-padding-base;
    overflow: hidden;
    box-shadow: $hy-box-shadow;
    animation: fadeInUp 0.7s ease;
    // 添加轻微的悬浮效果
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
    }
}

/* 功能组标题 */
.feature-title {
    padding: 20rpx 30rpx;
    background: rgba(102, 126, 234, 0.05);
    .hy-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #667eea;
    }
}

/* 功能列表 */
.feature-list {
    // 功能列表容器样式
}

/* 功能项 - 添加精美交互 */
.feature-item {
    display: flex;
    align-items: center;
    padding: $hy-border-margin-padding-lg;
    position: relative;
    transition: all 0.3s ease;
    border-bottom: $hy-border-line;

    &:active {
        background-color: $hy-background--hover;
        // 添加缩放效果
        transform: scale(0.98);
    }
}

/* 功能图标 - 增强视觉效果 */
.feature-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: $hy-border-radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $hy-border-margin-padding-base;
    // 添加悬浮效果
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
}

.feature-label {
    flex: 1;
    font-size: 28rpx;
}

.feature-right {
    display: flex;
    align-items: center;
}

.feature-badge {
    background: #ff6b6b;
    color: white;
    font-size: 20rpx;
    padding: 2rpx 12rpx;
    border-radius: 12rpx;
    margin-right: 12rpx;
    min-width: 40rpx;
    text-align: center;
}

.version-text {
    font-size: 24rpx;
    color: #999;
    margin-right: 12rpx;
}

/* 动画效果 */
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
