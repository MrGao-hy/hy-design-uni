<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">按钮颜色</view>
    <view class="hy-grid hy-container">
      <hy-button type="info" text="默认按钮"></hy-button>
      <hy-button type="success" text="主要按钮"></hy-button>
      <hy-button type="primary" text="信息按钮"></hy-button>
      <hy-button type="error" text="危险按钮"></hy-button>
      <hy-button type="warning" text="警告按钮"></hy-button>
      <hy-button
        text="渐变按钮"
        color="linear-gradient(to right, #4bfcfc, #FB39F5)"
      ></hy-button>
    </view>

    <view class="hy-title">按钮镂空（背景色）</view>
    <view class="hy-grid hy-container">
      <hy-button type="info" text="默认按钮" plain></hy-button>
      <hy-button type="success" text="主要按钮" plain></hy-button>
      <hy-button type="primary" text="信息按钮" plain></hy-button>
      <hy-button type="error" text="危险按钮" plain></hy-button>
      <hy-button type="warning" text="警告按钮" plain></hy-button>
    </view>

    <view class="hy-title">按钮图标</view>
    <view class="hy-container">
      <hy-button
        type="error"
        text="删除"
        :icon="{ name: IconConfig.DELETE }"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        text="删除"
        :icon="{ name: IconConfig.DELETE }"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        text="删除"
        plain
        :icon="{ name: IconConfig.DELETE }"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        type="error"
        text="删除"
        plain
        :icon="{ name: IconConfig.DELETE }"
      ></hy-button>
    </view>

    <view class="hy-title">加载按钮</view>
    <view class="hy-container">
      <hy-button
        text="主要按钮"
        loading
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button text="主要按钮" plain loading></hy-button>
    </view>

    <view class="hy-title">按钮大小</view>
    <view class="hy-container">
      <hy-button
        text="大尺寸按钮"
        size="large"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        text="默认按钮"
        size="medium"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        text="小尺寸按钮"
        size="small"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
      <hy-button
        text="迷你按钮"
        size="mini"
        :custom-style="{ marginBottom: '20px' }"
      ></hy-button>
    </view>

    <view class="hy-title">按钮形状</view>
    <view class="hy-flex hy-container">
      <hy-button text="方形按钮" shape="square"></hy-button>
      <hy-button text="圆形按钮" shape="circle"></hy-button>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyButton from "@/package/components/hy-button/hy-button.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { IconConfig } from "@/package/config";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
</script>

<style scoped lang="scss"></style>
