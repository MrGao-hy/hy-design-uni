<template>
    <hy-config-provider
        :theme-color="color"
        :theme="darkMode"
        :custom-style="customStyle"
        :custom-class="`${customClass} custom-class`"
    >
        <slot />

        <hy-toast></hy-toast>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { CSSProperties } from 'vue'

interface IProps {
    customStyle?: CSSProperties
    customClass?: string
}

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const props = withDefaults(defineProps<IProps>(), {})
</script>
