<template>
    <hy-index-bar
        v-model="currentActiveIndex"
        :position="position"
        :show-toast="showToast"
        :custom-style="barCustomStyle"
    >
        <view
            v-for="item in indexList"
            :key="item.index"
            class="hy-index-section"
        >
            <!-- 索引锚点：放入插槽后自动注册，滚动到对应分组时吸顶并高亮 -->
            <hy-index-anchor :index="item.index" />
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
    </hy-index-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue'
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
// 是否显示提示
const showToast = ref<boolean>(true)
// 当前激活的索引，由索引栏在滚动/点击时自动同步
const currentActiveIndex = ref<string>('')
// 索引栏容器需要确定高度，H5 需扣除导航栏占位，否则滚动会落到页面级
const barCustomStyle = {
    height: '100vh'
} as CSSProperties
// #ifdef H5
barCustomStyle.height = 'calc(100vh - 44px)'
// #endif
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

// 转换为索引列表格式，索引值由锚点自动收集，无需手动传入index-list
const indexList = computed(() => {
    return Object.keys(cityData.value)
        .sort()
        .map((key) => ({
            index: key,
            title: key,
            data: cityData.value[key]
        }))
})

useShareButton()
</script>

<style scoped lang="scss">
.hy-index-section {
    padding: $hy-border-margin-padding-base;

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
