<template>
    <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler"
        :style="[checkboxStyle, customStyle]"
        :class="[checkboxClasses, customClass]"
    >
        <view @tap.stop="iconClickHandler" :class="iconClasses" :style="iconWrapStyle">
            <slot v-if="$slots.icon" name="icon" :isChecked="isChecked"></slot>
            <hy-icon
                v-else
                :name="iconNameCom"
                :size="
                    addUnit(
                        checkboxGroup?.size
                            ? sizeType[checkboxGroup.size.value]
                            : checkboxGroup?.iconSize?.value
                    )
                "
                :color="iconColorCom"
                custom-class="hy-checkbox__icon"
            />
        </view>
        <view
            :class="[
                'hy-checkbox--label__wrap',
                'cursor-pointer',
                disabled && 'hy-checkbox--label__wrap--disabled'
            ]"
            @tap.stop="labelClickHandler"
        >
            <slot name="label">
                <text
                    :style="{
                        color: checkboxGroup?.labelColor?.value,
                        fontSize: addUnit(
                            checkboxGroup?.size
                                ? sizeType[checkboxGroup.size.value]
                                : checkboxGroup?.labelSize?.value
                        )
                    }"
                >
                    {{ label }}
                </text>
            </slot>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-checkbox',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, watch, ref, reactive, inject } from 'vue'
import type { CSSProperties } from 'vue'
import { IconConfig, addUnit, error } from '../../libs'
import type { ICheckboxGroupContext } from './typing'
import checkboxItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 复选框组件一般用于需要多个选择的场景，需要搭配hy-checkbox-group一起使用
 * @displayName hy-checkbox-item
 */
defineOptions({})

const props = defineProps(checkboxItemProps)

// 注入表单上下文
const checkboxGroup = inject<ICheckboxGroupContext>('hy-checkbox-group')
const isChecked = ref(false)
const sizeType: AnyObject = reactive({
    small: 14,
    medium: 18,
    large: 24
})

watch(
    () => props.checked,
    (newValue) => {
        isChecked.value = newValue
        if (props.checked) checkboxGroup?.setCheckedStatus(props.value)
    },
    { immediate: true }
)

watch(
    () => checkboxGroup?.modelValue,
    (newVal) => {
        if (newVal?.value?.length) {
            isChecked.value = newVal.value.includes(props.value)
        } else {
            isChecked.value = false
        }
    },
    { immediate: true }
)

const isDisabled = (): boolean => checkboxGroup?.disabled?.value || props.disabled

/**
 * @description 复选框根节点的类名：图标方位与纵向下划线
 * */
const checkboxClasses = computed(() => {
    return [
        `hy-checkbox--label__${checkboxGroup?.iconPlacement?.value}`,
        checkboxGroup?.borderBottom?.value &&
            checkboxGroup?.placement?.value === 'column' &&
            'hy-border__bottom'
    ]
})

const checkboxStyle = computed(() => {
    const style: CSSProperties = {}
    if (checkboxGroup?.borderBottom?.value && checkboxGroup?.placement?.value === 'row') {
        error(
            '检测到您将borderBottom设置为true，需要同时将hy-checkbox-group的placement设置为column才有效'
        )
    }
    // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
    if (checkboxGroup?.borderBottom?.value && checkboxGroup?.placement?.value === 'column') {
        style.paddingBottom = '8px'
    }
    return Object.assign(style, checkboxGroup?.customStyle?.value)
})
/**
 * @description 根据形状与选中态计算图标名称：circle默认CIRCLE、选中CHECK_CIRCLE_FILL；square默认SQUARE、选中CHECK_SQUARE_FILL
 *              （SQUARE/CIRCLE 字形待 iconfont 平台补充，补充前未选中态显示空白）
 * */
const iconNameCom = computed(() => {
    // 默认跟随checkbox-group的square形状
    if (checkboxGroup?.shape?.value === 'circle') {
        return isChecked.value ? IconConfig.CHECK_CIRCLE_FILL : IconConfig.CIRCLE
    }
    return isChecked.value ? IconConfig.CHECK_SQUARE_FILL : IconConfig.SQUARE
})

/**
 * @description icon颜色：选中时使用activeColor，未选中时使用inactiveColor；
 *              未设置时返回undefined交由CSS主题token控制，禁用态由透明度弱化
 * */
const iconColorCom = computed(() => {
    return isChecked.value ? checkboxGroup?.activeColor?.value : checkboxGroup?.inactiveColor?.value
})

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
    let classes: string[] = ['hy-checkbox--icon-wrap', 'cursor-pointer']
    if (isDisabled()) {
        classes.push('hy-checkbox--icon-wrap--disabled')
    }
    if (isChecked.value) {
        classes.push('is-checked')
        if (isDisabled()) {
            classes.push('hy-checkbox--icon-wrap--disabled')
        }
    }
    return classes
})

/**
 * @description 定义icon容器的样式：仅控制尺寸，形状与颜色由图标自身呈现
 * */
const iconWrapStyle = computed(() => {
    const style: CSSProperties = {}
    if (checkboxGroup?.size?.value) {
        style.width = addUnit(sizeType[checkboxGroup.size.value] || checkboxGroup.size.value)
        style.height = addUnit(sizeType[checkboxGroup.size.value] || checkboxGroup.size.value)
    }
    return style
})

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event) => {
    e.stopPropagation()
    if (!isDisabled()) {
        setCheckedStatus()
    }
}
/**
 * @description 点击整行
 * */
const wrapperClickHandler = (e: Event) => {
    e.stopPropagation()
    if (checkboxGroup?.labelDisabled?.value || isDisabled()) return
    setCheckedStatus()
}
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event) => {
    e.stopPropagation()
    if (checkboxGroup?.labelDisabled?.value || isDisabled()) return
    setCheckedStatus()
}

const setCheckedStatus = () => {
    // 将本组件标记为与原来相反的状态
    isChecked.value = !isChecked.value
    checkboxGroup?.setCheckedStatus(props.value)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
