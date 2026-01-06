<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <!--        <hy-parse-->
        <!--            :content="parseContent"-->
        <!--            :tag-style="tagStyle"-->
        <!--            lazy-load-->
        <!--            scroll-table-->
        <!--            selectable-->
        <!--            use-anchor-->
        <!--        ></hy-parse>-->
    </hy-config-provider>
</template>

<script setup lang="ts">
// import HyParse from '@/package/components/hy-parse/hy-parse.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import parseContent from './content.js'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const tagStyle = {
    table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
    th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    li: 'margin: 5px 0;'
}
</script>

<style scoped lang="scss"></style>
