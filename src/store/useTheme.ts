import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { colorGradient } from '@/package'

export const useThemeStore = defineStore(
    'hy_theme',
    () => {
        const color = ref('#892FE8')
        const darkMode = ref('light')
        const showHint = ref(true)

        // const lightColor = computed(() => {
        //   return colorGradient(
        //     color.value,
        //     darkMode.value === "dark" ? "#000000" : "#ffffff",
        //   )[90];
        // });
        const themeColor = ref({})

        return {
            color,
            themeColor,
            darkMode,
            showHint
            // lightColor,
        }
    },
    { unistorage: true }
)
