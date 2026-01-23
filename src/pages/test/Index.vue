<template>
    <hy-modal></hy-modal>
    <hy-notice-bar
        :text="['欢迎使用华悦组件库, 这是集合vue3+ts+uniapp多框架组件适合你的第一个项目']"
    ></hy-notice-bar>

    <hy-button text="点击测试" @click="onClick"></hy-button>
    <hy-toast></hy-toast>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast, sleep } from '@/package'

const toast = useToast()

onMounted(() => {
    toast.error('测u哦呜')
})

const onClick = async () => {
    toast.loading()
    await sleep(2000)
    toast.close()
    await sleep(2000)
    toast.success('成功')
}
</script>

<style scoped></style>
