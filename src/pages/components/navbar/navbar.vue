<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-navbar title="悬浮" autoBack placeholder></hy-navbar>

    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-navbar
        title="标题"
        :fixed="false"
        left-text="返回"
        border
        autoBack
        :safeAreaInsetTop="false"
        :right-icon="IconConfig.DELETE"
      ></hy-navbar>
    </view>

    <view class="hy-title">自定义插槽</view>
    <view class="hy-container">
      <hy-navbar title="标题" :fixed="false" :safeAreaInsetTop="false">
        <template #left>
          <view class="u-nav-slot">
            <hy-icon :name="IconConfig.LEFT" size="16"></hy-icon>
            <hy-line
              direction="column"
              :hairline="false"
              length="16"
              margin="0 8px"
            ></hy-line>
            <hy-icon name="home" size="15"></hy-icon>
          </view>
        </template>
      </hy-navbar>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyNavbar from "@/package/components/hy-navbar/hy-navbar.vue";
import HyLine from "@/package/components/hy-line/hy-line.vue";
import HyIcon from "@/package/components/hy-icon/hy-icon.vue";
import { IconConfig } from "@/package";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
</script>

<style scoped lang="scss">
.u-nav-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  border: 0.5px solid gainsboro;
  padding: 3px 7px;
  opacity: 0.8;
}
</style>
