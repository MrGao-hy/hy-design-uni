<template>
    <view class="test-container">
        <text class="test-title">SwipeAction 组件测试</text>

        <view class="test-section">
            <text class="test-section-title">1. 基本用法 - 右侧滑动</text>
            <SwipeAction
                :right-buttons="rightButtons"
                @swipestart="handleSwipeStart"
                @swipeend="handleSwipeEnd"
                @buttontap="handleButtonTap"
            >
                <view class="test-item">
                    <text>向右滑动查看操作</text>
                </view>
            </SwipeAction>
        </view>

        <view class="test-section">
            <text class="test-section-title">2. 双侧滑动</text>
            <SwipeAction
                :left-buttons="leftButtons"
                :right-buttons="rightButtons"
                @swipestart="handleSwipeStart"
                @swipeend="handleSwipeEnd"
                @buttontap="handleButtonTap"
            >
                <view class="test-item">
                    <text>向左或向右滑动查看操作</text>
                </view>
            </SwipeAction>
        </view>

        <view class="test-section">
            <text class="test-section-title">3. 带确认操作</text>
            <SwipeAction
                :right-buttons="confirmButtons"
                @swipestart="handleSwipeStart"
                @swipeend="handleSwipeEnd"
                @buttontap="handleButtonTap"
            >
                <view class="test-item">
                    <text>向右滑动，点击删除需要确认</text>
                </view>
            </SwipeAction>
        </view>

        <view class="test-section">
            <text class="test-section-title">4. 禁用状态</text>
            <SwipeAction :right-buttons="rightButtons" disabled>
                <view class="test-item">
                    <text>此条目已禁用，无法滑动</text>
                </view>
            </SwipeAction>
        </view>

        <view class="test-section">
            <text class="test-section-title">5. 默认展开</text>
            <SwipeAction
                :right-buttons="rightButtons"
                default-swiped="right"
                @swipestart="handleSwipeStart"
                @swipeend="handleSwipeEnd"
                @buttontap="handleButtonTap"
            >
                <view class="test-item">
                    <text>默认向右展开</text>
                </view>
            </SwipeAction>
        </view>

        <view class="test-log">
            <text class="test-log-title">事件日志：</text>
            <text v-for="(log, index) in logs" :key="index" class="test-log-item">
                {{ log }}
            </text>
        </view>
    </view>
</template>

<script setup lang="ts">
import SwipeAction from '@/components/TheTest.vue'
import { ref } from 'vue'

const logs = ref<string[]>([])

const rightButtons = [
    {
        text: '编辑',
        color: '#fff',
        bgColor: '#1890ff'
    },
    {
        text: '删除',
        color: '#fff',
        bgColor: '#ff4d4f'
    }
]

const leftButtons = [
    {
        text: '置顶',
        color: '#fff',
        bgColor: '#52c41a'
    },
    {
        text: '标记',
        color: '#fff',
        bgColor: '#faad14'
    }
]

const confirmButtons = [
    {
        text: '编辑',
        color: '#fff',
        bgColor: '#1890ff'
    },
    {
        text: '删除',
        color: '#fff',
        bgColor: '#ff4d4f',
        confirmType: 'tap',
        confirmText: '确认删除?'
    }
]

const addLog = (message: string) => {
    logs.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
    if (logs.value.length > 10) {
        logs.value.pop()
    }
}

const handleSwipeStart = (data: any) => {
    addLog(`swipestart: ${JSON.stringify(data)}`)
}

const handleSwipeEnd = (data: any) => {
    addLog(`swipeend: ${JSON.stringify(data)}`)
}

const handleButtonTap = (data: any) => {
    addLog(`buttontap: ${JSON.stringify(data)}`)
}
</script>

<style scoped>
.test-container {
    padding: 20rpx;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.test-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    text-align: center;
}

.test-section {
    margin-bottom: 30rpx;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.test-section-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #666;
    margin-bottom: 20rpx;
}

.test-item {
    padding: 30rpx;
    background-color: #fafafa;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #333;
}

.test-log {
    margin-top: 40rpx;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    max-height: 400rpx;
    overflow-y: auto;
}

.test-log-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #666;
    margin-bottom: 15rpx;
    display: block;
}

.test-log-item {
    font-size: 24rpx;
    color: #999;
    line-height: 40rpx;
    display: block;
    word-break: break-all;
}
</style>
