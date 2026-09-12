<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-image :src="config.avatar"></hy-image>
        </view>

        <view class="hy-title">{{ t('sizeSection') }}</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" width="50px" height="50px"></hy-image>
        </view>

        <view class="hy-title">{{ t('previewSection') }}</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" preview-image></hy-image>
        </view>

        <view class="hy-title">{{ t('indistinctSection') }}</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" :indistinct="true"></hy-image>
        </view>

        <view class="hy-title">{{ t('loadErrorSection') }}</view>
        <view class="hy-container">
            <hy-image src="http://127.0.0.1:8080/685b54c8cb8da5c86d0d4c.png"></hy-image>
        </view>

        <view class="hy-title">{{ t('circleSection') }}</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" width="100px" height="100px" shape="circle"></hy-image>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { config } from '@/config/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '图片'
    }
})

const { t } = useTranslate('image')
usePageTitle('image')

useShareButton()
</script>

<style scoped lang="scss"></style>
