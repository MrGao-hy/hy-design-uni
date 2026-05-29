<template>
    <view class="hy-cascader">
        <view v-if="hasInput" class="hy-cascader-input cursor-pointer" @click="onShowByClickInput">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <hy-input
                    v-model="inputLabelValue"
                    :disabled="input?.disabled"
                    :disabledColor="input?.disabledColor"
                    :shape="input?.shape"
                    :border="input?.border"
                    :prefixIcon="input?.prefixIcon"
                    :suffixIcon="input?.suffixIcon"
                    :color="input?.color"
                    :fontSize="input?.fontSize"
                    :inputAlign="input?.inputAlign"
                    :placeholder="input?.placeholder || placeholder"
                    :placeholderStyle="input?.placeholderStyle"
                    :placeholderClass="input?.placeholderClass"
                    :customStyle="Object.assign({ 'pointer-events': 'none' }, input?.customStyle)"
                ></hy-input>
                <view class="input-cover"></view>
            </template>
        </view>
        <hy-popup
            :show="show || (hasInput && showByClickInput)"
            :zIndex="zIndex"
            :round="10"
            :closeOnClickOverlay="closeOnClickOverlay"
            @close="cancel"
            @open="onOpen"
        >
            <view class="hy-cascader">
                <view class="hy-cascader__header" v-if="showToolbar">
                    <view class="hy-cascader__header-title">{{ title || t('placeholder') }}</view>
                    <view class="hy-cascader__header-close" @tap="cancel">
                        <hy-icon name="close" size="20" />
                    </view>
                </view>

                <hy-tabs
                    ref="tabsRef"
                    v-model:current="activeTab"
                    :list="tabsList"
                    :is-swiper="true"
                    swiperHeight="700rpx"
                    :line-width="40"
                >
                    <template #default="{ index: tabIndex }">
                        <view class="hy-cascader__panel">
                            <scroll-view
                                v-if="!loadingTabs.includes(tabIndex)"
                                scroll-y
                                class="hy-cascader__content"
                            >
                                <view
                                    v-for="(item, index) in getOptionsByLevel(tabIndex)"
                                    :key="item[valueKey]"
                                    :class="[
                                        'hy-cascader__item',
                                        isItemSelected(tabIndex, index) &&
                                            'hy-cascader__item--active'
                                    ]"
                                    @tap="handleItemClick(tabIndex, index)"
                                >
                                    {{ item[labelKey] }}
                                    <hy-icon
                                        v-if="
                                            isItemSelected(tabIndex, index) &&
                                            !item[childrenKey]?.length &&
                                            !item[isLeafKey]
                                        "
                                        :name="IconConfig.CHECK_MASK"
                                        :color="themeConfig?.themeColor.value"
                                    />
                                </view>
                            </scroll-view>
                            <hy-loading
                                :show="loadingTabs.includes(tabIndex)"
                                mode="circle"
                                custom-class="hy-cascader__loading"
                            ></hy-loading>
                        </view>
                    </template>
                </hy-tabs>
            </view>
        </hy-popup>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-cascader',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import type { CascaderOption, CascaderValue, CascaderEmitValue } from './typing'
import type { ICascaderEmits } from './typing'
import type { ITabsExpose, TabsItemVo } from '../hy-tabs/typing'
import cascaderProps from './props'
import { useTranslate, IconConfig } from '../../libs'
// 组件
import HyTabs from '../hy-tabs/hy-tabs.vue'
import HyPopup from '../hy-popup/hy-popup.vue'
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyInput from '../hy-input/hy-input.vue'

const { t } = useTranslate('cascader')

defineOptions({})

const props = defineProps(cascaderProps)
const emit = defineEmits<ICascaderEmits>()

const showByClickInput = ref(false)
const activePath = ref<number[]>([])
const activeTab = ref(0)
const themeConfig = inject('hy-config-provider', null)
const innerOptions = ref<CascaderOption[]>([...props.options])
const loadingTabs = ref<number[]>([])
const isRestoring = ref(false)
const tabsRef = ref<ITabsExpose>()
console.log(themeConfig)

/**
 * 生成标签页列表，用于显示已选择的路径层级
 * @returns {TabsItemVo[]} 标签页列表
 */
const tabsList = computed((): TabsItemVo[] => {
    const tabs: TabsItemVo[] = [{ name: '请选择' }]
    let currentOptions = innerOptions.value

    for (let i = 0; i < activePath.value.length; i++) {
        const index = activePath.value[i]
        const selected = currentOptions[index]
        if (selected) {
            tabs[i] = { name: selected[props.labelKey] }
            if (selected[props.childrenKey]?.length) {
                tabs[i + 1] = { name: '请选择' }
            }
            currentOptions = selected[props.childrenKey] || []
        }
    }

    return tabs.slice(0, activePath.value.length + 1)
})

