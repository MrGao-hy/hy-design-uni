<template>
    <view :class="themeClass" :style="themeStyle">
        <!-- @slot 默认插槽 -->
        <slot />
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-config-provider',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit, colorGradient } from '../../libs'
import configProviderProps from './props'

/**
 * 将 ConfigProvider 组件的 theme 属性设置为 dark，可以开启深色模式。 深色模式会全局生效，使页面上的所有 Wot 组件变为深色风格。
 * @displayName hy-config-provider
 */
defineOptions({})

const props = defineProps(configProviderProps)

const themeClass = computed(() => {
    return [props.customClass, 'hy-config-provider', `hy-theme--${props.theme}`]
})

const themeStyle = computed(() => {
    return [
        {
            '--hy-theme-color': props.themeColor,
            '--hy-theme--light':
                props.theme === 'light'
                    ? colorGradient(props.themeColor)[80]
                    : colorGradient(props.themeColor, '#000')[60],
            padding: addUnit(props.padding)
        },
        props.customStyle
    ]
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
