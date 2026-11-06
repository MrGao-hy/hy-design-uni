<template>
    <view class="hy-title">{{ t('basicUsage') }}</view>
    <view class="hy-container">
        <hy-code-input
            v-model="value"
            :dot="dot"
            :bold="bold"
            :hairline="hairline"
            :focus="focus"
            mode="box"
            :space="space"
        ></hy-code-input>
    </view>

    <view class="hy-title">{{ t('keyboardLink') }}</view>
    <view class="hy-container">
        <hy-code-input
            ref="codeInputRef"
            v-model="keyboardValue"
            disabled-keyboard
            :maxlength="6"
            mode="box"
            @finish="showKeyboard = false"
            @focus="handleOpenKeyboard"
        ></hy-code-input>
        <view class="hy-tip">{{ t('keyboardTip') }}</view>
    </view>

    <view class="hy-title">{{ t('lineMode') }}</view>
    <view class="hy-container">
        <hy-code-input
            v-model="value_1"
            :dot="dot"
            :bold="bold"
            :hairline="hairline"
            :focus="focus"
            mode="line"
            :space="space"
        ></hy-code-input>
    </view>

    <view class="hy-title">{{ t('colorSection') }}</view>
    <view class="hy-container">
        <hy-code-input
            v-model="value_1"
            :dot="dot"
            color="red"
            border-color="green"
            :bold="bold"
            :hairline="hairline"
            :focus="focus"
            mode="box"
            :space="space"
        ></hy-code-input>
    </view>

    <view class="hy-title">{{ t('noBorder') }}</view>
    <view class="hy-container">
        <hy-code-input v-model="value_1" :border="false" size="50"></hy-code-input>
    </view>

    <view class="hy-title">{{ t('customLength') }}</view>
    <view class="hy-container">
        <hy-code-input v-model="value_2" :maxlength="4"></hy-code-input>
    </view>

    <hy-keyboard
        v-model:show="showKeyboard"
        mode="default"
        v-model="keyboardValue"
        :maxlength="6"
        :show-dot-key="false"
        :close-text="t('done')"
        @close="handleCloseKeyboard"
    >
        <!-- 模拟系统键盘的验证码自动填充建议条：唤起键盘时读取剪贴板，点击一键填充 -->
        <template #title>
            <view v-if="clipboardCode" class="hy-code-suggestion" @click="handleFillCode">
                <hy-icon name="message" size="14"></hy-icon>
                <text class="hy-code-suggestion__label">{{ t('clipboardCode') }}</text>
                <text class="hy-code-suggestion__code">{{ clipboardCode }}</text>
                <text class="hy-code-suggestion__fill">{{ t('fillCode') }}</text>
            </view>
        </template>
    </hy-keyboard>

    <view class="hy-setting__box">
        <view class="hy-title">{{ t('charSpace') }}</view>
        <hy-slider v-model="space" :min="0" :max="20" />

        <view class="hy-title">{{ t('showDot') }}</view>
        <hy-switch v-model="dot"></hy-switch>

        <view class="hy-title">{{ t('boldText') }}</view>
        <hy-switch v-model="bold"></hy-switch>

        <view class="hy-title">{{ t('hairlineBorder') }}</view>
        <hy-switch v-model="hairline"></hy-switch>

        <view class="hy-title">{{ t('autoFocus') }}</view>
        <hy-switch v-model="focus"></hy-switch>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '验证码输入'
    }
})

const { t } = useTranslate('codeInput')
usePageTitle('codeInput')

const value = ref('')
const value_1 = ref('123')
const value_2 = ref('')
const keyboardValue = ref('')
const clipboardCode = ref('')
const dot = ref(false)
const bold = ref(false)
const hairline = ref(false)
const focus = ref(false)
const space = ref(10)
const showKeyboard = ref(false)
const codeInputRef = ref()

/**
 * 唤起自定义键盘，同时尝试读取剪贴板中的验证码
 * 模拟真实 App 收到短信验证码后在键盘上方出现的自动填充建议
 */
const handleOpenKeyboard = () => {
    showKeyboard.value = true
    uni.getClipboardData({
        success: (res) => {
            // 剔除非数字字符后截取前6位，如“您的验证码是123456，请勿泄露” -> "123456"
            const code = String(res.data || '')
                .replace(/\D/g, '')
                .slice(0, 6)
            // 已填充过同一验证码时不再重复显示建议条
            clipboardCode.value = code && code !== keyboardValue.value ? code : ''
        },
        fail: () => {
            clipboardCode.value = ''
        }
    })
}

/**
 * 关闭自定义键盘时同步模拟失焦，避免聚焦高亮残留
 * */
const handleCloseKeyboard = () => {
    showKeyboard.value = false
    codeInputRef.value?.blur()
}

/**
 * 点击建议条一键填充验证码并收起键盘
 * */
const handleFillCode = () => {
    keyboardValue.value = clipboardCode.value
    clipboardCode.value = ''
    showKeyboard.value = false
    // 同步模拟失焦，避免聚焦高亮残留
    codeInputRef.value?.blur()
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-tip {
    margin-top: 20rpx;
    font-size: var(--hy-font-size-sm, 24rpx);
    color: var(--hy-info, #909399);
}

/* 验证码自动填充建议条（位于键盘头部，白底胶囊+轻阴影，参考系统键盘的短信验证码填充建议） */
.hy-code-suggestion {
    display: flex;
    align-items: center;
    margin: 16rpx 24rpx 0;
    padding: 14rpx 24rpx;
    border-radius: var(--hy-radius-semicircle, 100px);
    background-color: var(--hy-background--2, #ffffff);
    box-shadow: var(--hy-shadow-sm, 0 2rpx 8rpx rgba(0, 0, 0, 0.06));

    &__label {
        margin-left: 10rpx;
        font-size: var(--hy-font-size-sm, 24rpx);
        color: var(--hy-info, #909399);
    }

    &__code {
        margin: 0 16rpx;
        font-size: var(--hy-font-size-base, 28rpx);
        font-weight: var(--hy-font-weight-bold, 600);
        letter-spacing: 4rpx;
        color: var(--hy-theme-color, #2979ff);
    }

    &__fill {
        margin-left: auto;
        font-size: var(--hy-font-size-sm, 24rpx);
        color: var(--hy-theme-color, #2979ff);
    }
}
</style>
