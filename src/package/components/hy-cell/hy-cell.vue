<template>
    <view :style="customStyle" class="hy-cell">
        <view
            :class="['hy-cell--title', showVertical && 'hy-cell--title__vertical']"
            v-if="title || $slots['title']"
        >
            <!-- @slot 标题插槽 -->
            <slot v-if="$slots.title" name="title" :title="title"></slot>
            <text v-else class="hy-cell--title__text">{{ title }}</text>
        </view>
        <view class="hy-cell__body" :style="{ 'border-radius': addUnit(borderRadius) }">
            <!-- @slot 整体插槽 -->
            <slot v-if="$slots.default"></slot>
            <template v-else v-for="(item, i) in list" :key="i">
                <view
                    :class="ItemClass"
                    :hover-class="containerClass(item)"
                    :hover-stay-time="250"
                    :style="{
                        borderBottom: border && i !== list.length - 1 ? '1rpx solid #c8c7cc66' : ''
                    }"
                    @tap="clickHandler($event, item, i)"
                >
                    <view class="hy-cell__body--container__content">
                        <view
                            v-if="item?.icon?.name || $slots.icon"
                            class="hy-cell__body--container__content--icon"
                        >
                            <!-- @slot 图标插槽 -->
                            <slot v-if="$slots.icon" name="icon" :icon="item?.icon"></slot>
                            <HyIcon
                                v-else
                                :size="iconSize"
                                :name="item?.icon?.name"
                                :color="disabled || item?.disabled ? '#c0c0c0' : item?.icon?.color"
                                :bold="item?.icon?.bold"
                                :customPrefix="item?.icon?.customPrefix"
                                :imgMode="item?.icon?.imgMode"
                                :width="item?.icon?.width"
                                :height="item?.icon?.height"
                                :top="item?.icon?.top"
                                :stop="item?.icon?.stop"
                                :round="item?.icon?.round"
                                :customStyle="item?.icon?.customStyle"
                            ></HyIcon>
                        </view>
                        <view class="hy-cell__body--container__content--title">
                            <!-- 将slot与默认内容用if/else分开主要是因为微信小程序不支持slot嵌套传递，这样才能解决collapse组件的slot不失效问题，label暂时未用到。 -->
                            <!-- @slot 列表标题插槽 -->
                            <slot
                                v-if="$slots['cell-title']"
                                name="cell-title"
                                :title="item?.title"
                            ></slot>
                            <text
                                v-else
                                class="hy-cell__body--container__content--title__text"
                                :class="[(disabled || item?.disabled) && 'hy-cell__disabled']"
                            >
                                {{ item?.title }}
                            </text>
                            <!-- @slot 列表小标题插槽 -->
                            <template v-if="item?.subhead">
                                <slot v-if="$slots.sub" name="sub" :sub="item.subhead"></slot>
                                <text
                                    v-else
                                    class="hy-cell__body--container__content--title__sub"
                                    :class="[disabled && 'hy-cell__disabled']"
                                >
                                    {{ item.subhead }}
                                </text>
                            </template>
                        </view>
                    </view>
                    <view
                        class="hy-cell__body--container__center"
                        :style="{
                            justifyContent:
                                arrange === 'left'
                                    ? 'flex-start'
                                    : arrange === 'right'
                                      ? 'flex-end'
                                      : 'center'
                        }"
                    >
                        <!-- @slot 值内容插槽 -->
                        <slot v-if="$slots.value" name="value" :record="item"></slot>
                        <text
                            v-else-if="value || item?.value"
                            :class="[
                                'hy-cell__body__container__center--value',
                                disabled && 'hy-cell--disabled'
                            ]"
                        >
                            {{ item.value || value }}
                        </text>
                    </view>
                    <view
                        class="hy-cell__body--container__right-icon"
                        :class="[
                            `hy-cell__body--container__right-icon--${item?.arrowDirection || arrowDirection}`
                        ]"
                    >
                        <!-- @slot 右边按钮插槽 -->
                        <slot
                            v-if="$slots['right-icon']"
                            name="right-icon"
                            :icon="item?.rightIcon || rightIcon"
                        ></slot>
                        <HyIcon
                            v-else
                            :name="item?.rightIcon?.name || rightIcon?.name || IconConfig.RIGHT"
                            :color="
                                disabled || item?.disabled
                                    ? '#c0c0c0'
                                    : item?.rightIcon?.color || rightIcon?.color
                            "
                            :bold="item?.rightIcon?.bold || rightIcon?.bold"
                            :customPrefix="item?.rightIcon?.customPrefix || rightIcon?.customPrefix"
                            :imgMode="item?.rightIcon?.imgMode || rightIcon?.imgMode"
                            :width="item?.rightIcon?.width || rightIcon?.width"
                            :height="item?.rightIcon?.height || rightIcon?.height"
                            :top="item?.rightIcon?.top || rightIcon?.name"
                            :stop="item?.rightIcon?.stop || rightIcon?.stop"
                            :round="item?.rightIcon?.round || rightIcon?.round"
                            :customStyle="item?.rightIcon?.customStyle || rightIcon?.customStyle"
                        ></HyIcon>
                    </view>
                </view>

                <!-- @slot 底部插槽 -->
                <slot name="bottom" :record="item" />
            </template>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-cell',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ICellEmits } from './typing'
import type { CellContentVo } from './typing'
import { IconConfig, addUnit } from '../../libs'
import cellProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * cell单元格一般用于一组列表的情况，比如个人中心页，设置页等
 * @displayName hy-cell
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps(cellProps)
const emit = defineEmits<ICellEmits>()

/**
 * @description 计算什么时候出现点击状态
 * */
const containerClass = computed(() => {
    return (temp: CellContentVo): string => {
        return [
            !props.disabled &&
                !temp?.disabled &&
                props.clickable &&
                'hy-cell__body--container__clickable'
        ]
            .filter(Boolean)
            .join()
    }
})
const ItemClass = computed(() => {
    return ['hy-cell__body--container', `hy-cell__body--container__${props.size}`]
})

const iconSize = computed(() => {
    switch (props.size) {
        case 'large':
            return 25
        case 'medium':
            return 20
        case 'small':
            return 15
    }
})

/**
 * @description 点击cell
 * */
const clickHandler = (e: Event, temp: CellContentVo, index: number) => {
    if (props.disabled) return
    emit('click', temp, index)
    if (temp?.url) {
        uni.navigateTo({
            url: temp.url
        })
    }
    e.stopPropagation()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
