<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-tabs :list="list">
      <template #default="{ record }">
        {{ record }}
      </template>
    </hy-tabs>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyTabs from "@/package/components/hy-tabs/hy-tabs.vue";
import { reactive } from "vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import {useThemeStore} from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;
const list = reactive([
  { name: "关注", content: "我是内容" },
  { name: "推荐", badge: { isDot: true } },
  { name: "电影", badge: { value: 5 } },
  { name: "科技" },
  { name: "音乐" },
  { name: "美食" },
  { name: "文化" },
  { name: "财经" },
  { name: "手工" },
]);
</script>

<style scoped lang="scss"></style>
