<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
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
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyIndexBar from '@/package/components/hy-index-bar/hy-index-bar.vue'
import HySubsection from '../../../package/components/hy-subsection/hy-subsection.vue'
import { ref, reactive, computed, getCurrentInstance, nextTick, onMounted } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getRect, sleep } from '@/package'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)

const instance = getCurrentInstance()
// 索引栏位置
const position = ref<string>('right')
const sectionRect = ref<UniNamespace.NodeInfo[]>([])
const scrollTop = ref<number>(0)
// 是否显示提示
const showToast = ref<boolean>(true)
// 当前激活的索引
const currentActiveIndex = ref<string>('')
const isScroll = ref<boolean>(true)
// 模拟城市数据
const cityData = reactive({
    A: ['安庆', '安阳', '鞍山', '安顺', '安康', '阿克苏', '阿勒泰'],
    B: [
        '北京',
        '上海',
        '广州',
        '深圳',
        '重庆',
        '成都',
        '杭州',
        '武汉',
        '西安',
        '苏州',
        '天津',
        '南京',
        '长沙',
        '郑州',
        '东莞',
        '青岛',
        '沈阳',
        '宁波',
        '昆明'
    ],
    C: ['长春', '常州', '长沙', '成都', '重庆', '福州', '长春', '长沙'],
    D: ['大连', '东莞', '德州', '大同', '大庆', '大理'],
    E: ['鄂州', '恩施', '鄂州'],
    F: ['福州', '佛山', '抚顺', '阜新', '阜阳', '抚州'],
    G: ['广州', '贵阳', '桂林', '赣州', '广元', '广安'],
    H: ['杭州', '合肥', '哈尔滨', '海口', '呼和浩特', '湖州', '邯郸', '汉中', '衡水'],
    J: ['济南', '长春', '吉林', '锦州', '荆州', '荆门', '晋江'],
    K: ['昆明', '开封', '克拉玛依', '喀什'],
    L: ['兰州', '洛阳', '临沂', '聊城', '龙岩', '丽江'],
    M: ['绵阳', '马鞍山', '茂名', '梅州', '眉山'],
    N: ['南京', '南昌', '南宁', '南通', '宁波', '南阳', '南充'],
    P: ['平顶山', '盘锦', '攀枝花', '萍乡'],
    Q: ['青岛', '泉州', '曲靖', '秦皇岛', '齐齐哈尔', '庆阳'],
    R: ['日照', '日喀则', '荣昌'],
    S: ['深圳', '苏州', '沈阳', '石家庄', '绍兴', '厦门', '商丘', '上饶', '十堰'],
    T: ['天津', '太原', '唐山', '泰州', '台州', '通辽', '吐鲁番'],
    W: ['武汉', '西安', '温州', '无锡', '潍坊', '乌鲁木齐', '威海', '渭南'],
    X: ['西安', '厦门', '徐州', '新乡', '信阳', '襄阳', '西宁'],
    Y: ['烟台', '扬州', '宜昌', '岳阳', '延安', '银川', '运城'],
    Z: ['郑州', '株洲', '珠海', '中山', '湛江', '肇庆', '张家口', '枣庄']
})

// 转换为索引列表格式
const indexList = computed(() => {
    return Object.keys(cityData)
        .sort()
        .map((key) => ({
            index: key,
            title: key,
            data: cityData[key as keyof typeof cityData]
        }))
})
const indexs = computed(() => {
    return Object.keys(cityData).sort()
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
        const index = sectionRect.value.findIndex((item) => item.top - 1 > scrollTop) - 1
        const keys = Object.keys(cityData)
        currentActiveIndex.value = keys[index]
    }
}

// 处理索引点击事件
const handleIndexClick = (index: string, event: Event) => {
    scrollToSection(index)
}

// 处理索引滚动事件
const handleIndexScroll = (index: string) => {
    scrollToSection(index)
}

const scrollToSection = async (i: string) => {
    isScroll.value = false
    const index = Object.keys(cityData).findIndex((item) => item === i)
    scrollTop.value = sectionRect.value[index]?.top!
    await sleep()
    isScroll.value = true
}
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
        border-radius: $hy-border-radius-base;
        background: $hy-background--container;
    }
}
</style>
