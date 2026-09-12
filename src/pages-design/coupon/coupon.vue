<template>
    <the-root-page>
        <view class="hy-title">{{ t('demoTitle') }}</view>
        <view class="hy-container">
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

        <view class="hy-title">{{ t('bgColorSection') }}</view>

        <view class="hy-container">
            <hy-coupon
                :title="t('testCoupon')"
                amount="10"
                :description="t('testCouponDesc')"
                :date-desc="t('longTerm')"
                type="moneyOff"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                bg-color="linear-gradient(135deg, #7b61ff 0%, #4134c1 100%)"
                @used="onUse"
            />
        </view>

        <view class="hy-title">{{ t('longContent') }}</view>

        <view class="hy-container">
            <hy-coupon
                :title="t('couponTitle')"
                amount="10"
                :description="t('couponDesc')"
                :date-desc="t('longTerm')"
                type="fixedAmount"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                :custom-style="{ marginBottom: '20px' }"
                @used="onUse"
            />

            <hy-coupon
                :title="t('couponTitle')"
                amount="10"
                :description="t('couponDesc')"
                desEllipsis="2"
                :date-desc="t('longTerm')"
                type="fixedAmount"
                status="unused"
                :btnMode="btnMode"
                :boxShadow="boxShadow"
                :disabled-status="['used', 'expired', 'redeemed']"
                @used="onUse"
            />
        </view>

        <view class="hy-title">{{ t('disabledSection') }}</view>
        <view class="hy-container">
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
                    :btnText="t('expired')"
                    @used="onUse"
                />
            </template>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('shadowSection') }}</view>
            <hy-switch v-model="boxShadow" />

            <view class="hy-title">{{ t('btnStyleSection') }}</view>
            <hy-subsection :list="btnModeOptions" v-model="btnMode"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { CouponButtonModeType, CouponType } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '优惠券'
    }
})

const { t } = useTranslate('coupon')
usePageTitle('coupon')

export interface CouponItem {
    id: string | number
    name: string
    type: CouponType
    status: string
    description?: string
    minSpend?: number
    value?: number
    validFrom?: string
    validTo?: string
    maxDiscount?: number
    applicableCategories?: string[]
}

const boxShadow = ref(true)
const btnMode = ref<CouponButtonModeType>('button')
const btnModeOptions = computed(() => [
    {
        name: t('btnModeButton'),
        value: 'button'
    },
    {
        name: t('btnModeText'),
        value: 'text'
    },
    {
        name: t('btnModeNone'),
        value: 'none'
    }
])
const list = computed<CouponItem[]>(() => [
    {
        id: '1',
        name: t('newcomerCoupon'),
        type: 'moneyOff',
        status: 'unused',
        description: t('newcomerDesc'),
        minSpend: 100,
        value: 20,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59'
    },
    {
        id: '2',
        name: t('freshCoupon'),
        type: 'discount',
        status: 'unused',
        description: t('freshDesc'),
        minSpend: 50,
        value: 8, // 80 代表 8折
        maxDiscount: 50,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59',
        applicableCategories: ['fresh']
    },
    {
        id: '3',
        name: t('noThresholdCoupon'),
        type: 'fixedAmount',
        status: 'unused',
        description: t('noThresholdDesc'),
        value: 100,
        validFrom: '2023-01-01T00:00:00',
        validTo: '2023-12-31T23:59:59'
    }
])
const list2 = computed<CouponItem[]>(() => [
    {
        id: '1',
        name: t('newcomerCoupon'),
        type: 'moneyOff',
        status: 'used',
        description: t('newcomerDesc'),
        minSpend: 100,
        value: 20,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59'
    },
    {
        id: '2',
        name: t('freshCoupon'),
        type: 'discount',
        status: 'expired',
        description: t('freshDesc'),
        minSpend: 50,
        value: 8, // 80 代表 8折
        maxDiscount: 50,
        validFrom: '2024-01-01T00:00:00',
        validTo: '2024-12-31T23:59:59',
        applicableCategories: ['fresh']
    },
    {
        id: '3',
        name: t('noThresholdCoupon'),
        type: 'fixedAmount',
        status: 'redeemed',
        description: t('noThresholdDesc'),
        value: 100,
        validFrom: '2023-01-01T00:00:00',
        validTo: '2023-12-31T23:59:59'
    }
])

const onUse = () => {
    uni.showToast({ title: t('claimSuccess'), icon: 'none' })
}

useShareButton()
</script>

<style lang="scss" scoped></style>
