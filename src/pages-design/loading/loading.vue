<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-loading></hy-loading>
        </view>

        <view class="hy-title">{{ t('circleSection') }}</view>
        <view class="hy-container">
            <hy-loading mode="circle"></hy-loading>
        </view>

        <view class="hy-title">{{ t('semicircleSection') }}</view>
        <view class="hy-container">
            <hy-loading mode="semicircle"></hy-loading>
        </view>

        <view class="hy-title">{{ t('moreSection') }}</view>
        <view class="hy-flex hy-container">
            <hy-loading mode="dots"></hy-loading>
            <hy-loading mode="bars"></hy-loading>
        </view>

        <view class="hy-title">{{ t('customColorSection') }}</view>
        <view class="hy-flex hy-container">
            <hy-loading mode="circle" color="#19be6b"></hy-loading>
            <hy-loading mode="spinner" color="#19be6b"></hy-loading>
        </view>

        <view class="hy-title">{{ t('customTextSection') }}</view>
        <view class="hy-container hy-flex">
            <hy-loading mode="circle" :text="t('loadingText')" direction="column"></hy-loading>
            <hy-loading mode="circle" :text="t('loadingText')" direction="row"></hy-loading>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '加载中'
    }
})

const { t } = useTranslate('loading')
usePageTitle('loading')

useShareButton()
</script>

<style scoped lang="scss"></style>
