<template>
    <view class="user-card">
        <view class="user-avatar-container">
            <image class="user-avatar" :src="userInfo.avatar" mode="aspectFill" />
            <view class="vip-badge" v-if="userInfo.isVip">
                <text class="vip-text">VIP</text>
            </view>
        </view>

        <view class="user-info">
            <view class="user-name-row">
                <text class="user-name">{{ userInfo.nickname }}</text>
                <view class="edit-btn" @click="onEdit">
                    <text class="edit-text">{{ editText || '编辑资料' }}</text>
                    <hy-icon name="edit" size="12" color="#999"></hy-icon>
                </view>
            </view>
            <text class="user-id">ID: {{ userInfo.userId }}</text>
            <text class="user-bio">{{ userInfo.bio }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import HyIcon from '../../../package/components/hy-icon/hy-icon.vue'
interface UserInfo {
    nickname: string
    userId: string
    avatar: string
    bio: string
    isVip: boolean
}

// Props
const props = defineProps<{
    userInfo: UserInfo
    editText?: string
}>()

// Emits
const emit = defineEmits<{
    (e: 'edit'): void
}>()

// 处理编辑事件
const onEdit = () => {
    emit('edit')
}
</script>

<style lang="scss" scoped>
/* 用户卡片 - 增强视觉效果 */
.user-card {
    display: flex;
    align-items: center;
    background: $hy-background--container;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: $hy-box-shadow;
    animation: fadeInUp 0.5s ease;
    // 添加悬浮效果
    transform: translateY(0);
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-4rpx);
    }
}

/* 用户头像 - 增强视觉效果 */
.user-avatar-container {
    position: relative;
    margin-right: 24rpx;
    // 添加呼吸效果
    animation: avatarScale 3s ease-in-out infinite alternate;
}

.user-avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: $hy-border-radius-circle;
    border: 4rpx solid $hy-border-color;
    box-shadow: $hy-box-shadow;
}

.vip-badge {
    width: 70rpx;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #121212 0%, #000 100%);
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.6);
    border-radius: $hy-border-radius-semicircle;
    padding: $hy-border-margin-padding-sm;
    .vip-text {
        color: #e6c35c;
        font-size: 20rpx;
        font-weight: bold;
    }
}

.user-info {
    flex: 1;
}

.user-name-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8rpx;
}

.user-name {
    font-size: 36rpx;
    font-weight: bold;
}

.edit-btn {
    display: flex;
    align-items: center;
    background: $hy-background--close;
    padding: 6rpx 20rpx;
    border-radius: 20rpx;
    // 添加交互动画
    transition: all 0.3s ease;
    &:active {
        transform: scale(0.95);
        background: #e5e5e5;
    }
}

.edit-text {
    font-size: 24rpx;
    color: #999;
    margin-right: 4rpx;
}

.user-id {
    font-size: 24rpx;
    color: #999;
    display: block;
    margin-bottom: 8rpx;
}

.user-bio {
    font-size: 26rpx;
    color: #666;
    line-height: 36rpx;
}

/* 头像呼吸效果 */
@keyframes avatarScale {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.05);
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
