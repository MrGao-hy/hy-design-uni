<template>
    <the-root-page>
        <scroll-view class="hy-scroll-view" scroll-y :scroll-top="scrollTop" @scroll="handleScroll">
            <view
                v-for="item in indexList"
                :key="item.index"
                class="hy-index-section"
                :id="`index-${item.index}`"
            >
                <view class="hy-index-section__title hy-title">{{ item.index }}</view>
                <view class="hy-index-section__container">
                    <view
                        v-for="(city, cityIndex) in item.data"
                        :key="cityIndex"
                        class="hy-index-section__item"
                    >
                        {{ city }}
                    </view>
                </view>
            </view>
        </scroll-view>

        <hy-index-bar
            v-model="currentActiveIndex"
            :index-list="indexs"
            :position="position"
            :show-toast="showToast"
            @click="handleIndexClick"
            @scroll="handleIndexScroll"
        />
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { getRect, sleep } from '@/package'
import type { LeftRightType } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '索引栏'
    }
})

const { t } = useTranslate('indexBar')
usePageTitle('indexBar')

// 索引栏位置
const position = ref<LeftRightType>('right')
const sectionRect = ref<UniNamespace.NodeInfo[]>([])
const scrollTop = ref<number>(0)
// 是否显示提示
const showToast = ref<boolean>(true)
// 当前激活的索引
const currentActiveIndex = ref<string>('')
const isScroll = ref<boolean>(true)
// 模拟城市数据（key 对应 locale 的 cityNames）
const cityKeys: Record<string, string[]> = {
    A: ['anqing', 'anyang', 'anshan', 'anshun', 'ankang', 'aksu', 'altay'],
    B: [
        'beijing',
        'shanghai',
        'guangzhou',
        'shenzhen',
        'chongqing',
        'chengdu',
        'hangzhou',
        'wuhan',
        'xian',
        'suzhou',
        'tianjin',
        'nanjing',
        'changsha',
        'zhengzhou',
        'dongguan',
        'qingdao',
        'shenyang',
        'ningbo',
        'kunming'
    ],
    C: [
        'changchun',
        'changzhou',
        'changsha',
        'chengdu',
        'chongqing',
        'fuzhou',
        'changchun',
        'changsha'
    ],
    D: ['dalian', 'dongguan', 'dezhou', 'datong', 'daqing', 'dali'],
    E: ['ezhou', 'enshi', 'ezhou'],
    F: ['fuzhou', 'foshan', 'fushun', 'fuxin', 'fuyang', 'fuzhouJx'],
    G: ['guangzhou', 'guiyang', 'guilin', 'ganzhou', 'guangyuan', 'guangan'],
    H: [
        'hangzhou',
        'hefei',
        'harbin',
        'haikou',
        'huhhot',
        'huzhou',
        'handan',
        'hanzhong',
        'hengshui'
    ],
    J: ['jinan', 'changchun', 'jilin', 'jinzhou', 'jingzhou', 'jingmen', 'jinjiang'],
    K: ['kunming', 'kaifeng', 'karamay', 'kashgar'],
    L: ['lanzhou', 'luoyang', 'linyi', 'liaocheng', 'longyan', 'lijiang'],
    M: ['mianyang', 'maanshan', 'maoming', 'meizhou', 'meishan'],
    N: ['nanjing', 'nanchang', 'nanning', 'nantong', 'ningbo', 'nanyang', 'nanchong'],
    P: ['pingdingshan', 'panjin', 'panzhihua', 'pingxiang'],
    Q: ['qingdao', 'quanzhou', 'qujing', 'qinhuangdao', 'qiqihar', 'qingyang'],
    R: ['rizhao', 'xigaze', 'rongchang'],
    S: [
        'shenzhen',
        'suzhou',
        'shenyang',
        'shijiazhuang',
        'shaoxing',
        'xiamen',
        'shangqiu',
        'shangrao',
        'shiyan'
    ],
    T: ['tianjin', 'taiyuan', 'tangshan', 'taizhou', 'taizhouZj', 'tongliao', 'turpan'],
    W: ['wuhan', 'xian', 'wenzhou', 'wuxi', 'weifang', 'urumqi', 'weihai', 'weinan'],
    X: ['xian', 'xiamen', 'xuzhou', 'xinxiang', 'xinyang', 'xiangyang', 'xining'],
    Y: ['yantai', 'yangzhou', 'yichang', 'yueyang', 'yanan', 'yinchuan', 'yuncheng'],
    Z: [
        'zhengzhou',
        'zhuzhou',
        'zhuhai',
        'zhongshan',
        'zhanjiang',
        'zhaoqing',
        'zhangjiakou',
        'zaozhuang'
    ]
}

// 城市名响应语言切换
const cityData = computed<Record<string, string[]>>(() => {
    const result: Record<string, string[]> = {}
    Object.keys(cityKeys).forEach((key) => {
        result[key] = cityKeys[key].map((c) => t(`cityNames.${c}`))
    })
    return result
})

// 转换为索引列表格式
const indexList = computed(() => {
    return Object.keys(cityData.value)
        .sort()
        .map((key) => ({
            index: key,
            title: key,
            data: cityData.value[key]
        }))
})
const indexs = computed(() => {
    return Object.keys(cityData.value).sort()
})

onMounted(() => {
    nextTick(() => {
        getRect('.hy-index-section', true).then((rect) => {
            sectionRect.value = rect
        })
    })
})

// 处理滚动事件
const handleScroll = (e: any) => {
    // 使用uni.createSelectorQuery()获取所有索引section的位置信息
    const scrollTop = e.detail.scrollTop
    if (isScroll.value) {
        const index = sectionRect.value.findIndex((item) => item.top! - 1 > scrollTop) - 1
        const keys = Object.keys(cityData.value)
        currentActiveIndex.value = keys[index]
    }
}

// 处理索引点击事件
const handleIndexClick = (index: string | number, event: Event) => {
    scrollToSection(index)
}

// 处理索引滚动事件
const handleIndexScroll = (index: string | number) => {
    scrollToSection(index)
}

const scrollToSection = async (i: string | number) => {
    isScroll.value = false
    const index = Object.keys(cityData.value).findIndex((item) => item === i)
    scrollTop.value = sectionRect.value[index]?.top!
    await sleep()
    isScroll.value = true
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-scroll-view {
    width: 100%;
    height: 100%;
}

.hy-index-section {
    padding: $hy-border-margin-padding-base;

    @include e(title) {
    }

    @include e(item) {
        font-size: 28rpx;
        padding: $hy-border-margin-padding-base;
        border-bottom: $hy-border-line;
        &:last-child {
            border: none;
        }
    }

    @include e(container) {
        padding: $hy-border-margin-padding-base 0;
        border-radius: $hy-radius-base;
        background: $hy-background--container;
    }
}
</style>
