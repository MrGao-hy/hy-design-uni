<template>
    <scroll-view
        class="hy-scroll-view"
        scroll-y
        :scroll-into-view="scrollIntoView"
        @scroll="handleScroll"
    >
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
// scroll-into-view 锚点，用于点击/滑动索引时定位到对应分组
const scrollIntoView = ref<string>('')
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

onMounted(async () => {
    await nextTick()
    // 小程序端首帧节点可能尚未就绪，等待一帧再测量，避免漏测
    await sleep()
    const [rect, viewRect] = await Promise.all([
        getRect('.hy-index-section', true),
        getRect('.hy-scroll-view', false)
    ])
    // boundingClientRect 为视口坐标，需换算成相对滚动容器内容顶部的偏移，
    // 否则 H5 导航栏等占位会让定位与高亮计算出现固定偏差
    sectionRect.value = rect.map((item) => ({
        ...item,
        top: (item.top || 0) - (viewRect.top || 0)
    }))
})

// 处理滚动事件：根据滚动位置同步索引栏高亮
const handleScroll = (e: any) => {
    if (!isScroll.value) return
    const { scrollTop } = e.detail
    // 取最后一个顶部已滚过滚动位置的分组，天然兼容顶部与底部边界
    let activeIndex = 0
    sectionRect.value.forEach((item, index) => {
        if ((item.top || 0) <= scrollTop + 1) {
            activeIndex = index
        }
    })
    currentActiveIndex.value = indexs.value[activeIndex]
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
    try {
        // scroll-into-view 重复设置相同值不会触发滚动，先重置再定位
        scrollIntoView.value = ''
        await nextTick()
        scrollIntoView.value = `index-${i}`
        await sleep()
    } finally {
        isScroll.value = true
    }
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-scroll-view {
    width: 100%;
    /* H5 端页面高度不确定，height: 100% 会塌陷导致滚动发生在页面级，索引栏无法同步 */
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */
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
