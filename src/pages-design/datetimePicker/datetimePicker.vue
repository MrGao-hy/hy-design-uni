<template>
    <the-root-page>
        <view class="hy-title">{{ t('fullDatetime') }}</view>
        <view class="hy-container">
            <hy-datetime-picker v-model="value_1" has-input></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('dateOnly') }}</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_2"
                has-input
                :mode="DateModeEnum.DATE"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('yearMonth') }}</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_3"
                has-input
                :mode="DateModeEnum.YEAR_MONTH"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('monthDay') }}</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_4"
                has-input
                :mode="DateModeEnum.MONTH_DAY"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('timeOnly') }}</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_5"
                has-input
                :mode="DateModeEnum.TIME"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('hourMinute') }}</view>
        <view class="hy-container">
            <hy-datetime-picker
                v-model="value_6"
                has-input
                :mode="DateModeEnum.HOUR_MINUTE"
            ></hy-datetime-picker>
        </view>

        <view class="hy-title">{{ t('buttonSection') }}</view>
        <view class="hy-container">
            <hy-button @click="showPicker = true" :text="value_7 || t('selectDate')"></hy-button>
            <hy-datetime-picker
                v-model="value_7"
                v-model:show="showPicker"
                :mode="DateModeEnum.DATE"
            ></hy-datetime-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DateModeEnum } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import TheRootPage from '@/components/the-root-page.vue'

definePage({
    style: {
        navigationBarTitleText: '时间选择器'
    }
})

const { t } = useTranslate('datetimePicker')
usePageTitle('datetimePicker')

const value_1 = ref('')
const value_2 = ref('')
const value_3 = ref('')
const value_4 = ref('')
const value_5 = ref('10:11')
const value_6 = ref('')
const value_7 = ref('')
const showPicker = ref(false)

useShareButton()
</script>

<style scoped lang="scss"></style>
