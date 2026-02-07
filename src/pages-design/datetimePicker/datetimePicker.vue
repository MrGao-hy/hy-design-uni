<template>
    <the-root-page>
        <view class="hy-title">完整时间</view>
        <view class="hy-container">
            <hy-datetime-picker v-model="value_1" has-input></hy-datetime-picker>
        </view>

        <view class="hy-title">年月日</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_2"
                has-input
                :mode="DateModeEnum.DATE"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">年月</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_3"
                has-input
                :mode="DateModeEnum.YEAR_MONTH"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">月日</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_4"
                has-input
                :mode="DateModeEnum.MONTH_DAY"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">时间</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_5"
                has-input
                :mode="DateModeEnum.TIME"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">小时/分</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_6"
                has-input
                :mode="DateModeEnum.HOUR_MINUTE"
            ></hy-datetime-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DateModeEnum } from '@/package'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '时间选择器'
    }
})

const value_1 = ref('')
const value_2 = ref('')
const value_3 = ref('')
const value_4 = ref('')
const value_5 = ref('10:11')
const value_6 = ref('')

useShareButton()
</script>

<style scoped lang="scss"></style>
