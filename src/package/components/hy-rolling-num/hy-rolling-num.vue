<template>
    <view :class="['hy-rolling-num', customClass]" :style="containerStyle">
        <view
            v-for="(item, index) in renderList"
            :key="index"
            class="hy-rolling-num__column"
            :style="{ height: addUnit(height), marginRight: letterSpacing }"
        >
            <view
                v-if="item.isDigit"
                class="hy-rolling-num__column--wrapper"
                :style="{
                    transform: item.transformValue,
                    transition: `transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`,
                    transitionDelay: item.delay,
                    height: '1200%' /* 12个数字，总高度1200% */
                }"
            >
                <text
                    v-for="(num, idx) in item.strip"
                    :key="idx"
                    class="hy-rolling-num__column--wrapper__digit"
                    :style="textStyle"
                >
                    {{ num }}
                </text>
            </view>

            <view
                v-else
                class="hy-rolling-num__column--symbol"
                :style="{ height: addUnit(height), ...textStyleObject }"
            >
                {{ item.val }}
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-rolling-num',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from 'vue'
import { addUnit } from '../../libs'
import rollingNumProps from './props'

/**
 * 滚动数字组件，用于实现数字从初始值（全0）平滑滚动到目标值的动画效果。
 * @displayName hy-rolling-num
 */
defineOptions({})

const props = defineProps(rollingNumProps)

// --- 核心逻辑：计算每列的配置 ---

// **【修改点 1】** 定义包含冗余数字的数字条
// 现在数字条有 12 个元素，每个元素占据 1/12 ≈ 8.33% 的高度
const BASE_STRIP = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const ITEM_HEIGHT_PERCENT = 100 / BASE_STRIP.length // 8.333%

// 添加内部状态管理，用于控制初始值和目标值的切换
const displayValue = ref('')

// 监听value变化，实现从初始值到目标值的滚动
watch(
    () => props.value,
    (newValue) => {
        const newValueStr = String(newValue)
        const newValueLen = newValueStr.length

        // 创建对应长度的全0初始值
        const initialValue = '0'.repeat(newValueLen)

        // 先显示初始值
        displayValue.value = initialValue

        // 延迟一段时间后再显示目标值，以触发滚动动画
        // 100ms是一个比较合理的值，确保DOM有足够时间更新
        setTimeout(() => {
            displayValue.value = newValueStr
        }, 100)
    },
    { immediate: true }
)

const renderList = computed(() => {
    const str = displayValue.value
    const len = str.length
    const arr = []

    // 正序 stripUp (用于 'up')：数字顺序为 9 0 1 ... 9 0
    const stripUp = BASE_STRIP
    // 倒序 stripDown (用于 'down' 或 'alternate')：数字顺序为 0 9 8 ... 1 0 9
    const stripDown = [...BASE_STRIP].reverse()

    for (let i = 0; i < len; i++) {
        const char = str[i]
        const isDigit = /^\d$/.test(char)
        const digitVal = isDigit ? parseInt(char, 10) : 0

        // 1. 确定当前列的滚动方向
        let isReversed = props.scrollDirection === 'down'
        if (props.scrollDirection === 'alternate') {
            isReversed = i % 2 !== 0
        }

        // 2. 根据方向决定使用哪种数字条
        const currentStrip = isReversed ? stripDown : stripUp

        // 3. 计算 Transform 位移：找到目标数字在数字条中的索引位置
        // **【修改点 2】**
        // 目标数字总是存在两次 (0-9)
        // - 向上滚动 ('up') 时，使用 **第二个** 匹配的索引，即 0~9 的正常排列部分。
        // - 向下滚动 ('down') 时，使用 **第一个** 匹配的索引。
        let targetIndex = -1

        if (
            props.scrollDirection === 'up' ||
            (props.scrollDirection === 'alternate' && !isReversed)
        ) {
            // 向上滚：目标是中间的 0-9 部分 (索引 1 到 10)
            // 查找 0 到 9 中间的那个索引
            targetIndex = currentStrip.indexOf(digitVal, 1)
        } else {
            // 向下滚或交替的反向滚：目标是中间的 0-9 部分
            // 查找 0 到 9 中间的那个索引
            // 查找第一个数字，如果是 0，则目标是索引 10 (倒数第二个)
            targetIndex = currentStrip.lastIndexOf(digitVal, currentStrip.length - 2)
        }

        // 确保找到了有效索引
        if (targetIndex === -1) {
            // 理论上不会发生，作为降级处理
            targetIndex = currentStrip.indexOf(digitVal)
        }

        const transformValue = `translate3d(0, -${targetIndex * ITEM_HEIGHT_PERCENT}%, 0)`

        // 4. 计算延迟 (Staggering)
        let delaySec = 0
        if (props.stopOrder === 'ltr') {
            delaySec = i * props.delayStep
        } else {
            delaySec = (len - 1 - i) * props.delayStep
        }

        arr.push({
            val: char,
            isDigit,
            strip: currentStrip,
            transformValue,
            delay: `${delaySec}s`
        })
    }
    return arr
})

// --- 样式计算部分省略，但注意要用到 ITEM_HEIGHT_PERCENT ---

const containerStyle = computed<CSSProperties>(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
}))

const textStyleObject = computed<CSSProperties>(() => ({
    fontSize: addUnit(props.size),
    color: props.color,
    fontWeight: props.fontWeight,
    lineHeight: addUnit(props.height),
    ...props.customStyle
}))

const textStyle = computed(() => {
    let s = ''
    const obj = textStyleObject.value
    for (const key in obj) {
        // @ts-ignore
        s += `${key}:${obj[key]};`
    }
    return s
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
