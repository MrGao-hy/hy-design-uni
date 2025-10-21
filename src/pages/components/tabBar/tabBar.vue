<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-tab-bar v-model="current" :list="list"></hy-tab-bar>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HyTabBar from "@/package/components/hy-tabBar/hy-tabBar.vue";
import { useThemeStore } from "@/store";
import { IconConfig } from "@/package";
import { ref } from "vue";

const themeStore = useThemeStore();
const { themeColor, darkMode } = themeStore;

const current = ref(0);
const list = [
  { name: "首页", icon: IconConfig.HOME },
  { name: "分类", icon: IconConfig.HOME },
  { name: "购物车", icon: IconConfig.HOME, badge: 10 },
  { name: "我的", icon: IconConfig.HOME },
];
</script>

<style scoped lang="scss"></style>
