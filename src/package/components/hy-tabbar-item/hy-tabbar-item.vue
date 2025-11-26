<template>
    <view class="hy-tabbar-item" @click="handleClick">
        <view class="hy-tabbar-item__body">
            <hy-badge
                :value="value"
                :show="!!value"
                absolute
                :offset="tabbarConfig?.badgeProps.value?.offset || [-10, 18]"
                :isDot="tabbarConfig?.badgeProps.value?.isDot"
                :max="tabbarConfig?.badgeProps.value?.max"
                :type="tabbarConfig?.badgeProps.value?.type"
                :bgColor="tabbarConfig?.badgeProps.value?.bgColor"
                :color="tabbarConfig?.badgeProps.value?.color"
                :shape="tabbarConfig?.badgeProps.value?.shape"
                :numberType="tabbarConfig?.badgeProps.value?.numberType"
                :inverted="tabbarConfig?.badgeProps.value?.inverted"
            >
            </hy-badge>
            <slot v-if="$slots.icon" name="icon" :active="active"></slot>
            <hy-icon
                v-else
                :name="icon"
                :color="iconColor"
                :size="tabbarConfig?.iconSize?.value"
                :custom-class="`hy-tabbar-item__body-icon ${active ? 'is-active' : 'is-inactive'}`"
            ></hy-icon>
            <text
                v-if="title"
                :style="{ color: iconColor, fontSize: tabbarConfig?.fontSize?.value }"
                :class="`hy-tabbar-item__body-title ${active ? 'is-active' : 'is-inactive'}`"
            >
                {{ title }}
            </text>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tabbar-item',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import tabbarItemProps from './props'
import type { ITabbarConfig } from './typing'

// 组件
import HyBadge from '../hy-badge/hy-badge.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 底部导航栏，用于在不同页面之间进行切换。
 * @displayName hy-tabbar-item
 */
defineOptions({})

const props = defineProps(tabbarItemProps)

// 尝试从父组件注入配置
const tabbarConfig = inject<ITabbarConfig>('hy-tabbar')
// 获取唯一 ID
const uid = ref<number>(tabbarConfig?.getIndex()!)

const iconColor = computed(() => {
    if (tabbarConfig) {
        if (active.value && tabbarConfig.activeColor?.value) {
            return tabbarConfig.activeColor.value
        }
        if (!active.value && tabbarConfig.inactiveColor?.value) {
            return tabbarConfig.inactiveColor.value
        }
    }
})

const active = computed(() => {
    const name = props.name || uid.value
    if (tabbarConfig) {
        return tabbarConfig.modelValue.value === name
    } else {
        return false
    }
})

/**
 * 点击tabbar选项
 */
function handleClick() {
    const index: string | number = props.name || uid.value
    if (tabbarConfig && index !== tabbarConfig?.modelValue?.value) {
        tabbarConfig.setChange(index)
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
