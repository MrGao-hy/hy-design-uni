<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view>
            <hy-card
                title="刘德华（无敌最帅的人，唱歌又好听）"
                thumbCircle
                sub-title="釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放"
                right-text="2020-05-15"
                :thumb="config.avatar"
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
                            <hy-image :src="config.swiper1" width="100%" :radius="10"></hy-image>
                        </view>
                        <view class="u-body-item u-flex u-row-between u-p-b-0">
                            <view class="u-body-item-title u-line-2"
                                >釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放</view
                            >
                            <hy-image :src="config.swiper2" width="100%" :radius="10"></hy-image>
                        </view>
                    </view>
                </template>
                <template #footer>
                    <view>
                        <hy-icon :name="IconConfig.MESSAGE" size="25" label="30评论"></hy-icon>
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
    </the-root-page>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import { reactive, ref } from 'vue'
import { useShareButton } from '@/composables'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '卡片'
    }
})

const showHead = ref(true)
const showFoot = ref(true)
const boxShadow = ref(true)
const padding = ref(10)
const list = reactive([10, 20, 30, 40])

useShareButton()
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
