<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container hy-gap">
            <hy-notice-bar
                :text="text"
                :direction="direction"
                :mode="mode"
                :step="step"
                :justifyContent="justifyContent"
                :speed="speed"
                url="/pages/index/Index"
            ></hy-notice-bar>

            <hy-notice-bar
                :text="t('noticeText')"
                mode="link"
                url="/pages-design/icon/icon"
            ></hy-notice-bar>

            <hy-notice-bar
                :text="t('customIcon')"
                :icon="{
                    name: IconConfig.SCAN,
                    color: 'red'
                }"
            ></hy-notice-bar>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('directionSection') }}</view>
            <hy-subsection :list="list_1" v-model="direction"></hy-subsection>

            <view class="hy-title">{{ t('modeSection') }}</view>
            <hy-subsection :list="list_2" v-model="mode"></hy-subsection>

            <view class="hy-title">{{ t('justifySection') }}</view>
            <hy-subsection :list="list_3" v-model="justifyContent"></hy-subsection>

            <view class="hy-title">{{ t('carouselSection') }}</view>
            <hy-switch v-model="step"></hy-switch>

            <view class="hy-title">{{ t('speedSection') }}</view>
            <hy-slider v-model="speed" :min="50" :max="300" showValue></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { DirectionType, JustifyContentType } from '@/package/libs/typing'
import { computed, reactive, ref } from 'vue'
import type { NoticeBarModeType } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { IconConfig } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '滚动通知'
    }
})

const { t } = useTranslate('noticeBar')
usePageTitle('noticeBar')

const direction = ref<DirectionType>('column')
const mode = ref<NoticeBarModeType>('')
const justifyContent = ref<JustifyContentType>('flex-start')
const step = ref(false)
const speed = ref(80)
const list_1 = computed(() => [
    { name: t('dirRow'), value: 'row' },
    { name: t('dirColumn'), value: 'column' }
])
const list_2 = computed(() => [
    { name: t('modeNone'), value: '' },
    { name: t('modeClosable'), value: 'closable' },
    { name: t('modeLink'), value: 'link' }
])
const list_3 = computed(() => [
    { name: t('justifyLeft'), value: 'flex-start' },
    { name: t('justifyCenter'), value: 'center' },
    { name: t('justifyRight'), value: 'flex-end' }
])
// 木兰诗演示文本（文学作品保留中文）
const text = reactive(['唧唧复唧唧，', '木兰当户织。', '不闻机杼声，', '唯闻女叹息。'])

useShareButton()
</script>

<style scoped lang="scss"></style>
