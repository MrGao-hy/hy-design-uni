import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThemeModeType } from '@/package'

export const useThemeStore = defineStore(
    'hy_theme',
    () => {
        const color = ref('#892FE8')
        const darkMode = ref<ThemeModeType>('light')
        const showHint = ref(true)

        return {
            color,
            darkMode,
            showHint
        }
    },
    { unistorage: true }
)
