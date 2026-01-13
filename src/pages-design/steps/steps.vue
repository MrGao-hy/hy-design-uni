<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view style="overflow: auto; width: 400px">
            <hy-steps
                :list="list_1"
                v-model:current="current"
                direction="row"
                :dot="dot"
            ></hy-steps>
        </view>

        <view class="hy-title">纵向</view>
        <view style="overflow: auto; width: 400px">
            <hy-steps
                :list="list2"
                v-model:current="current"
                direction="column"
                :dot="dot"
            ></hy-steps>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-switch v-model="dot"></hy-switch>

            <view class="hy-title">前进</view>
            <hy-number-step v-model="current" :min="0"></hy-number-step>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HySteps from '../../package/components/hy-steps/hy-steps.vue'
import HyNumberStep from '../../package/components/hy-number-step/hy-number-step.vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'
import HySubsection from '../../package/components/hy-subsection/hy-subsection.vue'
import { ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '步骤条'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const dot = ref(false)
const current = ref(3)
const list_1 = ref([
    {
        title: '注册用户'
    },
    {
        title: '填写基本信息'
    },
    {
        title: '登录'
    }
])
const list2 = ref([
    {
        title: '已下单',
        docs: '【深证市】您的快递正在站点，快递员正在为你打包，请耐心等待发货',
        date: '2024-10-13'
    },
    { title: '发货中', date: '2024-10-13' },
    {
        title: '已发货',
        docs: '【合肥市】温馨提醒：您的快递已处于运输配送途中，预计将在近期送达。本次配送快递员为李子柒，联系电话：18888888888。若您需咨询配送进度、调整收货地址或确认收货时间，可直接拨打上述电话与快递员沟通。请保持手机畅通，耐心等待包裹送达。',
        date: '2024-10-13'
    },
    {
        title: '发货失败',
        docs: '【重要通知】您的快递在运输过程中发生意外火情，包裹已受损。我们对此次事件给您带来的不便与损失深表歉意，也对您的遭遇致以诚挚的同情。相关理赔专员将尽快与您取得联系，协助您处理后续的赔付事宜，请您保持手机畅通。',
        date: '2024-10-14',
        error: true
    }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
