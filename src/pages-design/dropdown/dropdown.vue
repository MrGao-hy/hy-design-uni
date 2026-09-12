<template>
    <the-root-page>
        <hy-dropdown>
            <hy-dropdown-item
                :title="t('all')"
                :menus="options1"
                v-model="value1"
                @change="handleChange"
            ></hy-dropdown-item>
            <hy-dropdown-item
                :title="t('chineseAnimation')"
                :menus="options_2"
                v-model="value_2"
                @change="handleChange"
            ></hy-dropdown-item>
            <hy-dropdown-item
                :title="t('country')"
                :menus="options_3"
                v-model="value_3"
                @change="handleChange"
            ></hy-dropdown-item>
        </hy-dropdown>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '下拉菜单'
    }
})

const { t } = useTranslate('dropdown')
usePageTitle('dropdown')

const value1 = ref()
const value_2 = ref()
const value_3 = ref()
const options1 = computed(() => [
    {
        label: t('allGoods'),
        value: 1
    },
    {
        label: t('discountGoods'),
        value: 2
    },
    {
        label: t('groupGoods'),
        value: 3
    }
])
const options_2 = computed(() => [
    {
        label: t('journeyWest'),
        value: 1
    },
    {
        label: t('battleThrough'),
        value: 2
    },
    {
        label: t('swallowedStar'),
        value: 3
    },
    {
        label: t('soulLand'),
        value: 4
    },
    {
        label: t('heartStealer'),
        value: 5
    }
])
const options_3 = computed(() => [
    {
        label: t('china'),
        value: 1
    },
    {
        label: t('japan'),
        value: 2
    },
    {
        label: t('korea'),
        value: 3
    },
    {
        label: t('usa'),
        value: 4
    }
])
const handleChange = () => {}

useShareButton()
</script>

<style scoped lang="scss"></style>
