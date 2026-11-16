<template>
    <view class="hy-title">{{ t('basicUsage') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('stepSection') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :step="3"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('decimalSection') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :step="0.1" :decimalLength="1"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('disabled') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" disabled></hy-number-step>
    </view>

    <view class="hy-title">{{ t('disabledInput') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :disabledInput="true"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('disablePlus') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :disablePlus="true"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('rangeSection') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :min="10" :max="20"></hy-number-step>
    </view>

    <view class="hy-title">{{ t('asyncSection') }}</view>
    <view class="hy-container">
        <hy-number-step
            v-model="asyncValue"
            :asyncChange="true"
            @change="onAsyncChange"
        ></hy-number-step>
    </view>

    <view class="hy-title">{{ t('hideMinus') }}</view>
    <view class="hy-container hidden">
        <hy-number-step
            v-model="value2"
            :min="0"
            :miniMode="true"
            input-bg-color="transparent"
            :plusIcon="{ color: '#ffffff' }"
            button-radius="50%"
        ></hy-number-step>
    </view>

    <view class="hy-title">{{ t('customAppearance') }}</view>
    <view class="hy-container">
        <hy-number-step
            v-model="value"
            button-size="36"
            button-width="44"
            input-width="60"
            button-radius="8px"
            color="#f56c6c"
            bg-color="#fef0f0"
        ></hy-number-step>
    </view>

    <view class="hy-title">{{ t('customIcon') }}</view>
    <view class="hy-container">
        <hy-number-step
            v-model="value"
            :minusIcon="{ name: IconConfig.DELETE, size: 14 }"
            :plusIcon="{ name: IconConfig.SHOPPING_CART_ADD, size: 14 }"
        ></hy-number-step>
    </view>

    <view class="hy-title">{{ t('customStyle') }}</view>
    <view class="hy-container">
        <hy-number-step v-model="value" :showMinus="!!value" :min="0">
            <template #minus>
                <view class="minus">
                    <hy-icon :name="IconConfig.MINUS" size="12"></hy-icon>
                </view>
            </template>
            <template #input>
                <text style="width: 30px; text-align: center" class="input">{{ value }}</text>
            </template>
            <template #plus>
                <view class="plus">
                    <hy-icon :name="IconConfig.PLUS" color="#FFFFFF" size="12"></hy-icon>
                </view>
            </template>
        </hy-number-step>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconConfig, useToast } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '步进器'
    }
})

const { t } = useTranslate('numberBox')
usePageTitle('numberBox')

const value = ref(10)
const value2 = ref(0)
// 异步变更演示值
const asyncValue = ref(5)
const toast = useToast()

/**
 * 异步变更：开启 asyncChange 后组件内部不会更新值，
 * 需在 change 事件中请求接口完成后手动更新 v-model
 */
const onAsyncChange = (value: number | string) => {
    toast.loading(t('asyncLoading'))
    // 模拟接口请求，完成后更新值
    setTimeout(() => {
        asyncValue.value = Number(value)
        toast.close()
    }, 500)
}

useShareButton()
</script>

<style scoped lang="scss">
.minus {
    width: 22px;
    height: 22px;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input {
    padding: 0 10px;
}

.plus {
    width: 22px;
    height: 22px;
    background-color: #ff0000;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hidden {
    :deep(.hy-number-box__plus) {
        background-color: red;
    }

    :deep(.hy-number-box__minus) {
        border: $hy-border-line;
        background-color: transparent;
    }
}
</style>
