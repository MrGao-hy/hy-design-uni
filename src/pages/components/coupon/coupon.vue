<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">优惠券组件示例</view>
        <view class="hy-container hy-flex">
            <template v-for="item in list" :key="item.id">
                <hy-coupon
                    :title="item.name"
                    :amount="item.value"
                    :description="item.description"
                    :startDate="item.validFrom"
                    :endDate="item.validTo"
                    :type="item.type"
                    :status="item.status"
                    :btnMode="btnMode"
                    :disabled-status="['used', 'expired', 'redeemed']"
                    :boxShadow="boxShadow"
                    :custom-style="{ marginBottom: '20px' }"
                    @used="onUse"
                />
            </template>
        </view>

        <view class="hy-title">设置背景色</view>

        <view class="hy-container">
            <hy-coupon
                title="测试优惠券"
                amount="10"
                description="测试的优惠券"
                date-desc="长期有效"
                type="moneyOff"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                bg-color="linear-gradient(135deg, #7b61ff 0%, #4134c1 100%)"
                @used="onUse"
            />
        </view>

        <view class="hy-title">长内容</view>

        <view class="hy-container">
            <hy-coupon
                title="满28元减10元优惠券（绿标商品使用）"
                amount="10"
                description="1、现金券仅限绿标商品使用
                2、现金劵需购物满额方可使用
3、现金劵在活动期内有效，过期作废，不后补
4、现金劵不可与其他活动共享
5、现金券不找零，不记名，不挂失"
                date-desc="长期有效"
                type="fixedAmount"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                :custom-style="{ marginBottom: '20px' }"
                @used="onUse"
            />

            <hy-coupon
                title="满28元减10元优惠券（绿标商品使用）"
                amount="10"
                description="1、现金券仅限绿标商品使用
                2、现金劵需购物满额方可使用
3、现金劵在活动期内有效，过期作废，不后补
4、现金劵不可与其他活动共享
5、现金券不找零，不记名，不挂失"
                desEllipsis="2"
                date-desc="长期有效"
                type="fixedAmount"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                @used="onUse"
            />
        </view>

        <view class="hy-title">优惠券禁用</view>
        <view class="hy-container hy-flex">
            <template v-for="item in list2" :key="item.id">
                <hy-coupon
                    :title="item.name"
                    :amount="item.value"
                    :description="item.description"
                    :startDate="item.validFrom"
                    :endDate="item.validTo"
                    :type="item.type"
                    :status="item.status"
                    :btnMode="btnMode"
                    :boxShadow="boxShadow"
                    :disabled-status="['used', 'expired', 'redeemed']"
                    :custom-style="{ marginBottom: '20px' }"
                    btnText="已过期"
                    @used="onUse"
                />
            </template>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">显示阴影</view>
            <hy-switch v-model="boxShadow" />

            <view class="hy-title">按钮样式</view>
            <hy-subsection :list="btnModeOptions" v-model="btnMode"></hy-subsection>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyCoupon from '@/package/components/hy-coupon/hy-coupon.vue'
import { reactive, ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import HySwitch from '../../../package/components/hy-switch/hy-switch.vue'
import HySubsection from '../../../package/components/hy-subsection/hy-subsection.vue'

const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const boxShadow = ref(true)
const btnMode = ref('button')
const btnModeOptions = reactive([
    {
        name: '按钮',
        value: 'button'
    },
    {
        name: '文本按钮',
        value: 'text'
    },
    {
        name: '无按钮',
        value: 'none'
    }
])
const list = ref([
    {
        id: '1',
        name: '新人专享满减券',
        type: 'moneyOff',
        status: 'unused',
        description: '满100元减20元，全场通用',
        minSpend: 100,
        value: 20,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59'
    },
    {
        id: '2',
        name: '生鲜8折优惠券',
        type: 'discount',
        status: 'unused',
        description: '仅限生鲜品类使用，最高优惠50元',
        minSpend: 50,
        value: 8, // 80 代表 8折
        maxDiscount: 50,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59',
        applicableCategories: ['fresh']
    },
    {
        id: '3',
        name: '无门槛10元券',
        type: 'fixedAmount',
        status: 'unused',
        description: '无最低消费限制，全场通用',
        value: 100,
        validFrom: '2023-01-01T00:00:00',
        validTo: '2023-12-31T23:59:59'
    }
])
const list2 = ref([
    {
        id: '1',
        name: '新人专享满减券',
        type: 'moneyOff',
        status: 'used',
        description: '满100元减20元，全场通用',
        minSpend: 100,
        value: 20,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59'
    },
    {
        id: '2',
        name: '生鲜8折优惠券',
        type: 'discount',
        status: 'expired',
        description: '仅限生鲜品类使用，最高优惠50元',
        minSpend: 50,
        value: 8, // 80 代表 8折
        maxDiscount: 50,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59',
        applicableCategories: ['fresh']
    },
    {
        id: '3',
        name: '无门槛10元券',
        type: 'fixedAmount',
        status: 'redeemed',
        description: '无最低消费限制，全场通用',
        value: 100,
        validFrom: '2023-01-01T00:00:00',
        validTo: '2023-12-31T23:59:59'
    }
])

const onUse = () => {
    uni.showToast({ title: '领取成功', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.coupon-demo-page {
    padding: 20px;
    background-color: $hy-background;
}

.page-header {
    margin-bottom: 24px;
    text-align: center;
}

.page-title {
    font-size: 20px;
    font-weight: bold;
    color: $hy-text-color;
    display: block;
    margin-bottom: 8px;
}

.page-subtitle {
    font-size: 14px;
    color: $hy-text-color--2;
    display: block;
}

.demo-section {
    margin-bottom: 32px;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: $hy-text-color;
    margin-bottom: 16px;
    display: block;
    padding-left: 8px;
    border-left: 3px solid $hy-primary;
}

.coupon-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.responsive-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
}

@media (max-width: 768px) {
    .responsive-list {
        grid-template-columns: 1fr;
    }
}
</style>
