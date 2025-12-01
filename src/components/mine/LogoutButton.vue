<template>
    <button class="logout-btn" @click="handleLogout" :disabled="disabled">
        <text>{{ loading ? loadingText || '退出中...' : buttonText || '退出登录' }}</text>
    </button>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
    buttonText?: string
    loading?: boolean
    disabled?: boolean
    loadingText?: string
}>()

// Emits
const emit = defineEmits<{
    (e: 'logout'): void
}>()

// 处理退出登录
const handleLogout = () => {
    if (!props.disabled && !props.loading) {
        emit('logout')
    }
}
</script>

<style lang="scss" scoped>
$danger-color: #ff6b6b;
$bg-primary: #ffffff;
$shadow-light: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

/* 退出登录按钮 - 添加精美交互 */
.logout-btn {
    background: $bg-primary;
    color: $danger-color;
    font-size: 32rpx;
    border-radius: 20rpx;
    padding: 24rpx;
    margin: 0 30rpx;
    border: none;
    box-shadow: $shadow-light;
    animation: fadeInUp 0.8s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    // 添加精美点击效果
    transition: all 0.3s ease;
    &:active {
        background-color: rgba($danger-color, 0.05);
        transform: scale(0.98);
    }
    &:hover {
        box-shadow: 0 6rpx 24rpx rgba($danger-color, 0.15);
    }

    // 禁用状态
    &:disabled {
        opacity: 0.6;
        transform: none;
        cursor: not-allowed;
    }
}

.loading-icon {
    margin-right: 12rpx;
    animation: spin 1s linear infinite;
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
