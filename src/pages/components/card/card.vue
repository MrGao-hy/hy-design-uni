<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view>
            <hy-card
                title="刘德华（无敌最帅的人，唱歌又好听）"
                thumbCircle
                sub-title="釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放"
                right-text="2020-05-15"
                thumb="https://img0.baidu.com/it/u=3124282249,3904399666&fm=253"
                thumb-width="40"
                full
                :showHead="showHead"
                :showFoot="showFoot"
                :boxShadow="boxShadow"
                :paddingHead="padding"
                :paddingBody="padding"
                :paddingFoot="padding"
            >
                <template #body>
                    <view class="" slot="body">
                        <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
                            <view class="u-body-item-title u-line-2"
                                >瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view
                            >
                            <image
                                src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
                                mode="aspectFill"
                            ></image>
                        </view>
                        <view class="u-body-item u-flex u-row-between u-p-b-0">
                            <view class="u-body-item-title u-line-2"
                                >釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放</view
                            >
                            <image
                                src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
                                mode="aspectFill"
                            ></image>
                        </view>
                    </view>
                </template>
                <template #footer>
                    <view>
                        <HyIcon :name="IconConfig.MESSAGE" size="25" label="30评论"></HyIcon>
                    </view>
                </template>
            </hy-card>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">显示头部</view>
            <hy-switch v-model="showHead" />

            <view class="hy-title">显示尾部</view>
            <hy-switch v-model="showFoot" />

            <view class="hy-title">显示阴影</view>
            <hy-switch v-model="boxShadow" />

            <view class="hy-title">内边距</view>
            <hy-subsection :list="list" v-model="padding"></hy-subsection>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import HyCard from '@/package/components/hy-card/hy-card.vue'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import HySwitch from '@/package/components/hy-switch/hy-switch.vue'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const showHead = ref(true)
const showFoot = ref(true)
const boxShadow = ref(true)
const padding = ref(10)
const list = reactive([10, 20, 30, 40])
</script>

<style scoped lang="scss">
.u-card-wrap {
    padding: 1px;
}

.u-body-item {
    font-size: 32rpx;
    padding: 20rpx 10rpx;
}

.u-body-item image {
    width: 120rpx;
    flex: 0 0 120rpx;
    height: 120rpx;
    border-radius: 8rpx;
    margin-left: 12rpx;
}
</style>
