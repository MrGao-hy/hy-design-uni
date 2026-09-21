<template>
    <the-root-page>
        <view class="menu">
            <hy-menu v-model="current" :list="list" @change="onChange"></hy-menu>

            <scroll-view
                class="scroll-view"
                scroll-y
                scroll-with-animation
                :scroll-top="scrollTop"
                :throttle="false"
                @scroll="onScroll"
            >
                <view
                    :class="['item', `item--${item.id}`]"
                    v-for="(item, index) in data"
                    :key="index"
                >
                    <view class="hy-title">
                        <text class="text">{{ item.name }}</text>
                    </view>
                    <view class="hy-container">
                        <hy-grid
                            :list="item.children"
                            :col="2"
                            :custom-keys="{ icon: 'url', name: 'name' }"
                            :icon-config="{ size: 50 }"
                        ></hy-grid>
                    </view>
                </view>
            </scroll-view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue'
import type { MenuParamsVo } from '@/package/components/hy-menu/typing'
import { getRect, debounce, IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { getData } from './data'

definePage({
    style: {
        navigationBarTitleText: '侧边菜单栏'
    }
})

const { t } = useTranslate('menu')
usePageTitle('menu')

interface ItemTopVo {
    id: string | number
    top: number
}

const scrollTop = ref<number>(0)
const itemScrollTop = ref<ItemTopVo[]>([])
const current = ref<string | number>(1)
const execute = ref(false) // 防止点击change事件时候执行onScroll事件
// 菜单分类（computed 保证语言切换时响应）
const list = computed<MenuParamsVo[]>(() => [
    { id: 1, title: t('catRice'), value: 'buttonReverse', icon: IconConfig.PHOTO },
    { id: 2, title: t('catStirFry'), value: 'title', disabled: true },
    { id: 3, title: t('catNoodle'), value: 'showCancelButton', badge: 6 },
    { id: 4, title: t('catBurger'), value: 'buttonReverse' },
    { id: 5, title: t('catDrink'), value: 'buttonReverse' },
    { id: 6, title: t('catDumpling'), value: 'buttonReverse' },
    { id: 7, title: t('catSnack'), value: 'buttonReverse' },
    { id: 8, title: t('catChinese'), value: 'buttonReverse' },
    { id: 9, title: t('catWestern'), value: 'buttonReverse' },
    { id: 10, title: t('catFeast'), value: 'buttonReverse' }
])
// 内容区分类+菜品数据
const data = computed(() => getData(t))

onMounted(() => {
    nextTick(() => {
        list.value.forEach((item) => {
            // 需要吧instance放在里面，否则会失效
            const instance = getCurrentInstance()
            getRect(`.item--${item.id}`, false, instance).then((rect) => {
                itemScrollTop.value.push({
                    id: item.id as string | number,
                    top: (rect as UniApp.NodeInfo).top || 0
                })
            })
        })
    })
})

function onScroll(e: any) {
    const { scrollTop } = e.detail
    if (execute.value) {
        debounce(() => (execute.value = false))
        return
    }

    const res = itemScrollTop.value
        .sort((a, b) => b.top - a.top)
        .find((item) => scrollTop >= item.top)
    current.value = res?.id || 1
}

const onChange = (temp: MenuParamsVo) => {
    const res: ItemTopVo | undefined = itemScrollTop.value.find((item) => item.id === temp.id)
    scrollTop.value = res?.top || 0
    execute.value = true
}

useShareButton()
</script>

<style scoped lang="scss">
.menu {
    display: flex;
}
.scroll-view {
    padding: 20rpx;
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */
    box-sizing: border-box;
}
</style>
