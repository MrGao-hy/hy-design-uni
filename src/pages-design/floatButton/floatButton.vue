<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-float-button
            :shape="shape"
            :size="size"
            :menus="menus"
            :float="float"
            :direction="direction"
            :shadow="shadow"
            :opacity="opacity"
            :position="position"
            :draggable="draggable"
            :expandable="expandable"
        ></hy-float-button>

        <view class="hy-setting__box">
            <view class="hy-title">悬浮按钮形状</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">悬浮按钮大小</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>

            <view class="hy-title">悬浮按钮打开方向</view>
            <hy-subsection :list="list_3" v-model="direction"></hy-subsection>

            <view class="hy-title">悬浮按钮位置</view>
            <hy-subsection :list="list_4" v-model="position"></hy-subsection>

            <view class="hy-title">是否浮动</view>
            <hy-switch v-model="float"></hy-switch>

            <view class="hy-title">显示阴影</view>
            <hy-switch v-model="shadow"></hy-switch>

            <view class="hy-title">是否可以拖拽</view>
            <hy-switch v-model="draggable"></hy-switch>

            <view class="hy-title">是否打开</view>
            <hy-switch v-model="expandable"></hy-switch>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyFloatButton from '@/package/components/hy-float-button/hy-float-button.vue'
import HySubsection from '../../package/components/hy-subsection/hy-subsection.vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '悬浮按钮'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const menus = ['菜单1', '菜单2', '菜单3']
const shape = ref('circle')
const size = ref('medium')
const direction = ref('column')
const float = ref(false)
const shadow = ref(false)
const draggable = ref(false)
const expandable = ref(true)
const opacity = ref(1)
const position = ref('right-top')

const list_1 = reactive([
    { name: '圆形', value: 'circle' },
    { name: '方形', value: 'square' }
])

const list_2 = reactive([
    { name: '大', value: 'large' },
    { name: '中', value: 'medium' },
    { name: '小', value: 'small' }
])

const list_3 = reactive([
    { name: '横向', value: 'row' },
    { name: '竖直', value: 'column' }
])

const list_4 = reactive([
    { name: '左上', value: 'left-top' },
    { name: '右上', value: 'right-top' },
    { name: '左中', value: 'left-center' },
    { name: '右中', value: 'right-center' },
    { name: '左下', value: 'left-bottom' },
    { name: '右下', value: 'right-bottom' },
    { name: '上中', value: 'top-center' },
    { name: '下中', value: 'bottom-center' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
