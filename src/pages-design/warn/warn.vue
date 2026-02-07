<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container hy-gap">
            <hy-warn
                title="唧唧复唧唧"
                type="primary"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                title="木兰当户织"
                type="success"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                title="不闻机杼声"
                type="info"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                title="唯闻女叹息"
                type="warning"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
            <hy-warn
                title="问女何所思"
                type="error"
                :theme="theme"
                :showIcon="showIcon"
                :closable="closable"
            ></hy-warn>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">深色浅色</view>
            <hy-subsection :list="list_1" v-model="theme"></hy-subsection>

            <view class="hy-title">显示关闭按钮</view>
            <hy-switch v-model="closable"></hy-switch>

            <view class="hy-title">显示图标</view>
            <hy-switch v-model="showIcon"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '警告提示'
    }
})

const theme = ref<HyApp.ThemeVo>('light')
const closable = ref(false)
const showIcon = ref(false)

const list_1 = reactive([
    { name: '浅色', value: 'light' },
    { name: '深色', value: 'dark' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
