<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view>
            <hy-card
                :title="t('cardTitle')"
                thumbCircle
                :sub-title="t('cardSubTitle')"
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
                            <view class="u-body-item-title u-line-2">{{ t('bodyText') }}</view>
                            <hy-image :src="config.swiper1" width="100%" :radius="10"></hy-image>
                        </view>
                        <view class="u-body-item u-flex u-row-between u-p-b-0">
                            <view class="u-body-item-title u-line-2">{{ t('cardSubTitle') }}</view>
                            <hy-image :src="config.swiper2" width="100%" :radius="10"></hy-image>
                        </view>
                    </view>
                </template>
                <template #footer>
                    <view>
                        <hy-icon
                            :name="IconConfig.MESSAGE"
                            size="25"
                            :label="t('commentCount')"
                        ></hy-icon>
                    </view>
                </template>
            </hy-card>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('showHead') }}</view>
            <hy-switch v-model="showHead" />

            <view class="hy-title">{{ t('showFoot') }}</view>
            <hy-switch v-model="showFoot" />

            <view class="hy-title">{{ t('showShadow') }}</view>
            <hy-switch v-model="boxShadow" />

            <view class="hy-title">{{ t('padding') }}</view>
            <hy-subsection :list="list" v-model="padding"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import { reactive, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '卡片'
    }
})

const { t } = useTranslate('card')
usePageTitle('card')

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
