<template>
    <!-- 虚拟键盘主组件 -->
    <hy-popup
        v-model:show="show"
        position="bottom"
        :z-index="zIndex"
        :safe-area-inset-bottom="safeAreaInsetBottom"
        :overlay="overlay"
        :overlayOpacity="overlayOpacity"
        :close-on-click-modal="hideOnClickOutside"
        :lock-scroll="lockScroll"
        @close="handleClose"
    >
        <view :class="`hy-keyboard ${customClass}`" :style="customStyle">
            <!-- 头部区域（标题 + 关闭按钮） -->
            <view class="hy-keyboard__header" v-if="showHeader">
                <!-- 标题插槽 -->
                <slot name="title" v-if="showTitle">
                    <text class="hy-keyboard__title">{{ title }}</text>
                </slot>
                <!-- 关闭按钮 -->
                <view
                    class="hy-keyboard__close"
                    hover-class="hy-keyboard__close--hover"
                    v-if="showClose"
                    @click="handleClose"
                >
                    <text>{{ closeText }}</text>
                </view>
            </view>

            <!-- 非车牌号键盘布局 -->
            <template v-if="mode !== 'car'">
                <view class="hy-keyboard__body">
                    <!-- 主按键区域 -->
                    <view class="hy-keyboard__keys">
                        <hy-keyboard-key
                            v-for="(key, index) in keys"
                            :key="index"
                            :text="key.text"
                            :type="key.type"
                            :wider="key.wider"
                            @press="handlePress"
                        ></hy-keyboard-key>
                    </view>
                    <!-- 侧边栏（仅custom模式显示） -->
                    <view class="hy-keyboard__sidebar" v-if="mode === 'custom'">
                        <hy-keyboard-key
                            v-if="showDeleteKey"
                            large
                            :text="deleteText"
                            type="delete"
                            @press="handlePress"
                        ></hy-keyboard-key>
                        <hy-keyboard-key
                            large
                            :text="closeText"
                            type="close"
                            :loading="closeButtonLoading"
                            @press="handlePress"
                        ></hy-keyboard-key>
                    </view>
                </view>
            </template>

            <!-- 车牌号键盘布局 -->
            <template v-if="mode === 'car'">
                <view class="hy-keyboard__body">
                    <view class="hy-keyboard__car-keys">
                        <hy-keyboard-key
                            v-for="(key, index) in keys"
                            :key="index"
                            :text="key.text"
                            :type="key.type"
                            :wider="key.wider"
                            is-car
                            @press="handlePress"
                        ></hy-keyboard-key>
                    </view>
                </view>
            </template>
        </view>
    </hy-popup>
</template>

<script lang="ts">
/**
 * 虚拟键盘组件
 * 支持多种键盘模式：数字键盘、自定义键盘、车牌号键盘、身份证键盘
 */
export default {
    name: 'hy-keyboard',
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch, useSlots } from 'vue'
import type { KeyboardMode, CarKeyboardLang, Key, IKeyboardEmits } from './typing'
import type { NumberKeyType } from './key/types'
import { CAR_KEYBOARD_AREAS, CAR_KEYBOARD_KEYS } from './constants'
import { keyboardProps } from './props'
import HyKeyboardKey from './key/index.vue'

const props = defineProps(keyboardProps)
const emit = defineEmits<IKeyboardEmits>()
const slots = useSlots()

const show = ref(props.show)

watch(
    () => props.show,
    (newValue) => {
        show.value = newValue
    }
)

const carLang = ref<CarKeyboardLang>('zh')

/**
 * 车牌号键盘语言（支持受控/非受控两种模式）
 */
const carKeyboardLang = computed({
    get: () => (props.carLang ? props.carLang : carLang.value),
    set: (value: CarKeyboardLang) => {
        carLang.value = value
    }
})

/**
 * 当前键盘按键列表（根据模式动态生成）
 */
const keys = computed(() => {
    switch (props.mode) {
        case 'car':
            return genCarKeys()
        case 'idcard':
            return genIdCardKeys()
        case 'custom':
            return genCustomKeys()
        default:
            return genDefaultKeys()
    }
})

/**
 * 是否显示关闭按钮
 */
const showClose = computed(() => {
    return props.closeText && (props.mode === 'default' || props.mode === 'car')
})

/**
 * 是否显示标题
 */
const showTitle = computed(() => {
    return !!props.title || !!slots.title
})

/**
 * 是否显示头部区域
 */
const showHeader = computed(() => {
    return showTitle.value || showClose.value
})

/**
 * 数组随机排序（Fisher-Yates 算法）
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
function shuffleArray<T>(arr: T[]): T[] {
    const newArr = [...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
}

/**
 * 生成基础数字按键（0-9）
 * @returns 数字按键数组
 */
function genBasicKeys(): Key[] {
    const keys = Array.from({ length: 10 }, (_, i) => ({ text: i }))
    return props.randomKeyOrder ? shuffleArray(keys) : keys
}

/**
 * 生成默认数字键盘按键
 * 布局：1 2 3 / 4 5 6 / 7 8 9 / . 0 删除
 * @returns 默认键盘按键数组
 */
