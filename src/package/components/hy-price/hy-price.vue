<template>
    <text :class="['hy-price', customClass]" :style="priceStyle" @tap="handleClick">
        <text class="hy-price__prefix">{{ symbol }}</text>
        <text class="hy-price__text" :style="[{ 'font-size': addUnit(getPx(size) * ratio) }]">
            {{ priceOne?.[0] }}
        </text>
        <text class="hy-price__decimal">
            {{ '.' + addZero(priceOne?.[1], num) }}
        </text>
    </text>
</template>

<script lang="ts">
export default {
    name: 'hy-price',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, getPx, error, addZero } from '../../libs'
import priceProps from './props'
import type { IPriceEmits } from './typing'

/**
 * 业务组件,突出金额小数点前大，小数点后小
 * @displayName hy-price
 */
defineOptions({})

const props = defineProps(priceProps)
const emit = defineEmits<IPriceEmits>()

// 价格整体样式
const priceStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        color: props.color,
        fontWeight: props.weight,
        fontStyle: props.slant ? 'oblique' : '',
        fontSize: addUnit(props.size)
    }

    return Object.assign(style, props.customStyle)
})

// 价格处理
const priceOne = computed(() => {
    if (props.text === undefined || props.text === null) return error('text值不能为空')

    let value = typeof props.text === 'string' ? props.text : props.text.toString()
    if (/\./g.test(value)) {
        return Number(value) ? value.split('.') : ['0', '000000']
    } else {
        return [value, '000000']
    }
})

// 点击事件
const handleClick = () => {
    emit('click', props.text)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
