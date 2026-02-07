<template>
    <the-root-page>
        <view class="hy-setting__box">
            <hy-watermark
                title="华玥组件库"
                content="基于vue3+ts的ui组件库"
                image="https://pic1.imgdb.cn/item/67f8dfea88c538a9b5caea38.png"
                :width="150"
                :height="120"
                :size="size"
                :opacity="opacity"
                :rotate="rotate"
                :fullScreen="fullScreen"
                :gutter-x="space"
                :gutter-y="space"
                titleColor="yellow"
                :titleSize="20"
                :isAntiTheft="isAntiTheft"
            ></hy-watermark>

            <view class="hy-title">水印旋转角度</view>
            <hy-subsection :list="list_2" v-model="rotate"></hy-subsection>

            <view class="hy-title">是否全屏</view>
            <hy-switch v-model="fullScreen"></hy-switch>

            <view class="hy-title">是否开启防盗</view>
            <hy-switch v-model="isAntiTheft"></hy-switch>

            <view class="hy-title">边距</view>
            <hy-slider v-model="space" :min="0" :max="150" show-value />

            <view class="hy-title">字体大小</view>
            <hy-slider v-model="size" :min="12" :max="25" show-value />

            <view class="hy-title">透明度</view>
            <hy-slider v-model="opacity" :min="0" :max="1" :step="0.1" show-value></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '水印'
    }
})

const size = ref(12)
const space = ref(0)
const opacity = ref(0.5)
const rotate = ref(-25)
const fullScreen = ref(false)
const isAntiTheft = ref(true)
const list_2 = [-45, -25, 0, 25, 45]

useShareButton()
</script>

<style scoped lang="scss">
.hy-setting__box {
    position: relative;
}
</style>