/**
 * 根据层级获取对应级别的选项列表
 * @param {number} level - 层级索引
 * @returns {CascaderOption[]} 对应层级的选项列表
 */
const getOptionsByLevel = (level: number): CascaderOption[] => {
    if (level === 0) {
        return innerOptions.value
    }

    let options = innerOptions.value
    for (let i = 0; i < level; i++) {
        const index = activePath.value[i]
        if (options[index]?.[props.childrenKey]) {
            options = options[index][props.childrenKey]
        } else {
            return []
        }
    }
    return options
}

/**
 * DFS 查找某父节点的已缓存子节点
 * @param {string | number} parentValue - 父节点的值
 * @returns {CascaderOption[] | null} 缓存的子节点列表
 */
const getCachedChildren = (parentValue: string | number): CascaderOption[] | null => {
    const { valueKey, childrenKey } = props

    function dfs(options: CascaderOption[]): CascaderOption[] | null {
        for (const option of options) {
            if (option[valueKey] === parentValue) {
                const children = option[childrenKey]
                return Array.isArray(children) ? children : null
            }
            if (option[childrenKey] && option[childrenKey].length > 0) {
                const result = dfs(option[childrenKey])
                if (result) return result
            }
        }
        return null
    }

    return innerOptions.value.length > 0 ? dfs(innerOptions.value) : null
}

/**
 * 将异步加载的子节点挂载到缓存树中对应父节点下
 * @param {string | number} parentValue - 父节点的值
 * @param {CascaderOption[]} children - 子节点列表
 */
const attachChildrenToTree = (parentValue: string | number, children: CascaderOption[]) => {
    const { valueKey, childrenKey } = props

    function dfs(options: CascaderOption[]): boolean {
        for (const option of options) {
            if (option[valueKey] === parentValue) {
                option[childrenKey] = children
                return true
            }
            if (option[childrenKey] && option[childrenKey].length > 0) {
                if (dfs(option[childrenKey])) return true
            }
        }
        return false
    }

    dfs(innerOptions.value)
}

/**
 * 判断指定层级的选项是否被选中
 * @param {number} level - 层级索引
 * @param {number} index - 选项索引
 * @returns {boolean} 是否被选中
 */
const isItemSelected = (level: number, index: number): boolean => {
    if (level >= activePath.value.length) return false
    return activePath.value[level] === index
}

/**
 * 根据 modelValue 初始化选中路径（静态模式）
 */
const initActivePath = () => {
    if (!props.modelValue || !props.modelValue.value.length) {
        activePath.value = []
        return
    }

    const path: number[] = []
    let options = innerOptions.value

    for (const targetValue of props.modelValue.value) {
        const index = options.findIndex((opt) => opt[props.valueKey] === targetValue)
        if (index === -1) break
        path.push(index)
        options = options[index]?.[props.childrenKey] || []
    }

    activePath.value = path
    activeTab.value = path.length > 0 ? path.length - 1 : 0
}

/**
 * 异步模式下根据路径数组逐级调用 lazyLoad 恢复选中状态
 * @param {(string | number)[]} pathValues - 路径值数组
 */
const autoRestoreFromPath = (pathValues: (string | number)[]) => {
    const { lazyLoad, valueKey } = props
    if (!lazyLoad || pathValues.length === 0) return

    isRestoring.value = true

    function restoreLevel(level: number, parentOption: CascaderOption | null) {
        const targetValue = pathValues[level]
        const isLastLevel = level === pathValues.length - 1

        let cachedOptions: CascaderOption[] | null = null
        if (level === 0) {
            cachedOptions = innerOptions.value.length > 0 ? innerOptions.value : null
        } else if (parentOption) {
            cachedOptions = getCachedChildren(parentOption[valueKey])
        }

        if (cachedOptions) {
            const matchedIndex = cachedOptions.findIndex((opt) => opt[valueKey] === targetValue)
            activePath.value = activePath.value.slice(0, level)
            if (matchedIndex !== -1) {
                activePath.value.push(matchedIndex)
            }
            activeTab.value = Math.max(activePath.value.length - 1, 0)

            if (matchedIndex === -1 || isLastLevel) {
                isRestoring.value = false
                return
            }
            restoreLevel(level + 1, cachedOptions[matchedIndex])
        } else {
            const tabIndex = level
            loadingTabs.value = [...loadingTabs.value, tabIndex]

            lazyLoad!(parentOption, tabIndex, (children) => {
                loadingTabs.value = loadingTabs.value.filter((i) => i !== tabIndex)

                if (level === 0) {
                    innerOptions.value = children
                } else if (parentOption) {
                    attachChildrenToTree(parentOption[valueKey], children)
                }

                if (children.length === 0) {
                    isRestoring.value = false
                    return
                }

                const matchedIndex = children.findIndex((opt) => opt[valueKey] === targetValue)
                activePath.value = activePath.value.slice(0, level)
                if (matchedIndex !== -1) {
                    activePath.value.push(matchedIndex)
                }
                activeTab.value = Math.max(activePath.value.length - 1, 0)

                if (matchedIndex === -1 || isLastLevel) {
                    isRestoring.value = false
                    return
                }
                restoreLevel(level + 1, children[matchedIndex])
            })
        }
    }

    restoreLevel(0, null)
}