function genDefaultKeys(): Key[] {
    const result: Key[] = []
    const basicKeys = genBasicKeys()

    // 第一行: 1, 2, 3
    result.push(basicKeys[1], basicKeys[2], basicKeys[3])
    // 第二行: 4, 5, 6
    result.push(basicKeys[4], basicKeys[5], basicKeys[6])
    // 第三行: 7, 8, 9
    result.push(basicKeys[7], basicKeys[8], basicKeys[9])
    // 第四行: 小数点, 0, 删除
    const dotKey = props.showDotKey
        ? [{ text: (props.extraKey as string) || '.', type: 'extra' as NumberKeyType }]
        : []

    result.push(
        ...dotKey,
        { ...basicKeys[0], wider: true },
        {
            text: props.showDeleteKey ? props.deleteText : '',
            type: props.showDeleteKey ? 'delete' : ''
        }
    )

    return result
}

/**
 * 生成自定义模式键盘按键（带侧边栏）
 * @returns 自定义键盘按键数组
 */
function genCustomKeys(): Key[] {
    const result: Key[] = []
    const basicKeys = genBasicKeys()
    const extraKeys = Array.isArray(props.extraKey) ? props.extraKey : [props.extraKey]

    // 第一行: 1, 2, 3
    result.push(basicKeys[1], basicKeys[2], basicKeys[3])
    // 第二行: 4, 5, 6
    result.push(basicKeys[4], basicKeys[5], basicKeys[6])
    // 第三行: 7, 8, 9
    result.push(basicKeys[7], basicKeys[8], basicKeys[9])

    // 第四行根据extraKey数量调整
    if (extraKeys.length === 1) {
        console.log(extraKeys)

        result.push({ ...basicKeys[0], wider: true }, { text: extraKeys[0] || '.', type: 'extra' })
    } else if (extraKeys.length >= 2) {
        result.push({ text: extraKeys[0], type: 'extra' }, basicKeys[0], {
            text: extraKeys[1],
            type: 'extra'
        })
    }

    return result
}

/**
 * 生成车牌号键盘按键
 * 支持省份简称和字母数字切换
 * @returns 车牌号键盘按键数组
 */
function genCarKeys(): Key[] {
    const [keys, remainKeys] = splitCarKeys()
    return [
        ...keys,
        { text: carKeyboardLang.value === 'zh' ? 'ABC' : '省份', type: 'extra', wider: true },
        ...remainKeys,
        { text: props.deleteText, type: 'delete', wider: true }
    ]
}

/**
 * 分割车牌号按键数组
 * 用于在第30个按键后插入切换语言的按钮
 * @returns 分割后的按键数组
 */
function splitCarKeys(): Key[][] {
    const keys =
        carKeyboardLang.value === 'zh'
            ? CAR_KEYBOARD_AREAS.map((key) => ({ text: key }))
            : CAR_KEYBOARD_KEYS.map((key) => ({ text: key }))
    return [keys.slice(0, 30), keys.slice(30)]
}

/**
 * 生成身份证键盘按键
 * 布局：1 2 3 / 4 5 6 / 7 8 9 / X 0 删除
 * @returns 身份证键盘按键数组
 */
function genIdCardKeys(): Key[] {
    const result: Key[] = []
    const basicKeys = genBasicKeys()

    // 第一行: 1, 2, 3
    result.push(basicKeys[0], basicKeys[1], basicKeys[2])
    // 第二行: 4, 5, 6
    result.push(basicKeys[3], basicKeys[4], basicKeys[5])
    // 第三行: 7, 8, 9
    result.push(basicKeys[6], basicKeys[7], basicKeys[8])
    // 第四行: X, 0, 删除
    result.push(
        { text: 'X', type: 'extra' },
        { text: 0 },
        {
            text: props.showDeleteKey ? props.deleteText : '',
            type: props.showDeleteKey ? 'delete' : ''
        }
    )

    return result
}

/**
 * 处理关闭事件
 */
const handleClose = () => {
    emit('close')
    emit('update:show', false)
}

/**
 * 处理按键点击
 * @param text 按键文本
 * @param type 按键类型
 */
const handlePress = (text: string, type: NumberKeyType) => {
    // 额外按键处理
    if (type === 'extra') {
        // 空文本不处理
        if (text === '') {
            return handleClose()
        }
        // 车牌号键盘语言切换
        else if (text === 'ABC' || text === '省份') {
            const newLang = carKeyboardLang.value === 'zh' ? 'en' : 'zh'
            if (props.carLang) {
                emit('update:carLang', newLang)
            } else {
                carKeyboardLang.value = newLang
            }
            return
        }
    }

    const value = props.modelValue
    // 删除键处理
    if (type === 'delete') {
        emit('delete')
        const newValue = value.slice(0, value.length - 1)
        emit('update:modelValue', newValue)
        // 车牌号键盘自动切换回省份模式
        if (props.mode === 'car' && newValue.length === 0 && props.autoSwitchLang) {
            carLang.value = 'zh'
        }
    }
    // 关闭键处理
    else if (type === 'close') {
        handleClose()
    }
    // 普通按键输入处理
    else if (value.length < +props.maxlength) {
        emit('input', text)
        const newValue = value + text
        emit('update:modelValue', newValue)
        // 车牌号键盘自动切换到字母模式
        if (props.mode === 'car' && newValue.length === 1 && props.autoSwitchLang) {
            carLang.value = 'en'
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
