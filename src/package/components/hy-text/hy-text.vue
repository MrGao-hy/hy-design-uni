<template>
    <view :class="['hy-text', customClass]" v-if="show" :style="wrapStyle" @tap="clickHandler">
        <text
            :class="['hy-text__price', type && `hy-text__value--${type}`]"
            v-if="mode === 'price'"
            :style="[valueStyle]"
        >
            ￥
        </text>
        <view class="hy-text__prefix-icon" v-if="prefixIcon">
            <hy-icon
                :name="prefixIcon"
                :color="color"
                :size="size"
                space="2"
                :customStyle="iconStyle"
            ></hy-icon>
        </view>
        <template v-if="openType && isMp">
            <button
                class="hy-reset-button hy-text__value"
                :style="[valueStyle]"
                :data-index="index"
                :openType="openType"
                @getuserinfo="onGetUserInfo"
                @contact="onContact"
                @getphonenumber="onGetPhoneNumber"
                @error="onError"
                @launchapp="onLaunchApp"
                @opensetting="onOpenSetting"
                :lang="lang"
                :session-from="sessionFrom"
                :send-message-title="sendMessageTitle"
                :send-message-path="sendMessagePath"
                :send-message-img="sendMessageImg"
                :show-message-card="showMessageCard"
                :app-parameter="appParameter"
            >
                {{ value }}
            </button>
        </template>
        <text
            v-else
            class="hy-text__value"
            :style="[valueStyle]"
            :class="[
                type && `hy-text__value--${type}`,
                lines && `hy-text__value--lines`,
                mode === 'link' && `hy-text__value--link`
            ]"
        >
            {{ value }}
        </text>
        <view class="hy-text__suffix-icon" v-if="suffixIcon">
            <hy-icon
                :name="suffixIcon"
                :color="color"
                :size="size"
                :customStyle="iconStyle"
            ></hy-icon>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-text',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import type { ITextEmits } from './typing'
import { addUnit, error, formatName, formatTime, isDate, priceFormat } from '../../libs'
import type { InputOnConfirmEvent } from '@uni-helper/uni-types'
import textProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。
 * @displayName hy-test
 */
defineOptions({})

const props = defineProps(textProps)
const emit = defineEmits<ITextEmits>()

const wrapStyle = computed(() => {
    const style: CSSProperties = {
        margin: props.margin,
        justifyContent:
            props.align === 'left' ? 'flex-start' : props.align === 'center' ? 'center' : 'flex-end'
    }
    // 占满剩余空间
    if (props.flex) {
        style.flex = 1
        // #ifndef APP-NVUE
        style.width = '100%'
        // #endif
    }
    return style
})
const valueStyle = computed(() => {
    const style: CSSProperties = {
        textDecoration: props.decoration,
        fontWeight: props.bold ? 'bold' : 'normal',
        fontSize: addUnit(props.size)
    }
    !props.type && (style.color = props.color)
    props.lineHeight && (style.lineHeight = addUnit(props.lineHeight))
    props.block && (style.display = 'block')
    return Object.assign(style, props.customStyle)
})

/**
 * 格式化值
 * */
const value = computed(() => {
    switch (props.mode) {
        case 'price':
            // 如果text不为金额进行提示
            if (!/^\d+(\.\d+)?$/.test(props.text?.toString())) {
                error('金额模式下，text参数需要为金额格式')
            }
            // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
            if (typeof props.format === 'function') {
                // 如果用户传入的是函数，使用函数格式化
                return props.format(props.text)
            }
            // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
            return priceFormat(props.text, 2)
        case 'date':
            // 判断是否合法的日期或者时间戳
            !isDate(props.text) && error('日期模式下，text参数需要为日期或时间戳格式')
            // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
            if (typeof props.format === 'function') {
                // 如果用户传入的是函数，使用函数格式化
                return props.format(props.text)
            }
            if (props.format) {
                // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
                return formatTime(props.text, props.format)
            }
            // 如果没有设置format，则设置为默认的时间格式化形式
            return formatTime(props.text, 'yyyy-MM-dd')
        case 'phone':
            // 判断是否合法的手机号
            // !test.mobile(test) && error('手机号模式下，text参数需要为手机号码格式')
            if (typeof props.format === 'function') {
                // 如果用户传入的是函数，使用函数格式化
                return props.format(props.text)
            }
            if (props.format === 'encrypt') {
                // 如果format为encrypt，则将手机号进行星号加密处理
                return `${props.text.toString().substring(0, 3)}****${props.text.toString().substring(7)}`
            }
            return props.text
        case 'name':
            // 判断是否合法的字符粗
            if (typeof props.text !== 'string') {
                error('姓名模式下，text参数需要为字符串格式')
            } else {
                if (typeof props.format === 'function') {
                    // 如果用户传入的是函数，使用函数格式化
                    return props.format(props.text)
                }
                if (props.format === 'encrypt') {
                    // 如果format为encrypt，则将姓名进行星号加密处理
                    return formatName(props.text)
                }
            }
            return props.text
        case 'link':
            return props.text
        default:
            return props.text
    }
})

const isMp = computed(() => {
    let mp
    // #ifdef MP
    mp = true
    // #endif
    return mp
})

const clickHandler = (e: InputOnConfirmEvent) => {
    // 如果为手机号模式，拨打电话
    if (props.call && props.mode === 'phone') {
        uni.makePhoneCall({
            phoneNumber: props.text as string
        })
    }
    // 如果是有链接跳转
    if (props.href && props.mode === 'link') {
        toLink()
    }
    emit('click', e)
}

const toLink = () => {
    // #ifdef APP-PLUS
    plus.runtime.openURL(props.href)
    // #endif
    // #ifdef H5
    window.open(props.href)
    // #endif
    // #ifdef MP
    uni.setClipboardData({
        data: props.href,
        success: () => {
            uni.hideToast()
            nextTick(() => {
                uni.showToast({ title: '链接已复制，请在浏览器打开' })
            })
        }
    })
    // #endif
}
</script>

<style scoped lang="scss">
@import './index.scss';
@import '../../libs/css/mixin';
/*超出出现省略号*/
.hy-text__value--lines {
    @include multiEllipsis(v-bind(lines));
}
</style>
