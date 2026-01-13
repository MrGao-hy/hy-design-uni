<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-textarea
                v-model="value"
                :disabled="disabled"
                :count="count"
                selectionEnd="10"
                :auto-height="autoHeight"
            ></hy-textarea>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">自动增加高度</view>
            <hy-switch v-model="autoHeight"></hy-switch>

            <view class="hy-title">显示统计字数</view>
            <hy-switch v-model="count"></hy-switch>

            <view class="hy-title">禁用</view>
            <hy-switch v-model="disabled"></hy-switch>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyTextarea from '../../package/components/hy-textarea/hy-textarea.vue'
import { ref } from 'vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本域'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const value = ref('')
const autoHeight = ref(false)
const count = ref(false)
const disabled = ref(false)

useShareButton()
</script>

<style scoped lang="scss"></style>
