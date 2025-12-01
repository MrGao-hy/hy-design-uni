<template>
    <view
        :style="FloatButtonStyle"
        :id="soleId"
        :class="[
            'hy-float-button',
            {
                'hy-float-button__animation': float,
                'hy-float-button__shadow': shadow
            },
            `hy-float-button--${shape}`,
            customClass
        ]"
        @touchmove.stop.prevent="handleTouchMove"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
    >
        <view
            :class="['hy-float-button__container']"
            @tap.stop="handleClick"
            :style="{ backgroundColor: bgColor }"
        >
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <hy-icon
                    :name="icon"
                    :color="iconColor"
                    :size="iconSize ? iconSize : addUnit(getPx(getFloatBtnSize) * 0.7)"
                />
                <text v-if="text" :style="{ color: textColor, fontSize: fontSize }">{{
                    text
                }}</text>
            </template>
        </view>

        <!-- 菜单栏 -->
        <view
            :class="['hy-float-button__menus', `hy-float-button__menus--${shape}`]"
            :style="menusStyle"
        >
            <template v-for="(item, i) in menus" :key="i">
                <view
                    class="hy-float-button__menus--item"
                    :style="{
                        width: getFloatBtnSize,
                        height: getFloatBtnSize,
                        color: textColor
                    }"
                    @click="handleMenuItemClick(item, i)"
                >
                    {{ typeof item === 'string' ? item : item.label }}
                </view>
                <hy-line
                    v-if="i !== menus.length - 1"
                    color="#FFFFFF"
                    :length="addUnit(getPx(getFloatBtnSize) * 0.7)"
                    :direction="direction === 'row' ? 'column' : 'row'"
                    :custom-style="{ margin: 'auto' }"
                ></hy-line>
            </template>
        </view>
        <!-- 菜单栏 -->
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-float-button',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, reactive, watch } from 'vue'
import type { CSSProperties } from 'vue'
import type { IFloatButtonEmits } from './typing'
import type { MenusType } from './typing'
import { addUnit, debounce, getPx, getRect, guid, isH5, throttle } from '../../libs'
import floatButtonProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLine from '../hy-line/hy-line.vue'

/**
 * 悬浮动作按钮组件，按下可显示一组动作按钮。
 * @displayName hy-float-button
 */
defineOptions({})

const props = defineProps(floatButtonProps)
const emit = defineEmits<IFloatButtonEmits>()

const instance = getCurrentInstance()
const btnSize: AnyObject = {
    small: '50px',
    medium: '60px',
    large: '70px'
}
const open = ref(false)
const rotate = computed(() => (open.value && !props.text ? '45deg' : '0deg'))
const soleId = `hy-float-button__${guid()}`
const fabSize = reactive({ width: 0, height: 0 }) // 悬浮按钮大小
const screen = reactive({ width: 0, height: 0 })
const currentCoordinate = reactive({
    top: 0,
    left: 0
})
// 按下时坐标相对于元素的偏移量
const touchOffset = reactive({ x: 0, y: 0 })
const attractTransition = ref<boolean>(false)
const fabDirection = ref<HyApp.LeftRightType>('left')
const fabDirection2 = ref<HyApp.TopBottomType>('top')
const bounding = reactive({
    minLeft: 10,
    minTop: 10,
    maxLeft: 380,
    maxTop: 680
})

onMounted(async () => {
    await getFatRect()
    await getBounding()
    initPosition()
})

watch(
    () => props.position,
    () => initPosition()
)

/**
 * 初始化距离
 * */
const initPosition = () => {
    const { minLeft, minTop, maxLeft, maxTop } = bounding
    const centerY = (maxTop + minTop) / 2
    const centerX = (maxLeft + minLeft) / 2

    switch (props.position) {
        case 'left-top':
            currentCoordinate.top = minTop
            currentCoordinate.left = minLeft
            fabDirection.value = 'left'
            fabDirection2.value = 'top'
            break
        case 'right-top':
            currentCoordinate.top = minTop
            currentCoordinate.left = maxLeft
            fabDirection.value = 'right'
            fabDirection2.value = 'top'
            break
        case 'left-bottom':
            currentCoordinate.top = maxTop
            currentCoordinate.left = minLeft
            fabDirection.value = 'left'
            fabDirection2.value = 'bottom'
            break
        case 'right-bottom':
            currentCoordinate.top = maxTop
            currentCoordinate.left = maxLeft
            fabDirection.value = 'right'
            fabDirection2.value = 'bottom'
            break
        case 'left-center':
            currentCoordinate.top = centerY
            currentCoordinate.left = minLeft
            fabDirection.value = 'left'
            fabDirection2.value = 'bottom'
            break
        case 'right-center':
            currentCoordinate.top = centerY
            currentCoordinate.left = maxLeft
            fabDirection.value = 'right'
            fabDirection2.value = 'bottom'
            break
        case 'top-center':
            currentCoordinate.top = minTop
            currentCoordinate.left = centerX
            fabDirection.value = 'left'
            fabDirection2.value = 'top'
            break
        case 'bottom-center':
            currentCoordinate.top = maxTop
            currentCoordinate.left = centerX
            fabDirection.value = 'left'
            fabDirection2.value = 'bottom'
            break
    }
}

