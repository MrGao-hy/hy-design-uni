<template>
    <the-root-page>
        <hy-submit-bar
            :menus="menus"
            :left-loading="true"
            @menu-click="clickMenuFn"
        ></hy-submit-bar>
        <view class="hy-title">{{ t('oneButton') }}</view>
        <hy-submit-bar
            :menus="menus"
            :fixed="false"
            :show-left-btn="false"
            right-btn-color="linear-gradient(to right, #4bfcfc, #FB39F5)"
        ></hy-submit-bar>
        <hy-submit-bar :menus="menus" :fixed="false" :show-right-btn="false"></hy-submit-bar>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IconConfig } from '@/package'
import type { SubmitBarIconMenus } from '@/package/components/hy-submit-bar/typing'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '提交订单栏'
    }
})

const { t } = useTranslate('submitBar')
usePageTitle('submitBar')

// 图标菜单文案（computed 包裹以响应语言切换）
const menus = computed(() => [
    { icon: IconConfig.HOME, text: t('home') },
    { icon: IconConfig.CUSTOMER_SERVICE, text: t('service') },
    {
        icon: IconConfig.SHOPPING_CART,
        text: t('cart'),
        badge: { value: 10 }
    }
])

const clickMenuFn = (temp: SubmitBarIconMenus, i: number) => {
    uni.showToast({ title: t('clicked', i) })
}

useShareButton()
</script>

<style scoped lang="scss"></style>
