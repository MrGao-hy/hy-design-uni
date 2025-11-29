<template>
    <scroll-view scroll-y class="page-container">
        <!-- 头部占位 -->
        <view class="header-banner">
            <text class="title">首页 Banner</text>
            <text class="subtitle">下滑查看吸顶效果</text>
        </view>

        <!-- 1. 基础吸顶：比如分类 Tabs -->
        <!-- offset-top: 0 表示吸附在最顶端 -->
        <StickyHeader
            :offset-top="120"
            :enable-track="true"
            :track-params="{ moduleId: 'category_tabs', type: 'filter' }"
            @change="onStickyChange"
            @track="onTrackEvent"
        >
            <view class="tabs-box" :class="{ 'active-shadow': isTabFixed }">
                <view class="tab-item active">推荐</view>
                <view class="tab-item">热门</view>
                <view class="tab-item">最新</view>
                <view class="tab-item">视频</view>
            </view>
        </StickyHeader>

        <!-- 模拟长列表内容 -->
        <view class="content-list">
            <view class="list-item" v-for="i in 10" :key="`a-${i}`">内容区块 A - {{ i }}</view>
        </view>

        <!-- 2. 二级吸顶：比如筛选栏 -->
        <!-- offset-top: 44px (假设上面的 Tabs 高度是 44px) -->
        <StickyHeader
            :offset-top="44"
            :z-index="98"
            :enable-track="true"
            :track-params="{ moduleId: 'sub_filter' }"
            @track="onTrackEvent"
        >
            <view class="filter-box">
                <text>筛选条件：全部时间</text>
            </view>
        </StickyHeader>

        <!-- 模拟更多内容 -->
        <view class="content-list">
            <view class="list-item" v-for="i in 20" :key="`b-${i}`">内容区块 B - {{ i }}</view>
        </view>
    </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StickyHeader from '@/package/components/hy-sticky/hy-sticky.vue'

// 用于控制样式变化（比如吸顶后加阴影）
const isTabFixed = ref(false)

// 监听吸顶状态改变
const onStickyChange = (isFixed: boolean) => {
    isTabFixed.value = isFixed
}

// 统一埋点处理函数
const onTrackEvent = (data: any) => {
    // 这里是对接真实埋点 SDK 的地方
    // 例如: sensors.track(data.action, data);

    console.log('⚡️ 捕获埋点事件:', data)

    // 模拟发送埋点请求
    // uni.request({ url: '/api/log', data, method: 'POST' });
}
</script>

<style lang="scss">
.page-container {
    height: calc(100vh - 44px);
    background-color: #f5f5f5;
}

.header-banner {
    height: 300rpx;
    background: linear-gradient(135deg, #1890ff, #36cfc9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;

    .title {
        font-size: 40rpx;
        font-weight: bold;
    }
    .subtitle {
        font-size: 28rpx;
        margin-top: 20rpx;
        opacity: 0.8;
    }
}

/* Tabs 样式 */
.tabs-box {
    height: 88rpx; /* 对应 offset-top=0 时的自身高度 */
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
    transition: box-shadow 0.3s;

    &.active-shadow {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        background-color: rgba(255, 255, 255, 0.98); /* 微微透明 */
    }

    .tab-item {
        font-size: 30rpx;
        color: #666;
        position: relative;

        &.active {
            color: #1890ff;
            font-weight: bold;

            &::after {
                content: '';
                position: absolute;
                bottom: -10rpx;
                left: 50%;
                transform: translateX(-50%);
                width: 40rpx;
                height: 4rpx;
                background-color: #1890ff;
                border-radius: 2rpx;
            }
        }
    }
}

/* 二级筛选栏样式 */
.filter-box {
    height: 80rpx;
    background-color: #f0f8ff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    font-size: 26rpx;
    color: #333;
}

.content-list {
    padding: 20rpx;
}

.list-item {
    height: 120rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
}
</style>
