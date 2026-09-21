<template>
    <the-root-page>
        <view class="hy-box">
            <the-cell :list="list" @click="onClick"></the-cell>
        </view>

        <hy-popup
            safeAreaInsetTop
            :show="show"
            :mode="mode"
            closeable
            closeOnClickOverlay
            @close="show = false"
            round="10"
        >
            <view style="padding: 20px">{{ t('popupContent') }}</view>
        </hy-popup>
    </the-root-page>
</template>

<script setup lang="ts">
import type { LayoutType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '弹出层'
    }
})

const { t } = useTranslate('popup')
usePageTitle('popup')

const show = ref(false)
const mode = ref<LayoutType>('center')
const list = computed(() => [
    { title: t('posBottom'), value: 'bottom' },
    { title: t('posTop'), value: 'top' },
    { title: t('posCenter'), value: 'center' },
    { title: t('posRight'), value: 'right' },
    { title: t('posLeft'), value: 'left' }
])

const onClick = (temp: AnyObject) => {
    mode.value = temp.value as LayoutType
    show.value = true
}

useShareButton()
</script>

<style scoped lang="scss"></style>
