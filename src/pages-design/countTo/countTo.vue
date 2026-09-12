<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-count-to :startVal="30" :endVal="500"></hy-count-to>
        </view>

        <view class="hy-title">{{ t('showDecimals') }}</view>
        <view class="hy-container">
            <hy-count-to :endVal="1542221" :decimals="2"></hy-count-to>
        </view>

        <view class="hy-title">{{ t('thousandSeparator') }}</view>
        <view class="hy-container">
            <hy-count-to :endVal="1542221" separator=","></hy-count-to>
        </view>

        <view class="hy-title">{{ t('scrollDuration') }}</view>
        <view class="hy-container">
            <hy-count-to :endVal="1542" :duration="10000"></hy-count-to>
        </view>

        <view class="hy-title">{{ t('fontSetting') }}</view>
        <view class="hy-container">
            <hy-count-to :endVal="1542" bold fontSize="40" color="#31E749"></hy-count-to>
        </view>

        <view class="hy-title">{{ t('manualControl') }}</view>
        <view class="hy-container">
            <hy-count-to
                ref="countToRef"
                :endVal="1542222"
                :duration="10000"
                :autoplay="false"
            ></hy-count-to>
            <view class="hy-flex">
                <hy-button :text="t('start')" type="success" @click="start"></hy-button>
                <hy-button :text="t('pause')" type="error" @click="pause"></hy-button>
                <hy-button :text="t('resume')" type="info" @click="resume"></hy-button>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import HyCountTo from '@/package/components/hy-count-to/hy-count-to.vue'
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '数字滚动'
    }
})

const { t } = useTranslate('countTo')
usePageTitle('countTo')

const countToRef = ref<InstanceType<typeof HyCountTo>>()

// methods
const start = () => {
    if (countToRef.value) {
        countToRef.value.start()
    }
}

const pause = () => {
    if (countToRef.value) {
        countToRef.value.stop()
    }
}

const resume = () => {
    if (countToRef.value) {
        countToRef.value.resume()
    }
}

useShareButton()
</script>

<style scoped lang="scss"></style>
