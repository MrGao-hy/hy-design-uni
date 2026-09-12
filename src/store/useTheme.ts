import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThemeModeType } from '@/package'

export type LocaleType = 'zh-CN' | 'en-US'

export const useThemeStore = defineStore(
    'hy_theme',
    () => {
        const color = ref('#892FE8')
        const darkMode = ref<ThemeModeType>('light')
        const showHint = ref(true)
        const locale = ref<LocaleType>('zh-CN')

        return {
            color,
            darkMode,
            showHint,
            locale
        }
    },
    { unistorage: true }
)
