<template>
    <hy-modal></hy-modal>
    <hy-notice-bar
        :text="['欢迎使用华悦组件库, 这是集合vue3+ts+uniapp多框架组件适合你的第一个项目']"
    ></hy-notice-bar>

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
            await sleep(3000)
        }
    })
}
</script>

<style scoped></style>
