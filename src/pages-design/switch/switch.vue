<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <hy-switch v-model="value"></hy-switch>

        <view class="hy-title">{{ t('disabled') }}</view>
        <hy-switch v-model="value" disabled></hy-switch>

        <view class="hy-title">{{ t('loading') }}</view>
        <hy-switch v-model="value" loading></hy-switch>

        <view class="hy-title">{{ t('customColor') }}</view>
        <hy-switch v-model="value" active-color="red" inactiveColor="black"></hy-switch>

        <view class="hy-title">{{ t('customSize') }}</view>
        <view class="hy-flex">
            <hy-switch v-model="value" size="small"></hy-switch>
            <hy-switch v-model="value" size="medium"></hy-switch>
            <hy-switch v-model="value" size="large"></hy-switch>
        </view>

        <view class="hy-title">{{ t('customIcon') }}</view>
        <hy-switch
            v-model="value"
            icon-color="red"
            :active-icon="IconConfig.SUCCESS"
            :inactive-icon="IconConfig.CLOSE"
        ></hy-switch>

        <view class="hy-title">{{ t('customSlot') }}</view>
        <hy-switch v-model="value">
            <view style="font-size: 16rpx">{{ t('disabled') }}</view>
        </hy-switch>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '开关选择器'
    }
})

const { t } = useTranslate('switch')
usePageTitle('switch')

const value = ref(true)

useShareButton()
</script>

<style scoped lang="scss"></style>
