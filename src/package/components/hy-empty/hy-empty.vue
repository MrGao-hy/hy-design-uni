<template>
    <view :class="['hy-empty', customClass]" v-if="show" :style="emptyStyle">
        <view class="hy-empty__img" :style="imgStyle">
            <hy-image
                :src="imageUrl || emptyIcon[mode].icon"
                :width="width"
                :height="height"
                img-mode="widthFix"
            ></hy-image>
        </view>
        <view v-if="$slots.default">
            <slot></slot>
        </view>
        <view class="hy-empty--description" v-else>
            <!-- 详情描述 -->
            <slot v-if="$slots.description" name="description"></slot>
            <text v-else :style="descriptionStyle">{{
                emptyDescription || emptyIcon[mode].desc
            }}</text>
            <view class="hy-empty--button" v-if="button?.text">
                <hy-button
                    :text="button?.text"
                    :size="button?.size"
                    :type="button?.type"
                    :shape="button?.shape"
                    :plain="button?.plain"
                    :custom-style="button?.customStyle"
                    @click="handleClick"
                ></hy-button>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-empty',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit } from '../../libs'
import emptyIcon from './icon'
import type { IEmptyEmits } from './typing'
import emptyProps from './props'
// 组件
import HyButton from '../hy-button/hy-button.vue'
import HyImage from '../hy-image/hy-image.vue'

/**
 * 加载的第一页数据就为空
 * @displayName hy-empty
 */
defineOptions({})

const props = defineProps(emptyProps)
const emit = defineEmits<IEmptyEmits>()

const emptyDescription = computed(() => {
    return props.description
})

/**
 * @description 整体样式
 * */
const emptyStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        zIndex: props.zIndex
    }
    return Object.assign(style, props.customStyle)
})

/**
 * @description 提示信息样式
 * */
const descriptionStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        fontSize: addUnit(props.desSize),
        color: props.desColor
    }
    return style
})

/**
 * @description 图片样式
 * */
const imgStyle = computed<CSSProperties>(() => {
    return {
        width: addUnit(props.width),
        height: addUnit(props.height),
        margin: props.imgMargin
    }
})

/**
 * @description 点击按钮，跳转页面
 * */
const handleClick = () => {
    emit('click')
    if (props.navigateUrl) {
        uni.navigateTo({
            url: props.navigateUrl
        })
    }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
