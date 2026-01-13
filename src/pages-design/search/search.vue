<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-search
                v-model="value"
                :animation="showClose"
                clearabled
                :shape="shape"
                :action-text="label"
                :disabled="disabled"
                :inputAlign="inputAlign"
                @change="onChange"
                @search="onSearch"
            ></hy-search>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">搜索文字</view>
            <hy-input v-model="label"></hy-input>

            <view class="hy-title">开启动画</view>
            <hy-switch v-model="showClose"></hy-switch>

            <view class="hy-title">禁用</view>
            <hy-switch v-model="disabled"></hy-switch>

            <view class="hy-title">搜索框形状</view>
            <hy-subsection :list="list" v-model="shape"></hy-subsection>

            <view class="hy-title">输入框内文本位置</view>
            <hy-subsection :list="list_1" v-model="inputAlign"></hy-subsection>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import HySearch from '../../package/components/hy-search/hy-search.vue'
import HySubsection from '../../package/components/hy-subsection/hy-subsection.vue'
import HySwitch from '../../package/components/hy-switch/hy-switch.vue'
import HyInput from '../../package/components/hy-input/hy-input.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '搜索'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const value = ref('测试')
const label = ref('搜索')
const disabled = ref(false)
const shape = ref<HyApp.ShapeType>('circle')
const showClose = ref(false)
const inputAlign = ref<HyApp.LeftRightType>('left')
const list = reactive([
    { name: '圆形', value: 'circle' },
    { name: '方形', value: 'square' }
])

const list_1 = reactive([
    { name: '左', value: 'left' },
    { name: '中', value: 'center' },
    { name: '右', value: 'right' }
])

// 搜索函数
const onSearch = () => {
    uni.showToast({ title: value.value })
}

// 输入框值改变
const onChange = (value: string) => {
    // console.log(value, "输入框值改变");
}

useShareButton()
</script>

<style scoped lang="scss"></style>
