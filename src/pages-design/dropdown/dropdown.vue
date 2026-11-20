<template>
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

    <!-- 小容器内使用：与上个示例间隔一段距离，验证弹层定位随实际位置计算 -->
    <!--    <view class="hy-title">{{ t('containerSection') }}</view>-->
    <view class="small-container">
        <hy-dropdown :sticky="false">
            <hy-dropdown-item
                :title="t('all')"
                :menus="options1"
                v-model="value1"
                @change="handleChange"
            ></hy-dropdown-item>
            <!-- 禁用态：标题变灰且点击不展开 -->
            <hy-dropdown-item
                :title="t('disabled')"
                :menus="options_3"
                v-model="value_4"
                disabled
            ></hy-dropdown-item>
        </hy-dropdown>
    </view>
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
const value_4 = ref()
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

<style scoped lang="scss">
.small-container {
    padding-top: 200px;
}
</style>
