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

        <hy-popup :show="showImage" mode="center" closeable @close="showImage = false">
            <hy-image
                :src="imageBase.tempFilePath"
                :width="imageBase.width"
                :height="imageBase.height"
            ></hy-image>
        </hy-popup>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SignatureResult } from '@/package/components/hy-signature/typing'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '签名'
    }
})

const showImage = ref(false)
const imageBase = ref<Partial<SignatureResult>>({})

const onConfirmImage = (temp: SignatureResult) => {
    showImage.value = true
    imageBase.value = temp
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-container {
    padding: 0;
}
</style>
