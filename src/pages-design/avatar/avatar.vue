<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-avatar :src="config.avatar" :size="size" :shape="shape"></hy-avatar>
        </view>

        <view class="hy-title">文字头像</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="高" random-bg-color />
            <hy-avatar text="李" random-bg-color />
            <hy-avatar text="罗" random-bg-color />
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">头像形状</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">头像大小</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { config } from '@/config/config'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '头像'
    }
})

const size = ref<HyApp.SizeType>('medium')
const shape = ref<HyApp.ShapeType>('circle')

const list_1 = [
    { name: '圆形', value: 'circle' },
    { name: '方形', value: 'square' }
]

const list_2 = reactive([
    { name: '小', value: 'small' },
    { name: '默认', value: 'medium' },
    { name: '大', value: 'large' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
