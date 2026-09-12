<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-line></hy-line>
        </view>

        <view class="hy-title">{{ t('customColor') }}</view>
        <view class="hy-container">
            <hy-line color="red"></hy-line>
        </view>

        <view class="hy-title">{{ t('vertical') }}</view>
        <view class="hy-container">
            <hy-line direction="column" length="100" color="red"></hy-line>
        </view>

        <view class="hy-title">{{ t('dashed') }}</view>
        <view class="hy-container">
            <hy-line dashed color="red"></hy-line>
        </view>

        <view class="hy-title">{{ t('thick') }}</view>
        <view class="hy-container">
            <hy-line :hairline="false" color="red"></hy-line>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '线条'
    }
})

const { t } = useTranslate('line')
usePageTitle('line')

useShareButton()
</script>

<style scoped lang="scss"></style>
