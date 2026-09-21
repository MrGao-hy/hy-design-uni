<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-qrcode text="我是文本111"></hy-qrcode>
        </view>

        <view class="hy-title">{{ t('asyncSection') }}</view>
        <view class="hy-container">
            <hy-qrcode :show="showCode" cid="qrcode_2" :text="textContent"></hy-qrcode>
        </view>

        <view class="hy-title">{{ t('logoSection') }}</view>
        <view class="hy-container">
            <hy-qrcode
                cid="qrcode_3"
                text="https://www.hy-design-uni.top"
                icon="../../static/hy_logo_light.png"
            ></hy-qrcode>
        </view>

        <view class="hy-title">{{ t('previewSection') }}</view>
        <view class="hy-container">
            <hy-qrcode cid="qrcode_4" text="https://www.hy-design-uni.top" allowPreview></hy-qrcode>
        </view>

        <view class="hy-title">{{ t('customColor') }}</view>
        <view class="hy-container">
            <hy-qrcode
                cid="qrcode_5"
                :text="t('promoText')"
                background="red"
                foreground="green"
                pdGround="blue"
            ></hy-qrcode>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '二维码'
    }
})

const { t } = useTranslate('qrcode')
usePageTitle('qrcode')

const showCode = ref(false)
const textContent = ref('')

setTimeout(() => {
    showCode.value = true
    textContent.value = 'https://www.hy-design-uni.top'
}, 3000)

useShareButton()
</script>

<style scoped lang="scss"></style>
