<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <the-cell :list="list" @click="onChange"></the-cell>

        <hy-action-sheet
            v-model="list[0].value"
            :actions="actions"
            @select="onClick"
        ></hy-action-sheet>
        <hy-action-sheet
            v-model="list[1].value"
            :actions="actions"
            title="我是标题"
            @select="onClick"
        ></hy-action-sheet>
        <hy-action-sheet
            v-model="list[2].value"
            :actions="actions"
            cancel-text="取消"
            @select="onClick"
        ></hy-action-sheet>
        <hy-action-sheet
            v-model="list[3].value"
            :actions="actions2"
            @select="onClick"
        ></hy-action-sheet>
        <hy-action-sheet
            v-model="list[4].value"
            :panels="panels"
            title="分享给"
            titleAlign="left"
            @select="onClick"
        ></hy-action-sheet>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyActionSheet from '@/package/components/hy-action-sheet/hy-action-sheet.vue'
import TheCell from '@/components/TheCell.vue'
import { useThemeStore } from '@/store'
import { ref, reactive } from 'vue'
import type { IActionSheetAction } from '@/package/components/hy-action-sheet/typing'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '操作菜单'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const list = reactive([
    { title: '基础使用', value: false },
    { title: '带标题', value: false },
    { title: '带取消', value: false },
    { title: '加载', value: false },
    { title: '自定义面板', value: false }
])
const actions = ref<IActionSheetAction[]>([
    {
        name: '选项1'
    },
    {
        name: '选项2',
        disabled: true
    },
    {
        name: '选项3',
        sub: '描述信息'
    }
])
const actions2 = ref<IActionSheetAction[]>([
    {
        name: '选项1'
    },
    {
        name: '选项2',
        loading: true
    },
    {
        name: '选项3'
    }
])
const panels = ref([
    [
        {
            iconUrl:
                'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: '微信'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            name: '微博'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            name: 'QQ'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            name: '收藏'
        },
        {
            iconUrl:
                'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: '微信'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            name: 'weiXinPengYouQuan'
        },
        {
            iconUrl:
                'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: 'weiXinHaoYou'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            name: 'weiXinPengYouQuan'
        }
    ],
    [
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            name: 'qq'
        },
        {
            iconUrl:
                'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            name: '微信收藏'
        },
        {
            iconUrl:
                'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: '微信好友'
        }
    ]
])

const onChange = (temp: any, index: number) => {
    list[index].value = true
}

const onClick = (temp: any) => {
    uni.showToast({ title: `点击了${temp.item.name}`, icon: 'none' })
}

useShareButton()
</script>

<style scoped lang="scss"></style>
