<template>
    <view>
        <view class="hy-title">基础使用</view>
        <hy-rich-text
            :content="parseContent"
            :tag-style="tagStyle"
            selectable
        ></hy-rich-text>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton } from '@/composables'
import parseContent from './content'

definePage({
    style: {
        navigationBarTitleText: '富文本'
    }
})

usePageTitle('parse')

const tagStyle = ref({
    table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
    th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
    li: 'margin: 5px 0;'
})

useShareButton()
</script>

<style scoped lang="scss"></style>
