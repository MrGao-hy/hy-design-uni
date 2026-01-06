<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <!-- 头部占位 -->
        <view class="header-banner">
            <text class="title">首页 Banner</text>
            <text class="subtitle">上滑查看吸顶效果</text>
        </view>

        <!-- 1. 基础吸顶：比如分类 Tabs -->
        <!-- offset-top: 0 表示吸附在最顶端 -->
        <hy-sticky :offset-top="offsetTop1" :duration="200" @change="onStickyChange">
            <view class="tabs-box" :class="{ 'active-shadow': isTabFixed }">
                <view class="tab-item active">推荐</view>
                <view class="tab-item">热门</view>
                <view class="tab-item">最新</view>
                <view class="tab-item">视频</view>
            </view>
        </hy-sticky>

        <!-- 模拟长列表内容 -->
        <view class="content-list">
            <view class="list-item" v-for="i in 10" :key="`a-${i}`">内容区块 A - {{ i }}</view>
        </view>

        <!-- 2. 二级吸顶：比如筛选栏 -->
        <!--         offset-top: 44px (假设上面的 Tabs 高度是 44px) -->
        <hy-sticky :offset-top="offsetTop2">
            <view class="filter-box">
                <text>筛选条件：全部时间</text>
            </view>
        </hy-sticky>

        <!-- 模拟更多内容 -->
        <view class="content-list">
            <view class="list-item" v-for="i in 20" :key="`b-${i}`">内容区块 B - {{ i }}</view>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import HySticky from '@/package/components/hy-sticky/hy-sticky.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
// 用于控制样式变化（比如吸顶后加阴影）
const isTabFixed = ref(false)
let offsetTop1: Ref<number>
// #ifndef H5
offsetTop1 = ref(0)
// #endif
// #ifdef H5
offsetTop1 = ref(44)
// #endif

let offsetTop2: Ref<number>
// #ifndef H5
offsetTop2 = ref(44)
// #endif
// #ifdef H5
offsetTop2 = ref(88)
// #endif

// 监听吸顶状态改变
const onStickyChange = (isFixed: boolean) => {
    isTabFixed.value = isFixed
    uni.showToast({ title: `⚡️ 捕获埋点事件:${isFixed}`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
.hy-theme--dark {
    .filter-box {
        background-color: #0f1a25;
    }
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
    background-color: $hy-background--container;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: $hy-border-line;
    transition: box-shadow 0.3s;

    &.active-shadow {
        box-shadow: $hy-box-shadow;
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
    color: $hy-text-color--grey;
}

.content-list {
    padding: 20rpx;
}

.list-item {
    height: 120rpx;
    background-color: $hy-background--container;
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
}
</style>
