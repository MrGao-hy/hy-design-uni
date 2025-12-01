<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-grid
                :list="list"
                :col="col"
                :gap="gap + 'px'"
                :border="border"
                @click="onClick"
            ></hy-grid>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">自定义列数</view>
            <hy-subsection :list="list_1" v-model="col"></hy-subsection>

            <view class="hy-title">显示边框</view>
            <hy-switch :list="list_1" v-model="border"></hy-switch>

            <view class="hy-title">边距</view>
            <hy-slider v-model="gap" :min="0" :max="20" />
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { config } from '@/config/config'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import HySwitch from '@/package/components/hy-switch/hy-switch.vue'
import HyGrid from '@/package/components/hy-grid/hy-grid.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import HySlider from '../../../package/components/hy-slider/hy-slider.vue'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

type Menus = {
    icon: string
    name: string
}

const list: Menus[] = reactive([])

for (let i = 0; i < 12; i++) {
    list.push({
        icon: config.image,
        name: '菜单' + i
    })
}

const col = ref(4)
const gap = ref(0)
const border = ref(false)
const list_1 = [2, 3, 4, 5]

const onClick = (e) => {
    uni.showToast({ title: e.name, icon: 'none' })
}
</script>

<style scoped lang="scss"></style>
