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
            <view class="hy-title">{{ t('indicator') }}</view>
            <hy-subsection :list="list_1" v-model="mode"></hy-subsection>

            <view class="hy-title">{{ t('duration') }}</view>
            <hy-slider v-model="duration" :min="100" :max="4000" show-value></hy-slider>

            <view class="hy-title">{{ t('rightDistance') }}</view>
            <hy-slider v-model="right" :max="100" show-value></hy-slider>

            <view class="hy-title">{{ t('bottomDistance') }}</view>
            <hy-slider v-model="bottom" :max="500" show-value></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { ShapeType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '返回顶部'
    }
})

const { t } = useTranslate('backTop')
usePageTitle('backTop')

const mode = ref<ShapeType>('circle')
const duration = ref(500)
const right = ref(20)
const bottom = ref(100)
const scrollTop = ref(0)

onPageScroll((e) => {
    scrollTop.value = e.scrollTop
})

const list_1 = computed(() => [
    { name: t('shapeCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
