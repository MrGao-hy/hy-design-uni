<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value"></hy-rate>
        </view>

        <view class="hy-title">{{ t('gutter') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value" :gutter="20"></hy-rate>
        </view>

        <view class="hy-title">{{ t('size') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value" :size="10"></hy-rate>
            <view style="height: 20px"></view>
            <hy-rate v-model="value" :size="30"></hy-rate>
        </view>

        <view class="hy-title">{{ t('customColor') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value" inactiveColor="green" activeColor="red"></hy-rate>
        </view>

        <view class="hy-title">{{ t('useImage') }}</view>
        <view class="hy-container">
            <hy-rate
                v-model="value"
                activeIcon="/src/pages-design/z_static/images/activeIcon.jpg"
                inactiveIcon="/src/pages-design/z_static/images/inactiveIcon.jpg"
            ></hy-rate>
        </view>

        <view class="hy-title">{{ t('maxCount') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value" :count="10"></hy-rate>
        </view>

        <view class="hy-title">{{ t('allowHalf') }}</view>
        <view class="hy-container">
            <hy-rate v-model="value" allowHalf></hy-rate>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '评分'
    }
})

const { t } = useTranslate('rate')
usePageTitle('rate')

const value = ref(3)

useShareButton()
</script>

<style scoped lang="scss"></style>
