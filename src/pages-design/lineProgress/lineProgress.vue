<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value"></hy-line-progress>
        </view>

        <view class="hy-title">{{ t('customHeight') }}</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value" height="20"></hy-line-progress>
        </view>

        <view class="hy-title">{{ t('customColor') }}</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value" activeColor="red"></hy-line-progress>
        </view>

        <view class="hy-title">{{ t('manualControl') }}</view>
        <view class="hy-container">
            <hy-flex justify="space-around">
                <hy-button
                    type="error"
                    :text="t('minus')"
                    @click="computedWidth('minus')"
                ></hy-button>
                <hy-button :text="t('plus')" @click="computedWidth('plus')"></hy-button>
            </hy-flex>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { range } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '线形进度条'
    }
})

const { t } = useTranslate('lineProgress')
usePageTitle('lineProgress')

const value = ref(20)

const computedWidth = (type: 'plus' | 'minus') => {
    if (type === 'plus') {
        value.value = range(0, 100, value.value + 10)
    } else {
        value.value = range(0, 100, value.value - 10)
    }
}

useShareButton()
</script>

<style scoped lang="scss"></style>
