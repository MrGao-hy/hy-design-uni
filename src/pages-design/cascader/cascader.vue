<template>
    <the-root-page>
        <view class="hy-title">基础用法</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="选择地区"
                    :value="selectedValue.label.join(' / ')"
                    @click="showCascader = true"
                >
                </hy-cell-item>
            </hy-cell>
            <hy-cascader
                v-model="selectedValue"
                v-model:show="showCascader"
                :options="options"
                @close="showCascader = false"
                @confirm="onConfirm"
            ></hy-cascader>
        </view>

        <view class="hy-title">带输入框</view>
        <view class="hy-container">
            <hy-cascader
                v-model="selectedValue2"
                :options="chinaOptions"
                has-input
                title="请选择地址"
                placeholder="请选择地区"
                labelKey="name"
                valueKey="code"
                childrenKey="areas"
            ></hy-cascader>
        </view>

        <view class="hy-title">异步加载</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="异步选择"
                    :value="selectedValue3.label.join(' / ')"
                    @click="showAsyncCascader = true"
                >
                </hy-cell-item>
            </hy-cell>
            <hy-cascader
                v-model="selectedValue3"
                v-model:show="showAsyncCascader"
                :lazy-load="lazyLoad"
                title="异步加载示例"
                @confirm="onAsyncConfirm"
            ></hy-cascader>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useShareButton } from '@/composables'
import geoJson from '@/package/libs/utils/address.json'

definePage({
    style: {
        navigationBarTitleText: '级联选择器'
    }
})

const showCascader = ref(false)
const showAsyncCascader = ref(false)

const selectedValue = ref({ value: [], label: [] })
const selectedValue2 = ref({ value: [], label: [] })
const selectedValue3 = ref({ value: [], label: [] })

const chinaOptions = reactive(geoJson)
const options = reactive([
    {
        value: 'gansu',
        label: '甘肃省',
        children: [
            {
                value: 'jinchang',
                label: '金昌市',
                children: [
                    {
                        value: 'jinchuan',
                        label: '金川区'
                    },
                    {
                        value: 'yongchang',
                        label: '永昌县'
                    }
                ]
            },
            {
                value: 'lanzhou',
                label: '兰州市',
                children: [
                    {
                        value: 'chengguan',
                        label: '城关区'
                    },
                    {
                        value: '安宁',
                        label: '安宁区'
                    }
                ]
            }
        ]
    },
    {
        value: 'qinghai',
        label: '青海省',
        children: [
            {
                value: 'xining',
                label: '西宁市',
                children: [
                    {
                        value: 'chengxi',
                        label: '城西区'
                    },
                    {
                        value: 'chengdong',
                        label: '城东区'
                    }
                ]
            }
        ]
    }
])

const onConfirm = (params: any) => {
    console.log('确认选择:', params)
    showCascader.value = false
}

const asyncOptions = {
    root: [
        { value: 'beijing', label: '北京市' },
        { value: 'shanghai', label: '上海市' },
        { value: 'guangzhou', label: '广州市' },
        { value: 'shenzhen', label: '深圳市' }
    ],
    beijing: [
        { value: 'dongcheng', label: '东城区' },
        { value: 'xicheng', label: '西城区' },
        { value: 'chaoyang', label: '朝阳区' },
        { value: 'haidian', label: '海淀区', isLeaf: true }
    ],
    shanghai: [
        { value: 'huangpu', label: '黄浦区' },
        { value: "jing'an", label: '静安区' },
        { value: 'xuhui', label: '徐汇区' },
        { value: 'pudong', label: '浦东新区' }
    ],
    guangzhou: [
        { value: 'tianhe', label: '天河区' },
        { value: 'yuexiu', label: '越秀区' },
        { value: 'liwan', label: '荔湾区' }
    ],
    shenzhen: [
        { value: 'futian', label: '福田区' },
        { value: 'nanshan', label: '南山区' },
        { value: "bao'an", label: '宝安区' }
    ],
    dongcheng: [
        { value: 'chongwen', label: '崇文门' },
        { value: 'wangfujing', label: '王府井' }
    ],
    xicheng: [
        { value: "xi'anmen", label: '西直门' },
        { value: 'fuxingmen', label: '复兴门' }
    ],
    chaoyang: [
        { value: 'sanlitun', label: '三里屯' },
        { value: 'cbd', label: 'CBD' }
    ],
    huangpu: [
        { value: 'bund', label: '外滩' },
        { value: 'people-square', label: '人民广场' }
    ],
    "jing'an": [
        { value: "jing'an-temple", label: '静安寺' },
        { value: 'nanjing-west', label: '南京西路' }
    ],
    tianhe: [
        { value: 'teemall', label: '天河城' },
        { value: 'canton-tower', label: '广州塔' }
    ],
    futian: [
        { value: 'cbd-futian', label: '福田CBD' },
        { value: 'shenzhen-university', label: '深圳大学' }
    ],
    nanshan: [
        { value: 'high-tech', label: '科技园' },
        { value: 'window-of-world', label: '世界之窗' }
    ]
}

const lazyLoad = (option: any, tabIndex: number, resolve: (children: any[]) => void) => {
    setTimeout(() => {
        const value = option ? option.value : 'root'
        const children = asyncOptions[value] || []
        resolve(children)
    }, 2000)
}

const onAsyncConfirm = (params: any) => {
    console.log('异步确认选择:', params)
    showAsyncCascader.value = false
}

useShareButton()
</script>

<style scoped lang="scss"></style>
