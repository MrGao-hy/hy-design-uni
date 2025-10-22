<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-subsection :list="list" v-model="value"></hy-subsection>
    </view>

    <view class="hy-title">模式</view>
    <view class="hy-container">
      <hy-subsection
        :list="list"
        v-model="value"
        mode="subsection"
      ></hy-subsection>
    </view>

    <view class="hy-title">颜色</view>
    <view class="hy-container">
      <hy-subsection
        :list="list"
        v-model="value"
        activeColor="#f56c6c"
        mode="subsection"
      ></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { ref } from "vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const value = ref("");
const list = ["未付款", "待评价", "已付款"];
</script>

<style scoped lang="scss"></style>
