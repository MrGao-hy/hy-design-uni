<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
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

        <view class="hy-title">线形模块</view>
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

        <view class="hy-title">颜色</view>
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

        <view class="hy-title">无边框</view>
        <view class="hy-container">
            <hy-code-input v-model="value_1" :border="false" size="50"></hy-code-input>
        </view>

        <view class="hy-title">自定义长度</view>
        <view class="hy-container">
            <hy-code-input v-model="value_2" :maxlength="4"></hy-code-input>
        </view>

        <view class="hy-title">与键盘联动</view>
        <view class="hy-container">
            <hy-code-input
                v-model="keyboardValue"
                mode="box"
                @finish="showKeyboard = false"
                @focus="showKeyboard = true"
            ></hy-code-input>
            <view class="hy-tip">点击输入框即可打开自定义键盘</view>
        </view>
        {{ keyboardValue }}

        <hy-keyboard
            v-model:show="showKeyboard"
            mode="default"
            v-model="keyboardValue"
            :show-dot-key="false"
            close-text="完成"
            @input="handleKeyboardInput"
            @delete="handleKeyboardDelete"
            @close="showKeyboard = false"
        ></hy-keyboard>

        <view class="hy-setting__box">
            <view class="hy-title">字符距离</view>
            <hy-slider v-model="space" :min="0" :max="20" />

            <view class="hy-title">显示点</view>
            <hy-switch v-model="dot"></hy-switch>

            <view class="hy-title">字体加粗</view>
            <hy-switch v-model="bold"></hy-switch>

            <view class="hy-title">细边框</view>
            <hy-switch v-model="hairline"></hy-switch>

            <view class="hy-title">自动获取焦点</view>
            <hy-switch v-model="focus"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '验证码输入'
    }
})

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
