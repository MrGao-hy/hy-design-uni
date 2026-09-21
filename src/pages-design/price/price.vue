<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.234567"></hy-price>
            <hy-price :text="10.1"></hy-price>
            <hy-price :text="0"></hy-price>
            <hy-price :text="100000000"></hy-price>
        </view>

        <view class="hy-title">{{ t('colorSection') }}</view>
        <view class="hy-container">
            <hy-price text="10.22" color="#9CC53D"></hy-price>
        </view>

        <view class="hy-title">{{ t('sizeSection') }}</view>
        <view class="hy-container">
            <hy-price text="10.22" :size="20"></hy-price>
        </view>

        <view class="hy-title">{{ t('decimalSection') }}</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.22234563" :num="0"></hy-price>
            <hy-price text="10" :num="0"></hy-price>
            <hy-price :text="10.22234563" :num="3"></hy-price>
            <hy-price :text="10.23" :num="5"></hy-price>
            <hy-price text="10" :num="6"></hy-price>
        </view>

        <view class="hy-title">{{ t('prefixSection') }}</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.22" symbol="$"></hy-price>
            <hy-price text="10.22" symbol="￥"></hy-price>
            <hy-price text="10.22" :symbol="t('cash')"></hy-price>
        </view>

        <view class="hy-title">{{ t('slantBold') }}</view>
        <view class="hy-container">
            <hy-price text="10.22" :slant="true" :weight="900"></hy-price>
        </view>

        <view class="hy-title">{{ t('ratioSection') }}</view>
        <view class="hy-flex hy-container">
            <hy-price text="10.22" :ratio="1"></hy-price>
            <hy-price text="10.22" :ratio="1.2"></hy-price>
            <hy-price text="10.22"></hy-price>
            <hy-price text="10.22" :ratio="1.6"></hy-price>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '金额'
    }
})

const { t } = useTranslate('price')
usePageTitle('price')

useShareButton()
</script>

<style scoped lang="scss"></style>
