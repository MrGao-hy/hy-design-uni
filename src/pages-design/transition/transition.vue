<template>
    <the-root-page>
        <the-cell :list="list" @click="onClick"></the-cell>

        <hy-transition :mode="mode" :show="show" :custom-style="style">
            <view class="transition"></view>
        </hy-transition>
    </the-root-page>
</template>

<script setup lang="ts">
import type { TransitionModeType } from '@/package'
import { computed, type CSSProperties, ref } from 'vue'
import { getWindowInfo } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '动画'
    }
})

const { t } = useTranslate('transition')
usePageTitle('transition')

const show = ref(false)
const mode = ref<TransitionModeType>('fade')
const style = computed((): CSSProperties => {
    return {
        position: 'fixed',
        top: `${getWindowInfo().windowHeight / 2 - 60}px`,
        left: `${getWindowInfo().windowWidth / 2 - 60}px`,
        width: '120px',
        height: '120px',
        backgroundColor: 'var(--hy-theme-color)'
    }
})

// 动画模式列表（computed 包裹以响应语言切换）
const list = computed(() => [
    { title: t('fade'), value: 'fade' },
    { title: t('fadeZoom'), value: 'fade-zoom' },
    { title: t('fadeUp'), value: 'fade-up' },
    { title: t('fadeDown'), value: 'fade-down' },
    { title: t('fadeLeft'), value: 'fade-left' },
    { title: t('fadeRight'), value: 'fade-right' },
    { title: t('slideUp'), value: 'slide-up' },
    { title: t('slideDown'), value: 'slide-down' },
    { title: t('slideLeft'), value: 'slide-left' },
    { title: t('slideRight'), value: 'slide-right' },
    { title: t('zoomIn'), value: 'zoom-in' },
    { title: t('zoomOut'), value: 'zoom-out' },
    { title: t('rotate'), value: 'rotate' },
    { title: t('flipX'), value: 'flip-x' },
    { title: t('flipY'), value: 'flip-y' },
    { title: t('bounce'), value: 'bounce' }
])

const onClick = (temp: CommonType.CellItem) => {
    mode.value = temp.value as TransitionModeType
    show.value = true
    setTimeout(() => {
        show.value = false
    }, 1500)
}

useShareButton()
</script>

<style scoped lang="scss">
.transition {
    background-color: $hy-primary;
}
</style>
