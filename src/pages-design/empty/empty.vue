<template>
    <the-root-page>
        <view class="hy-container">
            <hy-empty :show="true" :mode="mode"></hy-empty>
        </view>

        <view class="hy-setting__box">
            <!--            <view class="hy-title">自定义列数</view>-->
            <!--            <hy-subsection :list="list_1" v-model="col"></hy-subsection>-->

            <view class="hy-title">{{ t('selectType') }}</view>
            <hy-check-button
                :columns="list"
                v-model="mode"
                selectType="radio"
                col="repeat(4, 1fr)"
            ></hy-check-button>

            <view class="hy-title">{{ t('padding') }}</view>
            <!--            <hy-slider v-model="gap" :min="0" :max="20" />-->
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { computed, ref } from 'vue'
import { EmptyModeType } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '空状态'
    }
})

const { t } = useTranslate('empty')
usePageTitle('empty')

const mode = ref<EmptyModeType>('content')
const list = computed(() => [
    {
        label: t('typeContent'),
        value: 'content'
    },
    {
        label: t('typeSearch'),
        value: 'search'
    },
    {
        label: t('typeAddress'),
        value: 'address'
    },
    {
        label: t('typeNetwork'),
        value: 'network'
    },
    {
        label: t('typeOrder'),
        value: 'order'
    },
    {
        label: t('typeCoupon'),
        value: 'coupon'
    },
    {
        label: t('typeMessage'),
        value: 'message'
    },
    {
        label: t('typeComment'),
        value: 'comment'
    },
    {
        label: t('typeIntegral'),
        value: 'integral'
    },
    {
        label: t('typeCard'),
        value: 'card'
    },
    {
        label: t('typeNotification'),
        value: 'notification'
    },
    {
        label: t('typeShop'),
        value: 'shop'
    },
    {
        label: t('typeActivity'),
        value: 'activity'
    },
    {
        label: t('typeLoading'),
        value: 'loading'
    }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
