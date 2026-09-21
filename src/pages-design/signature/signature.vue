<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-signature @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">{{ t('customPen') }}</view>
        <view class="hy-container">
            <hy-signature pen-color="red" :lineWidth="5" @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">{{ t('historySection') }}</view>
        <view class="hy-container">
            <hy-signature enableHistory @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">{{ t('landscapeTitle') }}</view>
        <view class="hy-container">
            <hy-button :text="t('goLandscape')" @click="goLandscape"></hy-button>
        </view>

        <view class="hy-title">{{ t('popupSection') }}</view>
        <view class="hy-container">
            <hy-button :text="t('openPopupSign')" @click="onOpen"></hy-button>
        </view>

        <hy-popup :show="showImage" mode="center" closeable @close="showImage = false">
            <hy-image
                :src="imageBase.tempFilePath"
                :width="imageBase.width"
                :height="imageBase.height"
            ></hy-image>
        </hy-popup>

        <hy-popup :show="showPopup" closeable @close="showPopup = false">
            <hy-signature ref="signatureRef" height="400" @confirm="onConfirmImage"></hy-signature>
        </hy-popup>
    </the-root-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import type { ISignatureExpose, SignatureResult } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '签名'
    }
})

const { t } = useTranslate('signature')
usePageTitle('signature')

const signatureRef = ref<ISignatureExpose>()
const showImage = ref(false)
const showPopup = ref(false)
const imageBase = ref<Partial<SignatureResult>>({})

const goLandscape = () => {
    uni.navigateTo({ url: '/pages-design/signature/Landscape' })
}

const onConfirmImage = (temp: SignatureResult) => {
    showImage.value = true
    imageBase.value = temp
}

const onOpen = () => {
    showPopup.value = true
    setTimeout(() => signatureRef.value?.init(), 500)
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-container {
    padding: 0;
}
</style>
