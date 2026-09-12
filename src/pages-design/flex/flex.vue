<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-flex :justify="justify" :vertical="vertical" :gap="gap" :align="align">
                <hy-button size="small">{{ t('submit') }}</hy-button>
                <hy-button size="small" type="success">{{ t('review') }}</hy-button>
                <hy-button size="small" type="error">{{ t('delete') }}</hy-button>
            </hy-flex>
        </view>

        <view class="hy-title">{{ t('autoWrap') }}</view>
        <view class="hy-container">
            <hy-flex wrap="wrap" :gap="[15, 20]">
                <template v-for="item in 10" :key="item">
                    <hy-button size="small">{{ t('button') }}</hy-button>
                </template>
            </hy-flex>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('justifySection') }}</view>
            <hy-subsection :list="list_1" v-model="justify"></hy-subsection>

            <view class="hy-title">{{ t('alignSection') }}</view>
            <hy-subsection :list="list_2" v-model="align"></hy-subsection>

            <view class="hy-title">{{ t('orientation') }}</view>
            <hy-switch :list="list_1" v-model="vertical"></hy-switch>

            <view class="hy-title">{{ t('gapSection') }}</view>
            <hy-slider :list="list_1" v-model="gap"></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FlexAlign, FlexJustify } from '@/package/components/hy-flex/typing'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '弹性布局'
    }
})

const { t } = useTranslate('flex')
usePageTitle('flex')

const gap = ref(0)
const vertical = ref(false)
const justify = ref<FlexJustify>('flex-start')
const align = ref<FlexAlign>('flex-start')
const list_1 = reactive([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly'
])

const list_2 = reactive(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'])

useShareButton()
</script>

<style scoped lang="scss"></style>
