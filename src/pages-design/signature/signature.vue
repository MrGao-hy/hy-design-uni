<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-signature @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">自定义画笔</view>
        <view class="hy-container">
            <hy-signature pen-color="red" :lineWidth="5" @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">历史记录操作</view>
        <view class="hy-container">
            <hy-signature enableHistory @confirm="onConfirmImage"></hy-signature>
        </view>

        <view class="hy-title">横向签名</view>
        <view class="hy-container">
            <hy-button text="点击横向签名" @click="goLandscape"></hy-button>
        </view>

        <view class="hy-title">弹窗签名</view>
        <view class="hy-container">
            <hy-button text="点击打开弹窗签名" @click="onOpen"></hy-button>
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
import { useShareButton } from '@/composables'
import type { ISignatureExpose, SignatureResult } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '签名'
    }
})

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
