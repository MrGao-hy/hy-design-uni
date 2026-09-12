<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container hy-gap">
            <hy-warn
                :title="t('poem1')"
                type="primary"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                :title="t('poem2')"
                type="success"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                :title="t('poem3')"
                type="info"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                :title="t('poem4')"
                type="warning"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                :title="t('poem5')"
                type="error"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('darkLight') }}</view>
            <hy-subsection :list="list_1" v-model="theme"></hy-subsection>

            <view class="hy-title">{{ t('showCloseBtn') }}</view>
            <hy-switch v-model="closable"></hy-switch>

            <view class="hy-title">{{ t('showIcon') }}</view>
            <hy-switch v-model="showIcon"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { ThemeModeType } from '@/package'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '警告提示'
    }
})

const { t } = useTranslate('warn')
usePageTitle('warn')

const theme = ref<ThemeModeType>('light')
const closable = ref(false)
const showIcon = ref(false)

// 主题切换选项（computed 包裹以响应语言切换）
const list_1 = computed(() => [
    { name: t('light'), value: 'light' },
    { name: t('dark'), value: 'dark' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
