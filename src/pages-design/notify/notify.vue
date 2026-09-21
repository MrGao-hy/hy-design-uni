<template>
    <the-root-page>
        <the-cell :list="list" @click="showToast"></the-cell>
        <hy-notify ref="hyNotifyRef"></hy-notify>
    </the-root-page>
</template>

<script setup lang="ts">
import HyNotify from '@/package/components/hy-notify/hy-notify.vue'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import type { INotifyExpose } from '@/package/components/hy-notify/typing'

definePage({
    style: {
        navigationBarTitleText: '消息提示'
    }
})

const { t } = useTranslate('notify')
usePageTitle('notify')

const hyNotifyRef = ref<InstanceType<typeof HyNotify> | INotifyExpose>()
const list = computed(() => [
    {
        title: t('typeDefault'),
        value: 'info'
    },
    { title: t('typePrimary'), value: 'primary' },
    { title: t('typeSuccess'), value: 'success' },
    { title: t('typeError'), value: 'error' },
    { title: t('typeWarning'), value: 'warning' }
])

const showToast = (params: { title: string; value: string }) => {
    hyNotifyRef.value &&
        hyNotifyRef.value.show({
            message: `${params.title}${t('tipMessage')}`,
            type: params.value
        })
}

useShareButton()
</script>

<style scoped lang="scss"></style>
