<template>
    <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler"
        :style="[checkboxStyle, customStyle]"
        :class="[checkboxClasses, customClass]"
    >
        <view @tap.stop="iconClickHandler" :class="iconClasses" :style="iconWrapStyle">
            <slot name="icon" :isChecked="isChecked">
                <hy-icon
                    :name="iconNameCom"
                    :size="
                        addUnit(
                            checkboxGroup?.props.size
                                ? sizeType[checkboxGroup.props.size]
                                : checkboxGroup?.props.iconSize
                        )
                    "
                    :color="iconColorCom"
                    custom-class="hy-checkbox__icon"
                />
            </slot>
        </view>
        <view
            :class="[
                'hy-checkbox--label__wrap',
                'cursor-pointer',
                (disabled || checkboxGroup?.props.labelDisabled || checkboxGroup?.props.disabled) &&
                    'hy-checkbox--label__wrap--disabled'
            ]"
            @tap.stop="labelClickHandler"
        >
            <slot name="label">
                <text
                    :style="{
                        color: checkboxGroup?.props.labelColor,
                        fontSize: addUnit(
                            checkboxGroup?.props.size
                                ? sizeType[checkboxGroup.props.size]
                                : checkboxGroup?.props.labelSize
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
    name: 'hy-checkbox-item',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, watch, ref, reactive } from 'vue'
import type { CSSProperties } from 'vue'
import { IconConfig, addUnit, error, useParent } from '../../libs'
import type { ICheckboxGroupContext } from '../hy-checkbox-group/typing'
import { CHECKBOX_GROUP_KEY } from '../hy-checkbox-group/checkbox'
import checkboxItemProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 复选框组件一般用于需要多个选择的场景，需要搭配hy-checkbox-group一起使用
 * @displayName hy-checkbox-item
 */
defineOptions({})

const props = defineProps(checkboxItemProps)

// 注入复选框组上下文
const { parent: checkboxGroup } = useParent<ICheckboxGroupContext>(CHECKBOX_GROUP_KEY)
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
        if (props.checked) checkboxGroup.value?.setCheckedStatus(props.value)
    },
    { immediate: true }
)

watch(
    () => checkboxGroup.value?.props.modelValue,
    (newVal) => {
        if (newVal?.length) {
            isChecked.value = newVal.includes(props.value)
        } else {
            isChecked.value = false
        }
    },
    { immediate: true }
)

const isDisabled = (): boolean => checkboxGroup.value?.props.disabled || props.disabled

/**
 * @description 复选框根节点的类名：图标方位与纵向下划线
 * */
const checkboxClasses = computed(() => {
    return [
        `hy-checkbox--label__${checkboxGroup.value?.props.iconPlacement}`,
        checkboxGroup.value?.props.borderBottom &&
            checkboxGroup.value?.props.placement === 'column' &&
            'hy-border__bottom'
    ]
})

const checkboxStyle = computed(() => {
    const style: CSSProperties = {}
    if (checkboxGroup.value?.props.borderBottom && checkboxGroup.value?.props.placement === 'row') {
        error(
            '检测到您将borderBottom设置为true，需要同时将hy-checkbox-group的placement设置为column才有效'
        )
    }
    // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
    if (
        checkboxGroup.value?.props.borderBottom &&
        checkboxGroup.value?.props.placement === 'column'
    ) {
        style.paddingBottom = '8px'
    }
    return Object.assign(style, checkboxGroup.value?.props.customStyle)
})
/**
 * @description 根据形状与选中态计算图标名称：circle默认CIRCLE、选中CHECK_CIRCLE_FILL；square默认SQUARE、选中CHECK_SQUARE_FILL
 *              （SQUARE/CIRCLE 字形待 iconfont 平台补充，补充前未选中态显示空白）
 * */
const iconNameCom = computed(() => {
    // 默认跟随checkbox-group的square形状
    if (checkboxGroup.value?.props.shape === 'circle') {
        return isChecked.value ? IconConfig.CHECK_CIRCLE_FILL : IconConfig.CIRCLE
    }
    return isChecked.value ? IconConfig.CHECK_SQUARE_FILL : IconConfig.SQUARE
})

/**
 * @description icon颜色：选中时使用activeColor，未选中时使用inactiveColor；
 *              未设置时返回undefined交由CSS主题token控制，禁用态由透明度弱化
 * */
const iconColorCom = computed(() => {
    return isChecked.value
        ? checkboxGroup.value?.props.activeColor
        : checkboxGroup.value?.props.inactiveColor
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
    if (checkboxGroup.value?.props.size) {
        style.width = addUnit(
            sizeType[checkboxGroup.value.props.size] || checkboxGroup.value.props.size
        )
        style.height = addUnit(
            sizeType[checkboxGroup.value.props.size] || checkboxGroup.value.props.size
        )
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
    if (checkboxGroup.value?.props.labelDisabled || isDisabled()) return
    setCheckedStatus()
}
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event) => {
    e.stopPropagation()
    if (checkboxGroup.value?.props.labelDisabled || isDisabled()) return
    setCheckedStatus()
}

const setCheckedStatus = () => {
    // 将本组件标记为与原来相反的状态
    isChecked.value = !isChecked.value
    checkboxGroup.value?.setCheckedStatus(props.value)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
