<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input></hy-address-picker>
        </view>

        <view class="hy-title">{{ t('separator') }}</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input separator="/"></hy-address-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '地址选择器'
    }
})

const { t } = useTranslate('addressPicker')
usePageTitle('addressPicker')

const value = ref('')

useShareButton()
</script>

<style scoped lang="scss"></style>
