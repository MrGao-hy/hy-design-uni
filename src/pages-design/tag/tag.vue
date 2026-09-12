<template>
    <the-root-page>
        <view class="hy-title">{{ t('themeColor') }}</view>
        <view class="hy-grid hy-container">
            <hy-tag :label="t('label')" type="primary"></hy-tag>
            <hy-tag :label="t('label')" type="success"></hy-tag>
            <hy-tag :label="t('label')" type="error"></hy-tag>
            <hy-tag :label="t('label')" type="warning"></hy-tag>
            <hy-tag :label="t('label')" type="info"></hy-tag>
            <hy-tag :label="t('label')" color="#800080"></hy-tag>
            <hy-tag :label="t('label')" color="#FFF420"></hy-tag>
            <hy-tag :label="t('label')" color="#A4E82F"></hy-tag>
            <hy-tag :label="t('label')" color="#E72F8C"></hy-tag>
        </view>

        <view class="hy-title">{{ t('plain') }}</view>
        <view class="hy-grid hy-container">
            <hy-tag :label="t('label')" type="primary" plain></hy-tag>
            <hy-tag :label="t('label')" type="success" plain></hy-tag>
            <hy-tag :label="t('label')" type="error" plain></hy-tag>
            <hy-tag :label="t('label')" type="warning" plain></hy-tag>
            <hy-tag :label="t('label')" type="info" plain></hy-tag>
            <hy-tag :label="t('label')" color="#800080" plain></hy-tag>
            <hy-tag :label="t('label')" color="#FFF420" plain></hy-tag>
            <hy-tag :label="t('label')" color="#A4E82F" plain></hy-tag>
            <hy-tag :label="t('label')" color="#E72F8C" plain></hy-tag>
        </view>

        <view class="hy-title">{{ t('plainFill') }}</view>
        <view class="hy-grid hy-container">
            <hy-tag :label="t('label')" type="primary" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" type="success" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" type="error" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" type="warning" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" type="info" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" color="#800080" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" color="#FFF420" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" color="#A4E82F" plain plainFill></hy-tag>
            <hy-tag :label="t('label')" color="#E72F8C" plain plainFill></hy-tag>
        </view>

        <view class="hy-title">{{ t('size') }}</view>
        <view class="hy-flex hy-container">
            <hy-tag :icon="{ name: IconConfig.MAP }" :label="t('label')" size="large"></hy-tag>
            <hy-tag :icon="{ name: IconConfig.MAP }" :label="t('label')" size="medium"></hy-tag>
            <hy-tag :icon="{ name: IconConfig.MAP }" :label="t('label')" size="small"></hy-tag>
            <hy-tag :icon="{ name: IconConfig.MAP }" :label="t('label')" size="mini"></hy-tag>
        </view>

        <view class="hy-title">{{ t('shape') }}</view>
        <view class="hy-flex hy-container">
            <hy-tag :label="t('circle')" shape="circle"></hy-tag>
            <hy-tag :label="t('square')" shape="square"></hy-tag>
            <hy-tag :label="t('square')" shape="opposite"></hy-tag>
        </view>

        <view class="hy-title">{{ t('withIcon') }}</view>
        <view class="hy-flex hy-container">
            <hy-tag :label="t('address')" :icon="{ name: IconConfig.MAP }"></hy-tag>
        </view>

        <view class="hy-title">{{ t('closable') }}</view>
        <view class="hy-flex hy-container">
            <hy-tag :label="t('clothes')" closable :show="close" @close="close = false"></hy-tag>
            <hy-tag
                :label="t('pants')"
                closable
                :show="close1"
                @close="close1 = false"
                plain
                shape="circle"
            ></hy-tag>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '标签'
    }
})

const { t } = useTranslate('tag')
usePageTitle('tag')

const close = ref(true)
const close1 = ref(true)

useShareButton()
</script>

<style scoped lang="scss"></style>
