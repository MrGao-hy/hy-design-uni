<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-container">
            <hy-empty :show="true"></hy-empty>
        </view>

        <view class="hy-container">
            <hy-empty mode="search" :show="true"></hy-empty>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyEmpty from '@/package/components/hy-empty/hy-empty.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const imgUrl = ''
</script>

<style scoped lang="scss"></style>