/**
 * 获取组件大小
 * */
const getFloatBtnSize = computed(() => {
    if (typeof props.size === 'string' && Object.keys(btnSize).includes(props.size)) {
        return btnSize[props.size]
    } else {
        return addUnit(props.size)
    }
})

/**
 * 悬浮按钮样式
 * */
const FloatButtonStyle = computed(() => {
    const style: CSSProperties = {
        top: `${currentCoordinate.top}px`,
        left: `${currentCoordinate.left}px`,
        backgroundColor: props.bgColor,
        zIndex: props.zIndex,
        color: props.textColor
    }
    if (props.fixed) style.position = 'fixed'

    style.height = getFloatBtnSize.value
    style.width = getFloatBtnSize.value
    return Object.assign(style, props.customStyle)
})
const menusStyle = computed(() => {
    const style: CSSProperties = {
        backgroundColor: props.bgColor
    }

    // 判断横向展示还是纵向展示
    if (props.direction === 'row') {
        if (fabDirection.value === 'right') {
            style.transform = 'translateX(-100%)'
            style.left = '100%'
            style.paddingRight = getFloatBtnSize.value
            style.flexDirection = 'row-reverse'
        } else {
            style.paddingLeft = getFloatBtnSize.value
        }
        style.bottom = 0
        style.transition = 'width 0.5s ease'
        style.height = getFloatBtnSize.value
        style.width = open.value
            ? addUnit(
                  getPx(getFloatBtnSize.value) * props.menus.length + getPx(getFloatBtnSize.value)
              )
            : 0
    } else {
        if (fabDirection2.value === 'top') {
            style.transform = 'translateX(-100%)'
            style.height = '100%'
            style.left = getFloatBtnSize.value
            style.top = '0px'
            style.paddingTop = getFloatBtnSize.value
        } else {
            style.paddingBottom = getFloatBtnSize.value
            style.bottom = 0
        }
        style.transition = 'height 0.5s ease'
        style.width = getFloatBtnSize.value
        style.height = open.value
            ? addUnit(
                  getPx(getFloatBtnSize.value) * props.menus.length + getPx(getFloatBtnSize.value)
              )
            : 0
    }
    return style
})

/**
 * 获取悬浮按钮大小
 * */
const getFatRect = () => {
    return new Promise((resolve, reject) => {
        getRect(`#${soleId}`, false, instance)
            .then((rect) => {
                const { width, height } = rect as UniApp.NodeInfo
                fabSize.width = width as number
                fabSize.height = height as number
                resolve(rect)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * 点击悬浮按钮
 * */
const handleClick = () => {
    emit('click')
    if (props.expandable) {
        open.value = !open.value
    }
}

/**
 * 点击单条菜单栏
 * */
const handleMenuItemClick = (temp: MenusType, index: number) => {
    emit('clickItem', temp, index)
    open.value = false
    if (typeof temp !== 'string' && temp?.url) {
        uni.navigateTo({
            url: temp.url
        })
    }
}

const getBounding = () => {
    return new Promise((resolve) => {
        const sysInfo = uni.getSystemInfoSync()

        const { top = 16, left = 16, right = 16, bottom = 16 } = props.gap
        screen.width = sysInfo.windowWidth
        screen.height = isH5 ? sysInfo.windowTop + sysInfo.windowHeight : sysInfo.windowHeight
        bounding.minTop = isH5 ? sysInfo.windowTop + top : top
        bounding.minLeft = left
        bounding.maxLeft = screen.width - fabSize.width - right
        bounding.maxTop = screen.height - fabSize.height - bottom
        resolve(bounding)
    })
}

const handleTouchStart = (e: TouchEvent) => {
    if (!props.draggable) return

    const touch = e.touches[0]
    touchOffset.x = touch.clientX - getPx(currentCoordinate.left)
    touchOffset.y = touch.clientY - getPx(currentCoordinate.top)
    attractTransition.value = false
}

function handleTouchMove(e: TouchEvent) {
    if (!props.draggable) return

    const touch = e.touches[0]
    const { minLeft, minTop, maxLeft, maxTop } = bounding
    let x = touch.clientX - touchOffset.x
    let y = touch.clientY - touchOffset.y

    if (x < minLeft) x = minLeft
    else if (x > maxLeft) x = maxLeft

    if (y < minTop) y = minTop
    else if (y > maxTop) y = maxTop

    currentCoordinate.top = y
    currentCoordinate.left = x
}

function handleTouchEnd() {
    if (!props.draggable) return

    const screenCenterX = screen.width / 2
    const fabCenterX = currentCoordinate.left + fabSize.width / 2
    attractTransition.value = true
    if (fabCenterX < screenCenterX) {
        currentCoordinate.left = bounding.minLeft
        fabDirection.value = 'left'
    } else {
        currentCoordinate.left = bounding.maxLeft
        fabDirection.value = 'right'
    }
}
</script>

<style scoped lang="scss">
@import './index.scss';
.hy-float-button {
    &__container {
        rotate: v-bind(rotate);
    }
    &__menus {
        display: flex;
        flex-direction: v-bind(direction);
    }
}
</style>
