<template>
    <hy-modal></hy-modal>

    <view @tap="onClick">111</view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMessage, sleep } from '@/package'

const message = useMessage()

onMounted(() => {})

const onClick = () => {
    message.alert({
        title: '首页',
        confirm: async () => {
            return await sleep(3000)
        }
    })
}
</script>

<style scoped></style>
