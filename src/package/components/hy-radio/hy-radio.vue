<template>
    <view class="hy-radio-group" :class="bemClass">
        <template v-for="(item, i) in columns_1" :key="i">
            <view
                class="hy-radio cursor-pointer"
                @tap.stop="wrapperClickHandler($event, item)"
                :style="radioStyle"
                :class="[
                    `hy-radio__label--${iconPlacement}`,
                    borderBottom && placement === 'column' && 'hy-border__bottom'
                ]"
            >
                <view
                    class="hy-radio__icon-wrap cursor-pointer"
                    @tap.stop="iconClickHandler($event, item)"
                    :class="iconClasses(item)"
                    :style="iconWrapStyle(item)"
                >
                    <template v-if="item[fieldNames.checked]">
                        <slot
                            v-if="$slots.icon"
                            name="icon"
                            :iconColor="iconColor"
                            :iconSize="addUnit(sizeType[size] || iconSize)"
                        >
                        </slot>
                        <hy-icon
                            v-else
                            class="hy-radio__icon-wrap__icon"
                            :name="IconConfig.CHECK_MASK"
                            :size="addUnit(sizeType[size] || iconSize)"
                            :color="iconColorCom(item.checked)"
                        />
                    </template>
                </view>
                <view
                    class="hy-radio__label--wrap cursor-pointer"
                    @tap.stop="labelClickHandler($event, item)"
                >
                    <slot v-if="$slots.label" name="label" :record="item"> </slot>
                    <text
                        v-else
                        :class="['hy-radio__text', disabled && 'hy-radio__label--wrap--disabled']"
                        :style="{
                            color: labelColor,
                            fontSize: addUnit(sizeType[size] || labelSize)
                        }"
                    >
                        {{ item[fieldNames.label] }}
                    </text>
                </view>
            </view>
        </template>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-radio',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import type { IRadioEmits } from './typing'
import type { CheckboxColumnsVo } from '../hy-check-button/typing'
import { addUnit, bem, error, IconConfig } from '../../libs'
import radioProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @displayName hy-radio
 */
defineOptions({})

const props = defineProps(radioProps)
const emit = defineEmits<IRadioEmits>()

const columns_1 = ref<CheckboxColumnsVo[]>()
const sizeType: AnyObject = reactive({
    small: 14,
    medium: 18,
    large: 24
})

watch(
    () => props.modelValue,
    (newValue) => {
        columns_1.value = props.columns.map((item: any) => {
            item[props.fieldNames.checked] = newValue === item[props.fieldNames.value]
            return item
        })
    },
    { immediate: true }
)

const isDisabled = (disabledVal?: boolean): boolean => props.disabled || !!disabledVal

/**
 * @description icon颜色
 * */
const iconColorCom = computed(() => {
    return (check: boolean) => {
        if (props.disabled) {
            if (check) {
                return '#c8c9cc'
            } else {
                return '#F5F5F5'
            }
        } else {
            return props.iconColor || '#ffffff'
        }
    }
})
/**
 * @description 单选框样式
 * */
const radioStyle = computed(() => {
    const style: CSSProperties = {}
    if (props.borderBottom && props.placement === 'row') {
        error(
            '检测到您将borderBottom设置为true，需要同时将hy-checkbox-group的placement设置为column才有效'
        )
    }
    // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
    if (props.borderBottom && props.placement === 'column') {
        style.paddingBottom = '8px'
    }
    return Object.assign(style, props.customStyle)
})
const bemClass = computed(() => {
    return bem('radio-group', props, ['placement'])
})

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
    return (temp: CheckboxColumnsVo): string[] => {
        let classes: string[] = []
        // 组件的形状
        classes.push('hy-radio__icon-wrap--' + props.shape)
        if (isDisabled(temp?.disabled)) {
            classes.push('hy-radio__icon-wrap--disabled')
        }
        if (temp[props.fieldNames.checked]) {
            classes.push('hy-radio__icon-wrap--checked')
            if (isDisabled(temp?.disabled)) {
                classes.push('hy-radio__icon-wrap--disabled--checked')
            }
        }
        return classes
    }
})

/**
 * @description 定义icon的样式
 * */
const iconWrapStyle = computed(() => {
    return (temp: CheckboxColumnsVo): CSSProperties => {
        // checkbox的整体样式
        const style: CSSProperties = {}
        style.backgroundColor =
            temp[props.fieldNames.checked] && !isDisabled(temp?.disabled) ? props.activeColor : ''
        style.borderColor =
            temp[props.fieldNames.checked] && !isDisabled(temp?.disabled)
                ? props.activeColor
                : props.inactiveColor
        style.width = addUnit(sizeType[props.size] || props.size)
        style.height = addUnit(sizeType[props.size] || props.size)
        return style
    }
})

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
    e.stopPropagation()
    if (!isDisabled(temp?.disabled)) {
        setRadioCheckedStatus(temp)
    }
}
/**
 * @description 点击整体
 * */
const wrapperClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
    e.stopPropagation()
    if (props.labelDisabled || isDisabled(temp?.disabled)) return
    setRadioCheckedStatus(temp)
}
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
    e.stopPropagation()
    if (props.labelDisabled || isDisabled(temp?.disabled)) return
    setRadioCheckedStatus(temp)
}

/**
 * @description 执行函数改变状态传给父值
 * */
const setRadioCheckedStatus = (temp: CheckboxColumnsVo) => {
    // 将本组件标记为与原来相反的状态
    columns_1.value = columns_1.value?.map((item) => {
        item[props.fieldNames.checked] =
            temp[props.fieldNames.value] === item[props.fieldNames.value]
        return item
    })
    emit('update:modelValue', temp[props.fieldNames.value])
    emit('change', temp)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
