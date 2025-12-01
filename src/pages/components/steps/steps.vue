<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view style="overflow: auto; width: 400px">
            <hy-steps
                :list="list"
                v-model:current="current"
                :direction="direction"
                :dot="dot"
            ></hy-steps>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-subsection :list="list_1" v-model="direction"></hy-subsection>

            <view class="hy-title">指示点</view>
            <hy-switch v-model="dot"></hy-switch>

            <view class="hy-title">前进</view>
            <hy-number-step v-model="current" :min="0"></hy-number-step>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HySteps from '@/package/components/hy-steps/hy-steps.vue'
import HyNumberStep from '@/package/components/hy-number-step/hy-number-step.vue'
import HySwitch from '@/package/components/hy-switch/hy-switch.vue'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import { ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const direction = ref<HyApp.DirectionType>('row')
const dot = ref(false)

const current = ref(0)
const list = ref([
    { title: '已下单', desc: '2024-10-13' },
    { title: '发货中', desc: '2024-10-13' },
    { title: '已发货', desc: '2024-10-13' },
    { title: '发货失败', desc: '2024-10-14', error: true }
])
const list_1 = [
    { name: '横向', value: 'row' },
    { name: '竖向', value: 'column' }
]
</script>

<style scoped lang="scss"></style>
