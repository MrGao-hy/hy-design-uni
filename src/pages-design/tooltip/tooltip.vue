<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-tooltip :text="t('copyContent')">
                <text class="tooltip-text">{{ t('longpressCopy') }}</text>
            </hy-tooltip>
        </view>

        <!-- 触发模式 -->
        <view class="hy-title">{{ t('triggerMode') }}</view>
        <view class="hy-container hy-flex">
            <hy-tooltip :text="t('longpressTrigger')" triggerMode="longpress">
                <text class="tooltip-text">{{ t('pressMe') }}</text>
            </hy-tooltip>
            <hy-tooltip :text="t('clickTrigger')" triggerMode="click">
                <text class="tooltip-text">{{ t('clickMe') }}</text>
            </hy-tooltip>
        </view>

        <!-- 弹出位置 -->
        <view class="hy-title">{{ t('placement') }}</view>
        <view class="hy-container position-demo">
            <view class="position-row">
                <hy-tooltip text="top" placement="top">
                    <text class="position-btn">{{ t('posTop') }}</text>
                </hy-tooltip>
            </view>
            <view class="position-row">
                <hy-tooltip text="left" placement="left">
                    <text class="position-btn">{{ t('posLeft') }}</text>
                </hy-tooltip>
                <hy-tooltip text="bottom" placement="bottom">
                    <text class="position-btn">{{ t('posBottom') }}</text>
                </hy-tooltip>
                <hy-tooltip text="right" placement="right">
                    <text class="position-btn">{{ t('posRight') }}</text>
                </hy-tooltip>
            </view>
        </view>

        <!-- 复制功能 -->
        <view class="hy-title">{{ t('copyFeature') }}</view>
        <view class="hy-container">
            <hy-tooltip :text="t('copyText')" @click="onCopyClick">
                <text class="tooltip-text">{{ t('copyDisplay') }}</text>
            </hy-tooltip>
        </view>

        <!-- 扩展按钮 -->
        <view class="hy-title">{{ t('extButtons') }}</view>
        <view class="hy-container grid">
            <hy-tooltip :text="t('action')" :buttons="[t('favorite')]" @click="onClick">
                <text class="tooltip-text">{{ t('singleExtBtn') }}</text>
            </hy-tooltip>
            <hy-tooltip :text="t('action')" :buttons="[t('favorite'), t('share')]" @click="onClick">
                <text class="tooltip-text">{{ t('multiExtBtn') }}</text>
            </hy-tooltip>
            <hy-tooltip
                :text="t('action')"
                :buttons="[t('edit'), t('delete')]"
                :showCopy="false"
                @click="onClick"
            >
                <text class="tooltip-text">{{ t('onlyExtBtn') }}</text>
            </hy-tooltip>
        </view>

        <!-- 自定义样式 -->
        <view class="hy-title">{{ t('customStyle') }}</view>
        <view class="hy-container">
            <hy-tooltip :text="t('highlightText')" bgColor="#e3e4e6">
                <text class="tooltip-text">{{ t('highlightBg') }}</text>
            </hy-tooltip>
            <hy-tooltip :text="t('redBold')" color="red" size="30" bold>
                <text class="tooltip-text">{{ t('changeFont') }}</text>
            </hy-tooltip>
            <hy-tooltip
                :text="t('customStyle')"
                :customStyle="{ padding: '20rpx 40rpx', borderRadius: '12rpx' }"
                customClass="custom-tooltip"
            >
                <text class="tooltip-text">{{ t('customOuter') }}</text>
            </hy-tooltip>
        </view>

        <!-- 遮罩层 -->
        <view class="hy-title">{{ t('overlaySection') }}</view>
        <view class="hy-container hy-flex">
            <hy-tooltip :text="t('showOverlayText')" :overlay="false">
                <text class="tooltip-text">{{ t('forbidTouch') }}</text>
            </hy-tooltip>
            <hy-tooltip :text="t('hideOverlayText')" :overlay="true">
                <text class="tooltip-text">{{ t('allowTouch') }}</text>
            </hy-tooltip>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '长按提示'
    }
})

const { t } = useTranslate('tooltip')
usePageTitle('tooltip')

// 消息列表数据（computed 包裹以响应语言切换）
const messages = computed(() => [
    {
        avatar: t('avatarZhang'),
        title: t('zhangSan'),
        content: t('msg1'),
        time: '10:30'
    },
    {
        avatar: t('avatarLi'),
        title: t('liSi'),
        content: t('msg2'),
        time: '11:45'
    },
    {
        avatar: t('avatarWang'),
        title: t('wangWu'),
        content: t('msg3'),
        time: '14:20'
    }
])

const onClick = (index: number) => {
    const actions = [t('copy'), t('favorite'), t('share'), t('report'), t('edit'), t('delete')]
    uni.showToast({ title: t('clicked', actions[index]), icon: 'none' })
}

const onCopyClick = (index: number) => {
    if (index === 0) {
        uni.showToast({ title: t('copySuccess'), icon: 'success' })
    }
}

const handleMessageAction = (messageIndex: number, actionIndex: number) => {
    const actions = [t('copy'), t('forward'), t('delete')]
    const message = messages.value[messageIndex]
    uni.showToast({
        title: `${actions[actionIndex]}: ${t('messageOf', message.title)}`,
        icon: 'none'
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.tooltip-text {
    color: #2979ff;
    font-size: 28rpx;
}

.position-demo {
    padding: 30rpx;
    border-radius: 16rpx;
}

.position-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30rpx;

    &:last-child {
        margin-bottom: 0;
    }
}

.position-btn {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $hy-background--track;
    border-radius: 50%;
    font-size: 28rpx;
    margin: 0 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.custom-tooltip {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff !important;
}

.grid {
    display: grid;
    gap: 20px;
}
</style>
