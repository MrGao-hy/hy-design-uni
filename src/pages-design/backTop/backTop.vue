<template>
    <the-root-page :custom-style="{ height: '10000px' }">
        <hy-back-top
            :scrollTop="scrollTop"
            :mode="mode"
            :duration="duration"
            :right="right"
            :bottom="bottom"
        ></hy-back-top>
        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-subsection :list="list_1" v-model="mode"></hy-subsection>

            <view class="hy-title">回去时长</view>
            <hy-slider v-model="duration" :min="100" :max="4000" show-value></hy-slider>

            <view class="hy-title">距离右边距离</view>
            <hy-slider v-model="right" :max="100" show-value></hy-slider>

            <view class="hy-title">距离底部距离</view>
            <hy-slider v-model="bottom" :max="500" show-value></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '返回顶部'
    }
})

const mode = ref<HyApp.ShapeType>('circle')
const duration = ref(500)
const right = ref(20)
const bottom = ref(100)
const scrollTop = ref(0)

onPageScroll((e) => {
    scrollTop.value = e.scrollTop
})

const list_1 = [
    { name: '圆形', value: 'circle' },
    { name: '方形', value: 'square' }
]

useShareButton()
</script>

<style scoped lang="scss"></style>
