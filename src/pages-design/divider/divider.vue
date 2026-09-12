<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')"></hy-divider>
            <hy-divider text="loadMore"></hy-divider>
            <hy-divider text="loading"></hy-divider>
            <hy-divider text="noMore"></hy-divider>
        </view>

        <view class="hy-title">{{ t('dot') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')" dot></hy-divider>
        </view>

        <view class="hy-title">{{ t('dashed') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')" dashed></hy-divider>
        </view>

        <view class="hy-title">{{ t('thick') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')" :hairline="false"></hy-divider>
        </view>

        <view class="hy-title">{{ t('textPosition') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')" textPosition="left"></hy-divider>
            <hy-divider :text="t('demoText')" textPosition="center"></hy-divider>
            <hy-divider :text="t('demoText')" textPosition="right"></hy-divider>
        </view>

        <view class="hy-title">{{ t('lineColor') }}</view>
        <view class="hy-container">
            <hy-divider :text="t('demoText')" lineColor="red"></hy-divider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分割线'
    }
})

const { t } = useTranslate('divider')
usePageTitle('divider')

useShareButton()
</script>

<style scoped lang="scss"></style>
