<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
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
                text="这是一个重要的通知, 你好"
                mode="link"
                url="/pages-design/icon/icon"
            ></hy-notice-bar>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">滚动方向</view>
            <hy-subsection :list="list_1" v-model="direction"></hy-subsection>

            <view class="hy-title">模式</view>
            <hy-subsection :list="list_2" v-model="mode"></hy-subsection>

            <view class="hy-title">文字位置</view>
            <hy-subsection :list="list_3" v-model="justifyContent"></hy-subsection>

            <view class="hy-title">横向轮播</view>
            <hy-switch v-model="step"></hy-switch>

            <view class="hy-title"
                >水平滚动速度(速度没有变不是失效，切换上面滚动方向在切回来就可以了)</view
            >
            <hy-slider v-model="speed" :min="50" :max="300" showValue></hy-slider>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { NoticeBarModeVo } from '@/package/components/hy-notice-bar/typing'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '滚动通知'
    }
})

const direction = ref<HyApp.DirectionType>('column')
const mode = ref<NoticeBarModeVo>('')
const justifyContent = ref<HyApp.JustifyContentType>('flex-start')
const step = ref(false)
const speed = ref(80)
const list_1 = [
    { name: '横向', value: 'row' },
    { name: '纵向', value: 'column' }
]
const list_2 = [
    { name: '无', value: '' },
    { name: '关闭', value: 'closable' },
    { name: '跳转', value: 'link' }
]
const list_3 = [
    { name: '左', value: 'flex-start' },
    { name: '中', value: 'center' },
    { name: '右', value: 'flex-end' }
]
const text = reactive(['唧唧复唧唧，', '木兰当户织。', '不闻机杼声，', '唯闻女叹息。'])

useShareButton()
</script>

<style scoped lang="scss"></style>
