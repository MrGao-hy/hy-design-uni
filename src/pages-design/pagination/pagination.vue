<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-pagination v-model="current" :total="999"></hy-pagination>
        </view>

        <view class="hy-title">{{ t('iconSection') }}</view>
        <view class="hy-container">
            <hy-pagination v-model="current" showIcon :total="12"></hy-pagination>
        </view>

        <view class="hy-title">{{ t('textTip') }}</view>
        <view class="hy-container">
            <hy-pagination v-model="current" showMessage :total="999"></hy-pagination>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分页'
    }
})

const { t } = useTranslate('pagination')
usePageTitle('pagination')

const current = ref(1)

useShareButton()
</script>

<style scoped lang="scss"></style>
