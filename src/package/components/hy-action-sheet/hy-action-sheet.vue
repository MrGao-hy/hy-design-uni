<template>
    <view>
        <hy-popup
            :show="showPopup"
            :duration="duration"
            mode="bottom"
            :close-on-click-overlay="closeOnClickOverlay"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            @open="onOpen"
            @close="onClose"
            :z-index="zIndex"
            :round="round"
        >
            <view
                :class="`hy-action-sheet ${customClass}`"
                :style="`${
                    (actions && actions.length) || (panels && panels.length)
                        ? 'margin: 0 10px calc(var(--window-bottom) + 10px) 10px; border-radius: 16px;'
                        : 'margin-bottom: var(--window-bottom);'
                } ${customStyle}`"
            >
                <!-- 标题 -->
                <view v-if="title" :class="`hy-action-sheet__header ${customHeaderClass}`">
                    {{ title }}
                    <hy-icon
                        customClass="hy-action-sheet__close"
                        class="hy-action-sheet__close"
                        name="close"
                        @click="onClose"
                    />
                </view>
                <!-- 标题 -->

                <!-- 选项卡 -->
                <view class="hy-action-sheet__actions" v-if="actions && actions.length">
                    <view
                        v-for="(action, rowIndex) in actions"
                        :key="rowIndex"
                        :class="`hy-action-sheet__action ${
                            action?.disabled ? 'hy-action-sheet__action--disabled' : ''
                        }  ${action?.loading ? 'hy-action-sheet__action--loading' : ''}`"
                        :style="`color: ${action?.color}`"
                        @click="onSelect(rowIndex, 'action')"
                    >
                        <hy-loading :show="!!action?.loading" mode="circle" />
                        <view v-if="!action?.loading" class="hy-action-sheet__name">{{
                            action?.name
                        }}</view>
                        <view
                            v-if="!action?.loading && action?.sub"
                            class="hy-action-sheet__subname"
                        >
                            {{ action?.sub }}
                        </view>
                    </view>
                </view>
                <!-- 选项卡 -->

                <!-- 自定义面板 -->
                <view v-if="formatPanels && formatPanels.length">
                    <view
                        v-for="(panel, rowIndex) in formatPanels"
                        :key="rowIndex"
                        class="hy-action-sheet__panels"
                    >
                        <view class="hy-action-sheet__panels-content">
                            <view
                                v-for="(col, colIndex) in panel"
                                :key="colIndex"
                                class="hy-action-sheet__panel"
                                @click="onSelect(rowIndex, 'panels', colIndex)"
                            >
                                <image
                                    class="hy-action-sheet__panel-img"
                                    :src="(col as any).iconUrl"
                                />
                                <view class="hy-action-sheet__panel-title">{{
                                    (col as any).name
                                }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- 自定义面板 -->

                <!-- 面板插槽 -->
                <slot />
                <!-- 自定义面板 -->

                <!-- 取消按钮 -->
                <hy-button
                    v-if="cancelText"
                    :text="cancelText"
                    shape="circle"
                    custom-class="hy-action-sheet__cancel"
                    @click="handleCancel"
                ></hy-button>
                <!-- 取消按钮 -->
            </view>
        </hy-popup>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-action-sheet',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { isArray } from '../../libs'
import type { IActionSheetPanel, IActionSheetEmits } from './typing'
import actionSheetProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyPopup from '../hy-popup/hy-popup.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyButton from '../hy-button/hy-button.vue'

/**
 * 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 * @displayName hy-action-sheet
 */
defineOptions({})

const props = defineProps(actionSheetProps)
const emit = defineEmits<IActionSheetEmits>()

const formatPanels = ref<Array<IActionSheetPanel> | Array<IActionSheetPanel[]>>([])
const showPopup = ref<boolean>(false)

watch(() => props.panels, computedValue, { deep: true, immediate: true })

watch(
    () => props.modelValue,
    (newValue) => {
        showPopup.value = newValue
    },
    { deep: true, immediate: true }
)

function isPanelArray() {
    return props.panels.length && !isArray(props.panels[0])
}
function computedValue() {
    formatPanels.value = isPanelArray()
        ? [props.panels as IActionSheetPanel[]]
        : (props.panels as IActionSheetPanel[][])
}

function onSelect(rowIndex: number, type: 'action' | 'panels', colIndex?: number) {
    if (type === 'action') {
        if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
            return
        }
        emit('select', {
            item: props.actions[rowIndex],
            index: rowIndex
        })
    } else if (isPanelArray()) {
        emit('select', {
            item: props.panels[Number(colIndex)],
            index: colIndex
        })
    } else {
        emit('select', {
            item: (props.panels as IActionSheetPanel[][])[rowIndex][Number(colIndex)],
            rowIndex,
            colIndex
        })
    }
    if (props.closeOnClickAction) {
        onClose()
    }
}
function handleCancel() {
    emit('cancel')
    onClose()
}
function onClose() {
    emit('update:modelValue', false)
    emit('close')
}
function onOpen() {
    emit('open')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.hy-action-sheet__header {
    text-align: v-bind(titleAlign);
}
</style>
