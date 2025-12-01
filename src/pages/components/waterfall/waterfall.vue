<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-waterfall v-model="flowList" ref="waterfallRef">
            <template v-slot:left="{ leftList }">
                <view class="demo-water" v-for="(item, index) in leftList" :key="index">
                    <!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
                    <hy-image width="100%" mode="widthFix" radius="5" :src="item.image"></hy-image>
                    <view class="demo-title">{{ item.title }}</view>
                    <view class="demo-price">{{ item.price }}元</view>
                    <view class="demo-tag">
                        <view class="demo-tag-owner">
                            <text class="text">自营</text>
                        </view>
                        <view class="demo-tag-text">
                            <text class="text">放心购</text>
                        </view>
                    </view>
                    <view class="demo-shop">{{ item.shop }}</view>
                    <view class="u-close">
                        <hy-icon
                            :name="IconConfig.CLOSE_CIRCLE_FILL"
                            color="#fa3534"
                            size="24"
                            @click="remove(item.id)"
                        ></hy-icon>
                    </view>
                </view>
            </template>
            <template v-slot:right="{ rightList }">
                <view class="demo-water" v-for="(item, index) in rightList" :key="index">
                    <hy-image width="100%" mode="widthFix" radius="5" :src="item.image"></hy-image>
                    <view class="demo-title">{{ item.title }}</view>
                    <view class="demo-price">{{ item.price }}元</view>
                    <view class="demo-tag">
                        <view class="demo-tag-owner">
                            <text class="text">自营</text>
                        </view>
                        <view class="demo-tag-text">
                            <text class="text">放心购</text>
                        </view>
                    </view>
                    <view class="demo-shop">{{ item.shop }}</view>
                    <view class="u-close">
                        <hy-icon
                            :name="IconConfig.CLOSE_CIRCLE_FILL"
                            color="#fa3534"
                            size="24"
                            @click="remove(item.id)"
                        ></hy-icon>
                    </view>
                </view>
            </template>
        </hy-waterfall>
        <hy-divider :text="loadStatus"></hy-divider>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { guid, random } from '@/package'
import list from './data'
import { onReachBottom } from '@dcloudio/uni-app'
import { IconConfig } from '@/package'

import HyWaterfall from '@/package/components/hy-waterfall/hy-waterfall.vue'
import HyImage from '@/package/components/hy-image/hy-image.vue'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'
import HyDivider from '@/package/components/hy-divider/hy-divider.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const flowList = ref<Record<string, any>[]>([])
const waterfallRef = ref()
const loadStatus = ref('noMore')

onMounted(() => {
    addRandomData()
})
onReachBottom(() => {
    loadStatus.value = 'loading'
    // 模拟数据加载
    setTimeout(() => {
        addRandomData()
        loadStatus.value = 'loadmore'
    }, 1000)
})

const addRandomData = () => {
    for (let i = 0; i < 20; i++) {
        let index = random(0, list.length - 1)
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(list[index]))
        item.id = guid()
        flowList.value.push(item)
    }
}
const remove = (id: string) => {
    waterfallRef.value.remove(id)
}
const clear = () => {
    waterfallRef.value.clear()
}
</script>

<style scoped lang="scss">
/* 暗色主题 */
@include b(theme--dark) {
    .demo-water {
        background-color: $hy-background--container;
    }
    .demo-shop {
    }
}
.demo-water {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    padding: 8px;
    position: relative;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
    .u-close {
        position: absolute;
        top: -6px;
        right: -3px;
        opacity: 0;
    }
    /* #ifdef H5 */
    &:hover {
        .u-close {
            opacity: 1;
        }
    }
    /* #endif */
}

.demo-img-wrap {
}

.demo-image {
    width: 100%;
    border-radius: 4px;
}

.demo-title {
    font-size: 30rpx;
    margin-top: 5px;
    /* #ifndef APP-NVUE */
    word-break: break-all;
    /* #endif */
}

.demo-tag {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
}

.demo-tag-owner {
    background-color: $hy-error;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 7px;
    border-radius: 20px;
    line-height: 1;
    .text {
        font-size: 12px;
        color: #ffffff;
    }
}

.demo-tag-text {
    border: 1px solid $hy-primary;
    margin-left: 10px;
    border-radius: 20rpx;
    line-height: 1;
    padding: 2px 7px;
    display: flex;
    align-items: center;
    .text {
        font-size: 12px;
        color: $hy-primary;
    }
}

.demo-price {
    font-size: 30rpx;
    color: $hy-error;
    margin-top: 5px;
}

.demo-shop {
    font-size: 22rpx;
    color: $hy-text-color--grey;
    margin-top: 5px;
}
</style>
