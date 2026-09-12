<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('selectRegion')"
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

        <view class="hy-title">{{ t('withInput') }}</view>
        <view class="hy-container">
            <hy-cascader
                v-model="selectedValue2"
                :options="chinaOptions"
                has-input
                :title="t('selectAddress')"
                :placeholder="t('placeholder')"
                labelKey="name"
                valueKey="code"
                childrenKey="areas"
            ></hy-cascader>
        </view>

        <view class="hy-title">{{ t('asyncLoad') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('asyncSelect')"
                    :value="selectedValue3.label.join(' / ')"
                    @click="showAsyncCascader = true"
                >
                </hy-cell-item>
            </hy-cell>
            <hy-cascader
                v-model="selectedValue3"
                v-model:show="showAsyncCascader"
                :lazy-load="lazyLoad"
                :title="t('asyncDemoTitle')"
                @confirm="onAsyncConfirm"
            ></hy-cascader>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import geoJson from '@/package/libs/utils/address.json'

definePage({
    style: {
        navigationBarTitleText: '级联选择器'
    }
})

const { t } = useTranslate('cascader')
usePageTitle('cascader')

const showCascader = ref(false)
const showAsyncCascader = ref(false)

const selectedValue = ref({ value: [], label: [] })
const selectedValue2 = ref({ value: [], label: [] })
const selectedValue3 = ref({ value: [], label: [] })

const chinaOptions = reactive(geoJson)
// 静态选项：value 与 locale cascader.region.* 的 key 对应
const options = computed(() => [
    {
        value: 'gansu',
        label: t('region.gansu'),
        children: [
            {
                value: 'jinchang',
                label: t('region.jinchang'),
                children: [
                    {
                        value: 'jinchuan',
                        label: t('region.jinchuan')
                    },
                    {
                        value: 'yongchang',
                        label: t('region.yongchang')
                    }
                ]
            },
            {
                value: 'lanzhou',
                label: t('region.lanzhou'),
                children: [
                    {
                        value: 'chengguan',
                        label: t('region.chengguan')
                    },
                    {
                        value: 'anning',
                        label: t('region.anning')
                    }
                ]
            }
        ]
    },
    {
        value: 'qinghai',
        label: t('region.qinghai'),
        children: [
            {
                value: 'xining',
                label: t('region.xining'),
                children: [
                    {
                        value: 'chengxi',
                        label: t('region.chengxi')
                    },
                    {
                        value: 'chengdong',
                        label: t('region.chengdong')
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

// 异步级联选项
interface IAsyncOption {
    value: string
    label: string
    isLeaf?: boolean
}

// 异步选项数据：value 同时作为子级数据的查找 key，并与 locale cascader.region.* 对应
const asyncOptions = computed<Record<string, IAsyncOption[]>>(() => ({
    root: [
        { value: 'beijing', label: t('region.beijing') },
        { value: 'shanghai', label: t('region.shanghai') },
        { value: 'guangzhou', label: t('region.guangzhou') },
        { value: 'shenzhen', label: t('region.shenzhen') }
    ],
    beijing: [
        { value: 'dongcheng', label: t('region.dongcheng') },
        { value: 'xicheng', label: t('region.xicheng') },
        { value: 'chaoyang', label: t('region.chaoyang') },
        { value: 'haidian', label: t('region.haidian'), isLeaf: true }
    ],
    shanghai: [
        { value: 'huangpu', label: t('region.huangpu') },
        { value: 'jingan', label: t('region.jingan') },
        { value: 'xuhui', label: t('region.xuhui') },
        { value: 'pudong', label: t('region.pudong') }
    ],
    guangzhou: [
        { value: 'tianhe', label: t('region.tianhe') },
        { value: 'yuexiu', label: t('region.yuexiu') },
        { value: 'liwan', label: t('region.liwan') }
    ],
    shenzhen: [
        { value: 'futian', label: t('region.futian') },
        { value: 'nanshan', label: t('region.nanshan') },
        { value: 'baoan', label: t('region.baoan') }
    ],
    dongcheng: [
        { value: 'chongwenmen', label: t('region.chongwenmen') },
        { value: 'wangfujing', label: t('region.wangfujing') }
    ],
    xicheng: [
        { value: 'xizhimen', label: t('region.xizhimen') },
        { value: 'fuxingmen', label: t('region.fuxingmen') }
    ],
    chaoyang: [
        { value: 'sanlitun', label: t('region.sanlitun') },
        { value: 'cbd', label: 'CBD' }
    ],
    huangpu: [
        { value: 'bund', label: t('region.bund') },
        { value: 'peopleSquare', label: t('region.peopleSquare') }
    ],
    jingan: [
        { value: 'jinganTemple', label: t('region.jinganTemple') },
        { value: 'nanjingWest', label: t('region.nanjingWest') }
    ],
    tianhe: [
        { value: 'teemall', label: t('region.teemall') },
        { value: 'cantonTower', label: t('region.cantonTower') }
    ],
    futian: [
        { value: 'cbdFutian', label: t('region.cbdFutian') },
        { value: 'szUniversity', label: t('region.szUniversity') }
    ],
    nanshan: [
        { value: 'highTechPark', label: t('region.highTechPark') },
        { value: 'windowOfWorld', label: t('region.windowOfWorld') }
    ]
}))

const lazyLoad = (option: any, tabIndex: number, resolve: (children: any[]) => void) => {
    setTimeout(() => {
        const value = option ? option.value : 'root'
        const children = asyncOptions.value[value] || []
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
