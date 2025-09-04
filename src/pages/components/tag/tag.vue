<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">主题色</view>
    <view class="hy-grid hy-container">
      <hy-tag text="标签" type="primary"></hy-tag>
      <hy-tag text="标签" type="success"></hy-tag>
      <hy-tag text="标签" type="error"></hy-tag>
      <hy-tag text="标签" type="warning"></hy-tag>
      <hy-tag text="标签" type="info"></hy-tag>
      <hy-tag text="标签" color="#800080"></hy-tag>
      <hy-tag text="标签" color="#FFF420"></hy-tag>
      <hy-tag text="标签" color="#A4E82F"></hy-tag>
      <hy-tag text="标签" color="#E72F8C"></hy-tag>
    </view>

    <view class="hy-title">镂空</view>
    <view class="hy-grid hy-container">
      <hy-tag text="标签" type="primary" plain></hy-tag>
      <hy-tag text="标签" type="success" plain></hy-tag>
      <hy-tag text="标签" type="error" plain></hy-tag>
      <hy-tag text="标签" type="warning" plain></hy-tag>
      <hy-tag text="标签" type="info" plain></hy-tag>
      <hy-tag text="标签" color="#800080" plain></hy-tag>
      <hy-tag text="标签" color="#FFF420" plain></hy-tag>
      <hy-tag text="标签" color="#A4E82F" plain></hy-tag>
      <hy-tag text="标签" color="#E72F8C" plain></hy-tag>
    </view>

    <view class="hy-title">镂空带背景色</view>
    <view class="hy-grid hy-container">
      <hy-tag text="标签" type="primary" plain plainFill></hy-tag>
      <hy-tag text="标签" type="success" plain plainFill></hy-tag>
      <hy-tag text="标签" type="error" plain plainFill></hy-tag>
      <hy-tag text="标签" type="warning" plain plainFill></hy-tag>
      <hy-tag text="标签" type="info" plain plainFill></hy-tag>
      <hy-tag text="标签" color="#800080" plain plainFill></hy-tag>
      <hy-tag text="标签" color="#FFF420" plain plainFill></hy-tag>
      <hy-tag text="标签" color="#A4E82F" plain plainFill></hy-tag>
      <hy-tag text="标签" color="#E72F8C" plain plainFill></hy-tag>
    </view>

    <view class="hy-title">尺寸</view>
    <view class="hy-flex hy-container">
      <hy-tag text="标签" size="large"></hy-tag>
      <hy-tag text="标签" size="medium"></hy-tag>
      <hy-tag text="标签" size="small"></hy-tag>
      <hy-tag text="标签" size="mini"></hy-tag>
    </view>

    <view class="hy-title">形状</view>
    <view class="hy-flex hy-container">
      <hy-tag text="圆形" shape="circle"></hy-tag>
      <hy-tag text="方形" shape="square"></hy-tag>
      <hy-tag text="方形" shape="opposite"></hy-tag>
    </view>

    <view class="hy-title">带图标</view>
    <view class="hy-flex hy-container">
      <hy-tag text="地址" :icon="{ name: IconConfig.MAP }"></hy-tag>
    </view>

    <view class="hy-title">可关闭</view>
    <view class="hy-flex hy-container">
      <hy-tag
        text="关闭"
        closable
        :show="close"
        @close="close = false"
      ></hy-tag>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconConfig } from "hy-app";
import HyTag from "@/package/components/hy-tag/hy-tag.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";

const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const close = ref(true);
</script>

<style scoped lang="scss"></style>
