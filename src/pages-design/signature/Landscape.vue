<template>
    <hy-signature height="100vh" @confirm="onConfirm"></hy-signature>
</template>

<script lang="ts" setup>
import type { SignatureResult } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '横向签名',
        pageOrientation: 'landscape'
    }
})

const onConfirm = (res: SignatureResult) => {
    uni.navigateBack()
}
</script>

<style scoped lang="scss"></style>
