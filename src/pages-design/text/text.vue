<template>
    <view class="hy-title">{{ t('basicUsage') }}</view>
    <hy-text :text="t('tenYears')"></hy-text>

    <view class="hy-title">{{ t('themeColor') }}</view>
    <view class="hy-flex">
        <hy-text :text="t('primary')" type="primary"></hy-text>
        <hy-text :text="t('error')" type="error" size="12"></hy-text>
        <hy-text :text="t('success')" type="success"></hy-text>
        <hy-text :text="t('warning')" type="warning"></hy-text>
        <hy-text :text="t('info')" type="info"></hy-text>
        <hy-text :text="t('color')" size="24rpx" color="#892FE8"></hy-text>
    </view>

    <view class="hy-title">{{ t('phone') }}</view>
    <view class="hy-flex">
        <hy-text mode="phone" text="19807123294"></hy-text>
        <hy-text mode="phone" text="19807123294" format="encrypt"></hy-text>
    </view>

    <view class="hy-title">{{ t('dateFormat') }}</view>
    <hy-text mode="date" :text="1746024799822"></hy-text>

    <view class="hy-title">{{ t('nameEncrypt') }}</view>
    <view class="hy-flex">
        <hy-text mode="name" :text="t('zhangSan')" format="encrypt"></hy-text>
        <hy-text mode="name" :text="t('zhangYida')" format="encrypt"></hy-text>
        <hy-text mode="name" :text="t('gulnazar')" format="encrypt"></hy-text>
    </view>

    <view class="hy-title">{{ t('link') }}</view>
    <hy-text mode="link" :text="t('myBlog')" href="https://blogs.hy-design-uni.top/"></hy-text>

    <view class="hy-title">{{ t('price') }}</view>
    <hy-text mode="price" text="728732.32"></hy-text>

    <view class="hy-title">{{ t('icon') }}</view>
    <view class="hy-flex">
        <hy-text :prefixIcon="IconConfig.LOCATION" :text="t('address')"></hy-text>
        <hy-text
            :suffixIcon="IconConfig.ARROW_RIGHT"
            :iconStyle="{ fontSize: '15px' }"
            align="right"
            :text="t('viewMore')"
        ></hy-text>
    </view>

    <view class="hy-title">{{ t('decoration') }}</view>
    <view class="hy-flex">
        <hy-text :text="t('underline')" decoration="underline"></hy-text>
        <hy-text :text="t('lineThrough')" decoration="line-through" type="error"></hy-text>
        <hy-text :text="t('overline')" decoration="overline" type="primary"></hy-text>
    </view>

    <view class="hy-title">{{ t('slot') }}</view>
    <view class="hy-flex">
        <hy-text text="19807123294" mode="phone" format="encrypt" type="primary">
            <template #prefix>
                <hy-tag>{{ t('phoneTag') }}</hy-tag>
            </template>
            <template #suffix>
                <hy-tag type="error">{{ t('maskedTag') }}</hy-tag>
            </template>
        </hy-text>
    </view>

    <view class="hy-title">{{ t('twoLines') }}</view>
    <hy-text :lines="2" :text="t('uviewIntro')"></hy-text>

    <view class="hy-title">{{ t('openAbility') }}</view>
    <hy-text
        :text="t('shareWechat')"
        openType="share"
        type="success"
        @click="clickHandler"
    ></hy-text>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本'
    }
})

const { t } = useTranslate('text')
usePageTitle('text')

const clickHandler = () => {
    // #ifndef MP-WEIXIN
    uni.showToast({ title: t('mpOnly') })
    // #endif
}

useShareButton()
</script>

<style scoped lang="scss"></style>
