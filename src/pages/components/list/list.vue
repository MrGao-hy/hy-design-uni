<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-list
            :list="list"
            container-height="100vh"
            @scrollToLower="scrollButton"
            load="loading"
            padding="0"
            item-height="300"
            border-radius="10"
            :line="2"
        >
            <!--	#ifdef H5 || APP_PLUS	-->
            <template v-slot:left="{ record }">
                <view class="container" style="width: 100%; height: 100%">
                    <image
                        :src="record.url"
                        style="width: 100%; height: 70%"
                        mode="aspectFill"
                    ></image>
                    <view class="container-bottom">
                        <view>{{ record.name }}</view>
                        <view class="container-bottom__info"
                            >价格:<text style="color: red">{{ record.price }}</text></view
                        >
                    </view>
                </view>
            </template>
            <template #right="{ record }">
                <view class="container" style="width: 100%; height: 100%">
                    <image
                        :src="record.url"
                        style="width: 100%; height: 70%"
                        mode="aspectFill"
                    ></image>
                    <view class="container-bottom">
                        <view>{{ record.name }}</view>
                        <view class="container-bottom__info"
                            >价格:<text style="color: red">{{ record.price }}</text></view
                        >
                    </view>
                </view>
            </template>
            <!--	#endif	-->
            <!--	#ifndef H5 || APP_PLUS	-->
            <!-- 推荐使用这个写法，通用 -->
            <template #left-list="{ record }">
                <view class="list" v-for="item in record" :key="item.id">
                    <view class="list-item">
                        <view class="container" style="width: 100%; height: 100%">
                            <image
                                :src="item.url"
                                style="width: 100%; height: 70%"
                                mode="aspectFill"
                            ></image>
                            <view class="container-bottom">
                                <view>{{ item.name }}</view>
                                <view class="container-bottom__info"
                                    >价格:<text style="color: red">{{ item.price }}</text></view
                                >
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <template #right-list="{ record }">
                <view class="list" v-for="item in record" :key="item.id">
                    <view class="list-item">
                        <view class="container" style="width: 100%; height: 100%">
                            <image
                                :src="item.url"
                                style="width: 100%; height: 70%"
                                mode="aspectFill"
                            ></image>
                            <view class="container-bottom">
                                <view>{{ item.name }}</view>
                                <view class="container-bottom__info"
                                    >价格:<text style="color: red">{{ item.price }}</text></view
                                >
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <!--	#endif	-->
        </hy-list>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import HyList from '@/package/components/hy-list/hy-list.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const list = ref<AnyObject[]>([])
const page = reactive({
    current: 1,
    pageSize: 20
})

onMounted(() => {
    queryData()
})

const scrollButton = () => {
    page.current++
    queryData()
}

const queryData = () => {
    for (let i = (page.current - 1) * page.pageSize; i < page.current * page.pageSize; i++) {
        list.value.push({
            id: i,
            name: `阿莫西林胶囊_${i}`,
            url: 'https://img1.baidu.com/it/u=3643087685,1203558480&fm=253',
            price: '10.88'
        })
    }
}
</script>

<style scoped lang="scss">
.container {
    box-sizing: border-box;
    &-bottom {
        padding: 15rpx;
        background: $hy-background--container;
        height: 30%;
        box-sizing: border-box;
        transform: translateY(-10rpx);
        &__info {
            color: grey;
            font-size: 25rpx;
        }
    }
}
.list {
    &-item {
        height: 300px;
        box-sizing: border-box;
        border-radius: 10rpx;
        border: $hy-border-line;
        margin-bottom: 20rpx;
    }
}
</style>
