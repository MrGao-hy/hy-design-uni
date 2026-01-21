<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-container">
            <hy-empty :show="true" :mode="mode"></hy-empty>
        </view>

        <view class="hy-setting__box">
            <!--            <view class="hy-title">自定义列数</view>-->
            <!--            <hy-subsection :list="list_1" v-model="col"></hy-subsection>-->

            <view class="hy-title">选择类型</view>
            <hy-check-button
                :columns="list"
                v-model="mode"
                selectType="radio"
                col="repeat(4, 1fr)"
            ></hy-check-button>

            <view class="hy-title">边距</view>
            <!--            <hy-slider v-model="gap" :min="0" :max="20" />-->
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyEmpty from '@/package/components/hy-empty/hy-empty.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'
import HySubsection from '../../package/components/hy-subsection/hy-subsection.vue'
import HySlider from '../../package/components/hy-slider/hy-slider.vue'
import HyCheckButton from '@/package/components/hy-check-button/hy-check-button.vue'
import { reactive, ref } from 'vue'

definePage({
    style: {
        navigationBarTitleText: '空状态'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const mode = ref('content')
const list = reactive([
    {
        label: '无内容',
        value: 'content'
    },
    {
        label: '无搜索',
        value: 'search'
    },
    {
        label: '无地址',
        value: 'address'
    },
    {
        label: '无网络',
        value: 'network'
    },
    {
        label: '无订单',
        value: 'order'
    },
    {
        label: '无优惠券',
        value: 'coupon'
    },
    {
        label: '无消息',
        value: 'message'
    },
    {
        label: '无评论',
        value: 'comment'
    },
    {
        label: '无积分',
        value: 'integral'
    },
    {
        label: '无银行卡',
        value: 'card'
    },
    {
        label: '无通知',
        value: 'notification'
    },
    {
        label: '无购物车',
        value: 'shop'
    },
    {
        label: '无活动',
        value: 'activity'
    },
    {
        label: '加载中',
        value: 'loading'
    }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
