<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
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
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HySignature from '@/package/components/hy-signature/hy-signature.vue'
import HyPopup from '../../package/components/hy-popup/hy-popup.vue'
import HyImage from '../../package/components/hy-image/hy-image.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import type { SignatureResult } from '@/package/components/hy-signature/typing'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '签名'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
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
