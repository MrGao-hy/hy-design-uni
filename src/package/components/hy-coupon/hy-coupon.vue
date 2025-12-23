<template>
    <view
        :class="cardClass"
        @click="handleClick"
        :style="[
            {
                background: bgColor,
                filter: boxShadow ? 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))' : ''
            },
            customStyle
        ]"
    >
        <!-- 优惠券主体 -->
        <view class="hy-coupon__content">
            <!-- 左侧金额/折扣信息 -->
            <view class="hy-coupon__content--left">
                <!-- @slot 自定义金额插槽 -->
                <slot v-if="$slots.left" name="left"></slot>
                <template v-else>
                    <view class="hy-coupon__content--left__block">
                        <view class="hy-coupon__content--left__value">
                            <text>
                                {{ amount || 0 }}
                            </text>
                        </view>
                        <view class="hy-coupon__content--left__suffix">
                            <text v-if="unit">{{ unit }}</text>
                            <text v-else-if="type === 'discount'">折</text>
                            <text v-else>元</text>
                        </view>
                    </view>

                    <hy-tag
                        :text="typeValue"
                        size="mini"
                        plain
                        shape="circle"
                        color="#FFFFFF"
                    ></hy-tag>
                </template>
            </view>

            <hy-line
                :hairline="false"
                direction="column"
                dashed
                color="#FFFFFF"
                length="70%"
            ></hy-line>

            <!-- 右侧描述信息 -->
            <view class="hy-coupon__content--right">
                <!-- 自定义详情插槽 -->
                <slot v-if="$slots.right" name="right"></slot>
                <template v-else>
                    <view class="hy-coupon__content--right__name">{{ title }}</view>
                    <view
                        :class="[
                            'hy-coupon__content--right__desc',
                            desEllipsis !== 'none' && 'is-ellipsis'
                        ]"
                        >{{ description }}</view
                    >
                    <view class="hy-coupon__content--right__validity">
                        {{
                            dateDesc
                                ? dateDesc
                                : `有效期: ${formatTime(startDate, format)} - ${formatTime(endDate, format)}`
                        }}
                    </view>
                </template>
            </view>
        </view>

        <!-- 右侧状态标签 -->
        <view class="hy-coupon__btn">
            <!-- 自定义按钮插槽 -->
            <slot v-if="$slots.button" name="button"></slot>
            <template v-else>
                <view v-if="btnMode === 'text'" class="hy-coupon__tag">
                    <text class="hy-coupon__tag--btn" @tap.stop="onUsed">{{ btnText }}</text>
                </view>
                <hy-button
                    v-if="btnMode === 'button'"
                    :text="btnText"
                    plain
                    :disabled="isDisable"
                    :size="buttonProp?.size || 'small'"
                    :shape="buttonProp?.shape || 'circle'"
                    :color="buttonProp?.color || '#FFFFFF'"
                    :custom-style="{ marginRight: '10px' }"
                    @click="onUsed"
                ></hy-button>
            </template>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-coupon',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ICouponEmits } from './typing'
import { formatTime } from '../../libs'
import couponProps from './props'

// 组件
import hyTag from '../hy-tag/hy-tag.vue'
import hyLine from '../hy-line/hy-line.vue'
import hyButton from '../hy-button/hy-button.vue'

/**
 * 用于商品优惠券的业务组件
 * @displayName hy-coupon
 */
defineOptions({})

const props = defineProps(couponProps)
const emit = defineEmits<ICouponEmits>()

// 禁用功能
const isDisable = computed(() => props.disabledStatus.includes(props.status))

const typeValue = computed(() => {
    let text = ''
    if (props.typeText) {
        text = props.typeText
    } else {
        switch (props.type) {
            case 'moneyOff':
                text = '满减券'
                break
            case 'discount':
                text = '折扣券'
                break
            case 'fixedAmount':
                text = '无门槛券'
                break
            default:
                text = '未知券'
                break
        }
    }
    return text
})

const cardClass = computed(() => {
    const baseClass = 'hy-coupon hy-coupon__card'
    const typeClass = `hy-coupon--${props.type}`
    const statusClass = isDisable.value && 'hy-coupon--disabled'
    return `${baseClass} ${typeClass} ${statusClass} ${props.customClass}`
})

// 点击优惠券触发
const handleClick = () => {
    emit('click')
}

// 点击使用优惠券触发
const onUsed = () => {
    if (!isDisable.value) {
        emit('used')
    }
}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '../../libs/css/mixin.scss';

@include is(ellipsis) {
    @include multiEllipsis(v-bind(desEllipsis));
}
</style>
