<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">设置暗色</view>
        <view class="hy-container">
            <hy-switch v-model="darkMode" activeValue="dark" inactiveValue="light"></hy-switch>
        </view>

        <view class="hy-title">主题色</view>
        <view class="hy-container">
            <hy-check-button
                :columns="columns"
                v-model="color"
                select-type="radio"
                @change="changeFn"
            ></hy-check-button>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'
import HyCheckButton from '../../package/components/hy-check-button/hy-check-button.vue'
import { reactive } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '全局配置'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const columns = reactive([
    { label: '红色', value: '#E83A30' },
    { label: '紫红色', value: '#E72F8C' },
    { label: '紫色', value: '#892FE8' },
    { label: '蓝紫色', value: '#5F4FD9' },
    { label: '海蓝色', value: '#3646FF' },
    { label: '蓝色', value: '#3D7EFF' },
    { label: '靛蓝色', value: '#31C9E8' },
    { label: '青色', value: '#2DE88D' },
    { label: '绿色', value: '#31E749' },
    { label: '黄绿色', value: '#A4E82F' },
    { label: '酸橙色', value: '#D5EB00' },
    { label: '黄色', value: '#FFF420' },
    { label: '橘黄色', value: '#FFCA28' },
    { label: '橙色', value: '#FFA726' },
    { label: '橘红色', value: '#FF7043' },
    { label: '棕色', value: '#914F2C' },
    { label: '玄灰色', value: '#78909C' },
    { label: '灰色', value: '#AAAAAA' }
])

const changeFn = (temp: AnyObject) => (color.value = temp.value)

useShareButton()
</script>

<style scoped lang="scss"></style>
