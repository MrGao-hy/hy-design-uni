<template>
    <text :class="['hy-price', customClass]" :style="priceStyle" @tap="handleClick">
        <text class="hy-price__prefix">{{ symbol }}</text>
        <text class="hy-price__text" :style="integerStyle">
            {{ priceData.integer }}
        </text>
        <text class="hy-price__decimal">
            {{ priceData.decimal }}
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

/**
 * 格式化数字为千分位
 */
const formatThousand = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 处理价格数据
 */
const priceData = computed(() => {
    const text = props.text
    if (text === undefined || text === null) {
        error('text值不能为空')
        return { integer: '0', decimal: '.00' }
    }

    const value = typeof text === 'string' ? text : String(text)
    const hasDecimal = /\./g.test(value)

    if (hasDecimal) {
        const [integer, decimal] = value.split('.', 2)
        return {
            integer: formatThousand(integer),
            decimal: '.' + addZero(decimal, props.num)
        }
    } else {
        return {
            integer: formatThousand(value),
            decimal: '.' + addZero('', props.num)
        }
    }
})

/**
 * 价格整体样式
 */
const priceStyle = computed<CSSProperties>(() => {
    const baseStyle: CSSProperties = {
        color: props.color,
        fontWeight: props.weight,
        fontSize: addUnit(props.size)
    }

    if (props.slant) {
        baseStyle.fontStyle = 'oblique'
    }

    return { ...baseStyle, ...props.customStyle }
})

/**
 * 整数部分样式
 */
const integerStyle = computed<CSSProperties>(() => {
    return {
        fontSize: addUnit(getPx(props.size) * props.ratio)
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
