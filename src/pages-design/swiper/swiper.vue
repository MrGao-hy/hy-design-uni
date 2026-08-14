<template>
    <the-root-page>
        <view class="hy-margin">
            <hy-swiper
                :list="list"
                indicator
                :indicatorMode="mode"
                :height="height"
                :duration="duration"
                :interval="interval"
                circular
            ></hy-swiper>
        </view>

        <view class="hy-margin">
            <hy-swiper
                :list="list_2"
                :autoplay="false"
                indicator
                :indicatorMode="mode"
                previousMargin="30"
                nextMargin="30"
                radius="5"
                bgColor="#ffffff"
                showTitle
                circular
            ></hy-swiper>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-subsection :list="list_1" v-model="mode"></hy-subsection>

            <view class="hy-title">轮播图高度</view>
            <hy-slider v-model="height" :max="500"></hy-slider>

            <view class="hy-title">轮播图切换时间</view>
            <hy-slider v-model="duration" :min="100" :max="1000"></hy-slider>

            <view class="hy-title">轮播图自动切换间隔</view>
            <hy-slider v-model="interval" :min="1000" :max="5000"></hy-slider>
        </view>

        <view class="hy-title">自定义指示器</view>
        <hy-swiper :list="list" :autoplay="false" height="300">
            <template #indicator="{ current, length }">
                <view class="indicator">
                    <text>{{ current }}</text>
                    <text>/</text>
                    <text>{{ length }}</text>
                </view>
            </template>
        </hy-swiper>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useShareButton } from '@/composables'
import TheRootPage from '@/components/the-root-page.vue'
import type { SwiperList, IndicatorMode } from '@/package'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '轮播图'
    }
})

const list = ref([config.swiper1, config.swiper2, config.swiper3])
const list_2 = ref<SwiperList[]>([
    {
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        type: 'video'
    },
    {
        url: config.swiper1,
        title: '身无彩凤双飞翼，心有灵犀一点通'
    },
    {
        url: config.swiper2,
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
    }
])
const mode = ref<IndicatorMode>('line')
const height = ref<number>(200)
const duration = ref<number>(300)
const interval = ref<number>(3000)
const list_1 = reactive([
    { name: '线', value: 'line' },
    { name: '点', value: 'dot' }
])

useShareButton()
</script>

<style scoped lang="scss">
.indicator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90rpx;
    height: 40rpx;
    background: rgba(128, 128, 128, 0.7);
    border-radius: $hy-radius-semicircle;
    color: #fff;
}
</style>
