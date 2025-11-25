<template>
    <view class="hy-qrcode" @longpress="onLongPress">
        <view class="hy-qrcode__content">
            <!-- #ifndef APP-NVUE -->
            <hy-image :src="result" :width="size" :height="size" @click="preview"></hy-image>
            <canvas
                class="hy-qrcode__content--canvas"
                :id="cid"
                type="2d"
                :style="{ width: addUnit(size), height: addUnit(size) }"
            />
            <!-- #endif -->
            <view
                v-if="showLoading && loading"
                class="hy-qrcode__content--loading"
                :style="{ width: addUnit(size), height: addUnit(size) }"
            >
                <hy-loading :text="loadingText" direction="column" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-qrcode',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { getCurrentInstance, ref, watch, nextTick } from 'vue'
import type { IQrcodeEmits } from './typing'
import QRCode from './qrcode.js'
import { addUnit, error, random } from '../../libs'
// 组件
import HyLoading from '../hy-loading/hy-loading.vue'
import HyImage from '../hy-image/hy-image.vue'

/**
 * 根据提供的字符串前端JS生成二维码展示
 * @displayName hy-qrcode
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
    /** 实例ID字符串(如果有多个二维码组件必须设置不一样的cid) */
    cid: {
        type: String,
        default: 'hy-qrcode-canvas_' + random(1, 1000)
    },
    /** 二维码大小 */
    size: {
        type: Number,
        default: 200
    },
    /** 二维码内容 */
    text: String,
    /** 是否显示二维码 */
    show: {
        type: Boolean,
        default: true
    },
    /** 二维码背景色 */
    background: {
        type: String,
        default: '#ffffff'
    },
    /** 二维码颜色 */
    foreground: {
        type: String,
        default: '#000000'
    },
    /** 定位角点颜色 */
    pdGround: {
        type: String,
        default: '#000000'
    },
    /** 是否是自定义组件 */
    usingComponents: {
        type: Boolean,
        default: true
    },
    /** 容错级别 */
    lv: {
        type: Number,
        default: 3
    },
    /** 二维码中间图标 */
    icon: String,
    /** 二维码中间图标大小 */
    iconSize: {
        type: Number,
        default: 40
    },
    /** 显示加载状态 */
    showLoading: {
        type: Boolean,
        default: true
    },
    /** 加载中提示语 */
    loadingText: {
        type: String,
        default: '二维码生成中...'
    },
    /** 是否预览 */
    allowPreview: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits<IQrcodeEmits>()

const instance = getCurrentInstance()
const loading = ref(true)
const qrcode = ref('')
const result = ref('')

const initQrCode = () => {
    if (props.text) {
        qrcode.value = new QRCode({
            context: instance, // 上下文环境
            canvasId: props.cid, // canvas-id
            usingComponents: props.usingComponents, // 是否是自定义组件
            showLoading: false, // 是否显示loading
            loadingText: props.loadingText, // loading文字
            text: props.text, // 生成内容
            size: props.size, // 二维码大小
            background: props.background, // 背景色
            foreground: props.foreground, // 前景色
            pdground: props.pdGround, // 定位角点颜色
            correctLevel: props.lv, // 容错级别
            image: props.icon, // 二维码图标
            imageSize: props.iconSize, // 二维码图标大小
            cbResult: function (res: any) {
                console.log(res)
                // 生成二维码的回调
                _result(res)
            }
        })
    } else {
        error('二维码内容不能为空')
    }
}

// 判断是否显示二维码
watch(
    () => props.show,
    (newValue) => {
        if (newValue) {
            nextTick(() => initQrCode())
        }
    },
    { immediate: true }
)

const _result = (res: any) => {
    loading.value = false
    result.value = res
    emit('result', res)
}

const _saveCode = () => {
    if (result.value != '') {
        uni.saveImageToPhotosAlbum({
            filePath: result.value,
            success: function () {
                uni.showToast({
                    title: '二维码保存成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    }
}
/**
 * @description 预览
 * */
const preview = (e: Event) => {
    // 预览图片
    // console.log(this.result)
    if (props.allowPreview) {
        uni.previewImage({
            urls: [result.value],
            longPressActions: {
                itemList: ['保存二维码图片'],
                success: function (data) {
                    // console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                    switch (data.tapIndex) {
                        case 0:
                            _saveCode()
                            break
                    }
                },
                fail: function (err) {
                    console.error(err.errMsg)
                }
            }
        })
    }
    emit('preview', result.value, e)
}

const onLongPress = () => {
    emit('longPress')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