watch(
    () => props.options,
    (newOptions) => {
        innerOptions.value = [...newOptions]
        if (!props.lazyLoad) {
            initActivePath()
        }
    },
    { deep: true, immediate: true }
)

watch(
    () => props.modelValue,
    () => {
        if (!props.lazyLoad) {
            initActivePath()
        } else if (props.modelValue && props.modelValue.value.length > 0) {
            autoRestoreFromPath(props.modelValue.value)
        }
    },
    { deep: true }
)

watch(
    () => showByClickInput.value || props.show,
    (val) => {
        if (val && props.lazyLoad && innerOptions.value.length === 0) {
            loadingTabs.value = [0]
            props.lazyLoad(null, 0, (children) => {
                innerOptions.value = children
                loadingTabs.value = loadingTabs.value.filter((i) => i !== 0)
            })
        }
    }
)

/**
 * 处理选项点击事件
 * @param {number} level - 当前层级
 * @param {number} index - 点击的选项索引
 */
const handleItemClick = (level: number, index: number) => {
    const options = getOptionsByLevel(level)
    const item = options[index]
    if (item.disabled) return

    activePath.value = activePath.value.slice(0, level)
    activePath.value.push(index)
    activeTab.value = level

    const { childrenKey, lazyLoad, isLeafKey, valueKey } = props

    if (item[isLeafKey] === true) {
        onConfirm()
        return
    }

    if (lazyLoad) {
        const cachedChildren = getCachedChildren(item[valueKey])

        loadingTabs.value = [...loadingTabs.value, level]

        if (cachedChildren !== null) {
            setTimeout(() => {
                loadingTabs.value = loadingTabs.value.filter((i) => i !== level)
                activeTab.value = level + 1
            }, 300)
        } else {
            const nextTabIndex = level + 1
            lazyLoad(item, nextTabIndex, (children) => {
                loadingTabs.value = loadingTabs.value.filter((i) => i !== level)
                attachChildrenToTree(item[valueKey], children)

                if (children.length === 0) {
                    onConfirm()
                } else {
                    activeTab.value = nextTabIndex
                }
            })
        }
        return
    }

    if (!item[childrenKey]?.length) {
        onConfirm()
        return
    }

    activeTab.value = level + 1
}

/**
 * 获取要发射的选中值对象
 * @returns {CascaderEmitValue} 包含 value、label、selectedOptions 的对象
 */
const getEmitValue = (): CascaderEmitValue => {
    const value: (string | number)[] = []
    const label: string[] = []
    const selectedOptions: CascaderOption[] = []

    let options = innerOptions.value

    for (const index of activePath.value) {
        const selected = options[index]
        if (selected) {
            value.push(selected[props.valueKey])
            label.push(selected[props.labelKey])
            selectedOptions.push(selected)
            options = selected[props.childrenKey] || []
        }
    }

    return { value, label, selectedOptions }
}

/**
 * 计算输入框显示的标签值，将选中的标签用分隔符连接
 * @returns {string} 输入框显示的文本
 */
const inputLabelValue = computed((): string => {
    if (!props.modelValue || !props.modelValue.label.length) return ''
    return props.modelValue.label.join(props.separator)
})

/**
 * 处理输入框点击事件，切换弹窗显示状态
 */
const onShowByClickInput = () => {
    if (!props.input?.disabled) {
        showByClickInput.value = !showByClickInput.value
    }
}

/**
 * 取消选择，关闭弹窗
 */
const cancel = () => {
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('update:show', false)
    emit('cancel')
}

/**
 * 确认选择，关闭弹窗并发射选中值
 */
const onConfirm = () => {
    const emitValue = getEmitValue()
    const modelValue: CascaderValue = {
        value: emitValue.value,
        label: emitValue.label
    }
    emit('update:modelValue', modelValue)
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('update:show', false)
    emit('confirm', emitValue)
}

/**
 * 打开弹窗执行函数
 */
const onOpen = () => {
    tabsRef.value?.resize()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
