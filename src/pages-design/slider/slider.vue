<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <hy-slider v-model="value"></hy-slider>

        <view class="hy-title">设置最大最小值</view>
        <hy-slider v-model="value" showValue :min="10" :max="50"></hy-slider>

        <view class="hy-title">自定义颜色</view>
        <hy-slider v-model="value" active-color="red" block-color="red"></hy-slider>

        <view class="hy-title">自定义宽度</view>
        <view style="width: 500rpx">
            <hy-slider v-model="value" :blockSize="30" height="8"></hy-slider>

            <hy-slider isRange showValue v-model:rangeValue="value_2"></hy-slider>
        </view>

        <view class="hy-title">小数点</view>
        <hy-slider v-model="value_3" :min="0" :max="1" :step="0.1" show-value></hy-slider>

        <view class="hy-title">区间选择</view>
        <hy-slider isRange showValue v-model:rangeValue="value_2"></hy-slider>

        <view class="hy-title">弹窗内使用</view>
        <hy-button text="打开弹窗调节" type="primary" @click="showPopup = true"></hy-button>
        <view class="popup-tip">当前值：{{ popupValue }}</view>

        <view class="hy-title">自定义滑块</view>
        <hy-slider v-model="value">
            <template #default>
                <view>
                    <svg
                        t="1722094047017"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="11063"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M965.12 469.333333c-81.493333-90.88-230.186667-149.333333-378.453333-149.333333h-6.826667a193.28 193.28 0 0 0-289.493333-109.226667 188.373333 188.373333 0 0 0-51.2 47.36 42.666667 42.666667 0 0 0-2.773334 45.653334 42.666667 42.666667 0 0 0 42.666667 21.333333A149.333333 149.333333 0 0 1 384 355.626667l-16.426667 6.4A42.666667 42.666667 0 0 0 341.333333 401.28v221.44A42.666667 42.666667 0 0 0 367.36 661.333333l16.64 7.466667a150.4 150.4 0 0 1-106.666667 30.506667 42.666667 42.666667 0 0 0-42.666666 21.333333 42.666667 42.666667 0 0 0 2.773333 45.866667 187.946667 187.946667 0 0 0 51.2 47.36 194.56 194.56 0 0 0 103.893333 29.653333A192 192 0 0 0 580.053333 704h6.613334c149.333333 0 296.96-58.666667 378.453333-149.333333a64 64 0 0 0 0-85.333334z m-535.68-130.773333a192 192 0 0 0-155.946667-55.04 146.133333 146.133333 0 0 1 39.68-36.693333 152.533333 152.533333 0 0 1 176.213334 10.24 149.333333 149.333333 0 0 1 46.293333 65.28 615.04 615.04 0 0 0-104.746667 18.346666 20.053333 20.053333 0 0 0-1.493333-2.133333zM489.173333 768a152.32 152.32 0 0 1-176.213333 10.24 135.893333 135.893333 0 0 1-38.826667-36.266667 192 192 0 0 0 155.093334-55.466666 21.333333 21.333333 0 0 0 2.133333-3.84 615.466667 615.466667 0 0 0 104.533333 18.346666A149.333333 149.333333 0 0 1 489.173333 768z m444.16-242.133333C859.52 608.213333 723.413333 661.333333 586.666667 661.333333a546.773333 546.773333 0 0 1-202.666667-38.613333V401.28A549.76 549.76 0 0 1 586.666667 362.666667c136.746667 0 272.853333 53.12 346.666666 135.466666a21.333333 21.333333 0 0 1 0 27.733334z"
                            fill="#CE4141"
                            p-id="11064"
                        ></path>
                        <path
                            d="M682.666667 426.666667a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m0 128a42.666667 42.666667 0 1 1 42.666666-42.666667 42.666667 42.666667 0 0 1-42.666666 42.666667zM128 448h149.333333a21.333333 21.333333 0 0 0 0-42.666667H128a21.333333 21.333333 0 0 0 0 42.666667zM298.666667 597.333333a21.333333 21.333333 0 0 0-21.333334-21.333333H192a21.333333 21.333333 0 0 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 21.333334-21.333334zM298.666667 512a21.333333 21.333333 0 0 0-21.333334-21.333333H64a21.333333 21.333333 0 0 0 0 42.666666h213.333333a21.333333 21.333333 0 0 0 21.333334-21.333333z"
                            fill="#CE4141"
                            p-id="11065"
                        ></path>
                        <path
                            d="M448 426.666667m-21.333333 0a21.333333 21.333333 0 1 0 42.666666 0 21.333333 21.333333 0 1 0-42.666666 0Z"
                            fill="#CE4141"
                            p-id="11066"
                        ></path>
                        <path
                            d="M448 512m-21.333333 0a21.333333 21.333333 0 1 0 42.666666 0 21.333333 21.333333 0 1 0-42.666666 0Z"
                            fill="#CE4141"
                            p-id="11067"
                        ></path>
                        <path
                            d="M448 597.333333m-21.333333 0a21.333333 21.333333 0 1 0 42.666666 0 21.333333 21.333333 0 1 0-42.666666 0Z"
                            fill="#CE4141"
                            p-id="11068"
                        ></path>
                    </svg>
                </view>
            </template>
        </hy-slider>

        <!-- 弹窗内滑块演示 -->
        <hy-popup
            v-model:show="showPopup"
            mode="right"
            safe-area-inset-top
            close-on-click-overlay
            :custom-style="{
                width: '80vw'
            }"
            :round="20"
            @click="showPopup = false"
        >
            <view class="popup-content">
                <hy-slider
                    v-if="showPopup"
                    is-range
                    v-model:range-value="value_2"
                    :min="10"
                    :max="100"
                    :step="2"
                    :block-size="20"
                    active-color="#1A1A1A"
                    inactive-color="#E6E6E6"
                    block-color="#1A1A1A"
                    show-value
                    custom-class="price-slider"
                />

                <hy-slider v-model="value" v-if="showPopup" custom-class="price-slider"></hy-slider>
            </view>
        </hy-popup>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyPopup from '@/package/components/hy-popup/hy-popup.vue'

definePage({
    style: {
        navigationBarTitleText: '滑动选择器'
    }
})

const { t } = useTranslate('slider')
usePageTitle('slider')

const value = ref(20)
const value_3 = ref(0)
const value_2 = ref([20, 80])
// 弹窗显示状态
const showPopup = ref(false)
// 弹窗内的滑块值
const popupValue = ref([20, 80])

useShareButton()
</script>

<style scoped lang="scss">
.popup-tip {
    margin-top: $hy-border-margin-padding-sm;
    font-size: $hy-font-size-sm;
    color: $hy-text-color--3;
}

.popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $hy-border-margin-padding-lg;
    padding: $hy-border-margin-padding-lg $hy-border-margin-padding-xl;

    &__title {
        font-size: $hy-font-size-lg;
        font-weight: $hy-font-weight-bold;
        color: $hy-text-color;
    }

    &__value {
        font-size: $hy-font-size-xl;
        font-weight: $hy-font-weight-bold;
        color: $hy-primary;
    }

    :deep(.price-slider) {
        width: 100%;
    }
}
</style>
