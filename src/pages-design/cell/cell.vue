<template>
    <the-root-page>
        <hy-cell
            :arrange="arrange"
            :size="size"
            :arrowDirection="arrowDirection"
            @click="onClick"
            clickable
        >
            <hy-cell-item
                :title="t('toolbox')"
                name="tools"
                :icon="{ name: IconConfig.SETTING, color: 'red' }"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('mine')"
                name="my"
                :sub="t('magicBox')"
                :value="t('back')"
            ></hy-cell-item>
            <hy-cell-item :title="t('disabledCell')" name="disabled" disabled></hy-cell-item>
        </hy-cell>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('valuePosition') }}</view>
            <hy-subsection :list="list_1" v-model="arrange"></hy-subsection>

            <view class="hy-title">{{ t('cellSize') }}</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>

            <view class="hy-title">{{ t('arrowDirection') }}</view>
            <hy-subsection :list="list_3" v-model="arrowDirection"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { RowCenterType, SizeType, ArrowDirectionType } from '@/package/libs'
import { computed, ref } from 'vue'
import { IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '单元格'
    }
})

const { t } = useTranslate('cell')
usePageTitle('cell')

const arrange = ref<RowCenterType>('right')
const size = ref<SizeType>('medium')
const arrowDirection = ref<ArrowDirectionType>('right')

const list_1 = computed(() => [
    { name: t('posLeft'), value: 'left' },
    { name: t('posCenter'), value: 'center' },
    { name: t('posRight'), value: 'right' }
])

const list_2 = computed(() => [
    { name: t('sizeLarge'), value: 'large' },
    { name: t('sizeDefault'), value: 'medium' },
    { name: t('sizeSmall'), value: 'small' }
])

const list_3 = computed(() => [
    { name: t('dirLeft'), value: 'left' },
    { name: t('dirRight'), value: 'right' },
    { name: t('dirUp'), value: 'up' },
    { name: t('dirDown'), value: 'down' }
])

const onClick = (name: string | number) => {
    uni.showToast({ title: t('clicked', name), icon: 'none' })
}

useShareButton()
</script>

<style scoped lang="scss"></style>
