<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-tooltip text="复制内容">
                <text class="tooltip-text">长按复制</text>
            </hy-tooltip>
        </view>

        <!-- 触发模式 -->
        <view class="hy-title">触发模式</view>
        <view class="hy-container hy-flex">
            <hy-tooltip text="长按触发" triggerMode="longpress">
                <text class="tooltip-text">长按我</text>
            </hy-tooltip>
            <hy-tooltip text="点击触发" triggerMode="click">
                <text class="tooltip-text">点击我</text>
            </hy-tooltip>
        </view>

        <!-- 弹出位置 -->
        <view class="hy-title">弹出位置</view>
        <view class="hy-container position-demo">
            <view class="position-row">
                <hy-tooltip text="top" placement="top">
                    <text class="position-btn">上</text>
                </hy-tooltip>
            </view>
            <view class="position-row">
                <hy-tooltip text="left" placement="left">
                    <text class="position-btn">左</text>
                </hy-tooltip>
                <hy-tooltip text="bottom" placement="bottom">
                    <text class="position-btn">下</text>
                </hy-tooltip>
                <hy-tooltip text="right" placement="right">
                    <text class="position-btn">右</text>
                </hy-tooltip>
            </view>
        </view>

        <!-- 复制功能 -->
        <view class="hy-title">复制功能</view>
        <view class="hy-container">
            <hy-tooltip text="复制文本" @click="onCopyClick">
                <text class="tooltip-text">复制显示文本</text>
            </hy-tooltip>
        </view>

        <!-- 扩展按钮 -->
        <view class="hy-title">扩展按钮</view>
        <view class="hy-container grid">
            <hy-tooltip text="操作" :buttons="['收藏']" @click="onClick">
                <text class="tooltip-text">单个扩展按钮</text>
            </hy-tooltip>
            <hy-tooltip
                text="操作"
                :buttons="['收藏', '分享']"
                placement="bottom-start"
                @click="onClick"
            >
                <text class="tooltip-text">多个扩展按钮</text>
            </hy-tooltip>
            <hy-tooltip text="操作" :buttons="['编辑', '删除']" :showCopy="false" @click="onClick">
                <text class="tooltip-text">仅扩展按钮</text>
            </hy-tooltip>
        </view>

        <!-- 自定义样式 -->
        <view class="hy-title">自定义样式</view>
        <view class="hy-container">
            <hy-tooltip text="高亮文本" bgColor="#e3e4e6">
                <text class="tooltip-text">高亮背景色</text>
            </hy-tooltip>
            <hy-tooltip text="红色粗体" color="red" size="30" bold>
                <text class="tooltip-text">改变字体样式</text>
            </hy-tooltip>
            <hy-tooltip
                text="自定义样式"
                :customStyle="{ padding: '20rpx 40rpx', borderRadius: '12rpx' }"
                customClass="custom-tooltip"
            >
                <text class="tooltip-text">自定义外部样式</text>
            </hy-tooltip>
        </view>

        <!-- 遮罩层 -->
        <view class="hy-title">遮罩层</view>
        <view class="hy-container hy-flex">
            <hy-tooltip text="显示遮罩层（禁止触摸穿透）" :overlay="false">
                <text class="tooltip-text">禁止触摸</text>
            </hy-tooltip>
            <hy-tooltip text="不显示遮罩层（允许触摸穿透）" :overlay="true">
                <text class="tooltip-text">允许触摸</text>
            </hy-tooltip>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '长按提示'
    }
})

const messages = ref([
    { avatar: '张', title: '张三', content: '这是一条重要消息，请查收', time: '10:30' },
    { avatar: '李', title: '李四', content: '会议时间已变更为下午3点', time: '11:45' },
    { avatar: '王', title: '王五', content: '附件已更新，请重新下载', time: '14:20' }
])

const onClick = (index: number) => {
    const actions = ['复制', '收藏', '分享', '举报', '编辑', '删除']
    uni.showToast({ title: `点击了「${actions[index]}」`, icon: 'none' })
}

const onCopyClick = (index: number) => {
    if (index === 0) {
        uni.showToast({ title: '复制成功', icon: 'success' })
    }
}

const handleMessageAction = (messageIndex: number, actionIndex: number) => {
    const actions = ['复制', '转发', '删除']
    const message = messages.value[messageIndex]
    uni.showToast({
        title: `${actions[actionIndex]}: ${message.title}的消息`,
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
