<template>
    <the-root-page>
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

        <view class="hy-title">{{ t('keyboardLink') }}</view>
        <view class="hy-container">
            <hy-code-input
                v-model="keyboardValue"
                mode="box"
                @finish="showKeyboard = false"
                @focus="showKeyboard = true"
            ></hy-code-input>
            <view class="hy-tip">{{ t('keyboardTip') }}</view>
        </view>

        <hy-keyboard
            v-model:show="showKeyboard"
            mode="default"
            v-model="keyboardValue"
            :show-dot-key="false"
            :close-text="t('done')"
            @input="handleKeyboardInput"
            @delete="handleKeyboardDelete"
            @close="showKeyboard = false"
        ></hy-keyboard>

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
    </the-root-page>
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
const dot = ref(false)
const bold = ref(false)
const hairline = ref(false)
const focus = ref(false)
const space = ref(10)
const showKeyboard = ref(false)

const handleKeyboardInput = (value: string) => {
    console.log('键盘输入:', value)
}

const handleKeyboardDelete = () => {
    console.log('键盘删除')
}

useShareButton()
</script>

<style scoped lang="scss"></style>
