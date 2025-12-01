<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-cell
            :arrange="arrange"
            :size="size"
            :arrowDirection="arrowDirection"
            @click="onClick"
            clickable
        >
            <hy-cell-item
                title="工具箱"
                name="tools"
                :icon="{ name: IconConfig.SETTING, color: 'red' }"
            ></hy-cell-item>
            <hy-cell-item
                title="我的"
                name="my"
                sub="我是一个神奇的小箱子"
                value="返回"
            ></hy-cell-item>
            <hy-cell-item title="禁用" name="disabled" disabled></hy-cell-item>
        </hy-cell>

        <view class="hy-setting__box">
            <view class="hy-title">value定位</view>
            <hy-subsection :list="list_1" v-model="arrange"></hy-subsection>

            <view class="hy-title">单元格大小</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>

            <view class="hy-title">右侧icon方向</view>
            <hy-subsection :list="list_3" v-model="arrowDirection"></hy-subsection>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyCell from '@/package/components/hy-cell/hy-cell.vue'
import HyCellItem from '@/package/components/hy-cell-item/hy-cell-item.vue'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { reactive, ref } from 'vue'
import { IconConfig } from '@/package'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const arrange = ref<HyApp.RowCenterType>('right')
const size = ref<HyApp.SizeType>('medium')
const arrowDirection = ref<HyApp.RotateType>('right')

const list_1 = reactive([
    { name: '左边', value: 'left' },
    { name: '中间', value: 'center' },
    { name: '右边', value: 'right' }
])

const list_2 = reactive([
    { name: '大', value: 'large' },
    { name: '默认', value: 'medium' },
    { name: '小', value: 'small' }
])

const list_3 = reactive([
    { name: '向左', value: 'left' },
    { name: '向右', value: 'right' },
    { name: '向上', value: 'up' },
    { name: '向下', value: 'down' }
])

const onClick = (name: string | number) => {
    uni.showToast({ title: `点击执行了：${name}`, icon: 'none' })
}
</script>

<style scoped lang="scss"></style>
