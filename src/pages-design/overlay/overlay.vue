<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-button type="primary" @click="show = !show">{{ t('openMask') }}</hy-button>
            <hy-popup v-model:show="show" mode="right" :overlay-opacity="opacity">
                <view class="hy-setting__box">
                    <view class="hy-title">{{ t('opacity') }}</view>
                    <hy-slider v-model="opacity" :min="0" :max="1" :step="0.1" />
                </view>
            </hy-popup>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '遮罩层'
    }
})

const { t } = useTranslate('overlay')
usePageTitle('overlay')

const show = ref(false)
const opacity = ref(0.5)

useShareButton()
</script>

<style scoped lang="scss">
.hy-setting__box {
    width: 300px;
}
</style>
