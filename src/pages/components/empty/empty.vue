<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-empty :button="{ text: '去购物' }"></hy-empty>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyEmpty from "@/package/components/hy-empty/hy-empty.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
</script>

<style scoped lang="scss"></style>
