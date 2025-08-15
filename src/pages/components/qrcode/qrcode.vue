<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-qrcode cid="qrcode_1" text="https://gxh151.top/h5"></hy-qrcode>
    </view>

    <view class="hy-title">带logo</view>
    <view class="hy-container">
      <hy-qrcode cid="qrcode_2" text="https://gxh151.top/h5" :icon="logo"></hy-qrcode>
    </view>

    <view class="hy-title">图片错误加载中</view>
    <view class="hy-container">
      <hy-qrcode
        cid="qrcode_3"
        text="https://uview-plus.jiangruyi.com/uview-plus/common/logo.png"
        icon="https://uview-plus.jiangruyi.com/uview-plus/common/logo.png"
      ></hy-qrcode>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyQrcode from '@/package/components/hy-qrcode/hy-qrcode.vue'
import logo from '@/static/hy_logo_light.png'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
</script>

<style scoped lang="scss"></style>
