<template>
    <hy-config-provider :custom-style="themeColor" :theme="darkMode">
        <hy-tab-bar
            v-model="current"
            :list="list"
            barBgColor="linear-gradient(155deg, #192b6e, #a6307c)"
            @change="onChange"
        ></hy-tab-bar>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyTabBar from '@/package/components/hy-tabBar/hy-tabBar.vue'
import { useThemeStore } from '@/store'
import { IconConfig } from '@/package'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { themeColor, darkMode } = storeToRefs(themeStore)

const current = ref(0)
const list = [
    { name: '首页', icon: IconConfig.HOME },
    { name: '分类', icon: IconConfig.HOME },
    { name: '购物车', icon: IconConfig.HOME, badge: 10 },
    { name: '我的', icon: IconConfig.HOME }
]

const onChange = (index: number) => {
    uni.showToast({ title: `切换第${index + 1}个`, icon: 'none' })
}
</script>

<style scoped lang="scss"></style>
