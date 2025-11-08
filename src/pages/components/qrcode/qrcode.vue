<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-qrcode cid="qrcode_1" text="我是文本111"></hy-qrcode>
    </view>

    <view class="hy-title">异步显示数据</view>
    <view class="hy-container">
      <hy-qrcode
        :show="showCode"
        cid="qrcode_2"
        :text="textContent"
      ></hy-qrcode>
    </view>

    <view class="hy-title">带logo</view>
    <view class="hy-container">
      <hy-qrcode
        cid="qrcode_3"
        text="https://www.hy-design-uni.top"
        :icon="logo"
      ></hy-qrcode>
    </view>

    <view class="hy-title">预览</view>
    <view class="hy-container">
      <hy-qrcode
        cid="qrcode_4"
        text="https://www.hy-design-uni.top"
        allowPreview
      ></hy-qrcode>
    </view>

    <view class="hy-title">设置二维码颜色</view>
    <view class="hy-container">
      <hy-qrcode
        cid="qrcode_5"
        text="https://uview-plus.jiangruyi.com/uview-plus/common/logo.png"
        background="red"
        foreground="green"
        pdGround="blue"
      ></hy-qrcode>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyQrcode from "@/package/components/hy-qrcode/hy-qrcode.vue";
import logo from "@/static/hy_logo_light.png";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const showCode = ref(false);
const textContent = ref("");

setTimeout(() => {
  showCode.value = true;
  textContent.value = "https://www.hy-design-uni.top";
}, 3000);
</script>

<style scoped lang="scss"></style>
