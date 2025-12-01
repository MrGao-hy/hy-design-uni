<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-dropdown>
            <hy-dropdown-item
                title="全部"
                :menus="options1"
                v-model="value1"
                @change="handleChange"
            ></hy-dropdown-item>
            <hy-dropdown-item
                title="国漫"
                :menus="options_2"
                v-model="value_2"
                @change="handleChange"
            ></hy-dropdown-item>
            <hy-dropdown-item
                title="国家"
                :menus="options_3"
                v-model="value_3"
                @change="handleChange"
            ></hy-dropdown-item>
        </hy-dropdown>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyDropdownItem from '@/package/components/hy-dropdown-item/hy-dropdown-item.vue'
import HyDropdown from '@/package/components/hy-dropdown/hy-dropdown.vue'
import { ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const value1 = ref()
const value_2 = ref()
const value_3 = ref()
const options1 = ref([
    {
        label: '全部商品',
        value: 1
    },
    {
        label: '折扣商品',
        value: 2
    },
    {
        label: '团购商品',
        value: 3
    }
])
const options_2 = ref([
    {
        label: '西行记',
        value: 1
    },
    {
        label: '斗破苍穹',
        value: 2
    },
    {
        label: '吞噬星空',
        value: 3
    },
    {
        label: '斗罗大陆',
        value: 4
    },
    {
        label: '偷心九月天',
        value: 5
    }
])
const options_3 = ref([
    {
        label: '中国',
        value: 1
    },
    {
        label: '日本',
        value: 2
    },
    {
        label: '韩国',
        value: 3
    },
    {
        label: '美国',
        value: 4
    }
])
const handleChange = (e) => {}
</script>

<style scoped lang="scss"></style>
