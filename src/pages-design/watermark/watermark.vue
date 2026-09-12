<template>
    <the-root-page>
        <view class="hy-setting__box">
            <hy-watermark
                :title="t('libraryName')"
                :content="t('libraryDesc')"
                image="/static/logo.png"
                :width="150"
                :height="120"
                :size="size"
                :opacity="opacity"
                :rotate="rotate"
                :fullScreen="fullScreen"
                :gutter-x="space"
                :gutter-y="space"
                titleColor="red"
                :titleSize="20"
                :isAntiTheft="isAntiTheft"
            ></hy-watermark>

            <view class="hy-title">{{ t('rotateAngle') }}</view>
            <hy-subsection :list="list_2" v-model="rotate"></hy-subsection>

            <view class="hy-title">{{ t('fullScreenSwitch') }}</view>
            <hy-switch v-model="fullScreen"></hy-switch>

            <view class="hy-title">{{ t('antiTheft') }}</view>
            <hy-switch v-model="isAntiTheft"></hy-switch>

            <view class="hy-title">{{ t('gutter') }}</view>
            <hy-slider v-model="space" :min="0" :max="150" show-value />

            <view class="hy-title">{{ t('fontSize') }}</view>
            <hy-slider v-model="size" :min="12" :max="25" show-value />

            <view class="hy-title">{{ t('opacity') }}</view>
            <hy-slider v-model="opacity" :min="0" :max="1" :step="0.1" show-value></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import TheRootPage from '@/components/the-root-page.vue'

definePage({
    style: {
        navigationBarTitleText: '水印'
    }
})

const { t } = useTranslate('watermark')
usePageTitle('watermark')

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
    overflow: hidden;
}
</style>
