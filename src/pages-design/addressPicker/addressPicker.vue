<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input></hy-address-picker>
        </view>

        <view class="hy-title">分割线</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input separator="/"></hy-address-picker>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyAddressPicker from '../../package/components/hy-address-picker/hy-address-picker.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '地址选择器'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const value = ref('')

useShareButton()
</script>

<style scoped lang="scss"></style>
