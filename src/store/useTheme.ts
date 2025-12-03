import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { colorGradient } from '@/package'

export const useThemeStore = defineStore(
    'hy_theme',
    () => {
        const color = ref('#892FE8')
        const darkMode = ref('light')
        const showHint = ref(true)

        return {
            color,
            darkMode,
            showHint
        }
    },
    { unistorage: true }
)
