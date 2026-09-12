<template>
    <hy-signature height="100vh" @confirm="onConfirm"></hy-signature>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import type { SignatureResult } from '@/package'
import { useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '横向签名',
        pageOrientation: 'landscape'
    }
})

const { t } = useTranslate('signature')
// 横向签名子页面，手动覆盖标题以保留「横向签名」
onShow(() => uni.setNavigationBarTitle({ title: t('landscapeTitle') }))

const onConfirm = (res: SignatureResult) => {
    uni.navigateBack()
}
</script>

<style scoped lang="scss"></style>
