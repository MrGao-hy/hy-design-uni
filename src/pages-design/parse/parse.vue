<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <!--        <hy-parse-->
        <!--            :content="parseContent"-->
        <!--            :tag-style="tagStyle"-->
        <!--            lazy-load-->
        <!--            scroll-table-->
        <!--            selectable-->
        <!--            use-anchor-->
        <!--        ></hy-parse>-->
    </the-root-page>
</template>

<script setup lang="ts">
import parseContent from './content.js'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '富文本'
    }
})

const tagStyle = {
    table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
    th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    li: 'margin: 5px 0;'
}

useShareButton()
</script>

<style scoped lang="scss"></style>
