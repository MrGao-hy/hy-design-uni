<template>
    <view :class="rootClass" :style="rootStyle">
        <canvas
            v-if="!canvasOffScreenable && showCanvas"
            type="2d"
            :style="{
                height: canvasHeight + 'px',
                width: canvasWidth + 'px',
                visibility: 'hidden'
            }"
            :canvas-id="canvasId"
            :id="canvasId"
        />
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-watermark',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, nextTick, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, guid } from '../../libs'
import watermarkProps from './props'

/**
 * 在页面或组件上添加指定的图片或文字，可用于版权保护、品牌宣传等场景。
 * @displayName hy-watermark
 */
defineOptions({})

const props = defineProps(watermarkProps)

// watch(
//     () => props,
//     () => {
//         doReset()
//     },
//     { deep: true }
// )

const observer = ref<MutationObserver | null>(null)
const WATERMARK_SELECTOR = '.hy-watermark'
const canvasId = ref<string>(`watermark--${guid()}`) // canvas 组件的唯一标识符
const waterMarkUrl = ref<string>('') // canvas生成base64水印
const canvasOffScreenable = ref<boolean>(
    uni.canIUse('createOffscreenCanvas') && Boolean(uni.createOffscreenCanvas)
) // 是否可以使用离屏canvas
const pixelRatio = ref<number>(uni.getSystemInfoSync().pixelRatio) // 像素比
const canvasHeight = ref<number>((props.height + props.gutterY) * pixelRatio.value) // canvas画布高度
const canvasWidth = ref<number>((props.width + props.gutterX) * pixelRatio.value) // canvas画布宽度
const showCanvas = ref<boolean>(true) // 是否展示canvas

/**
 * 水印css类
 */
const rootClass = computed(() => {
    const classes: string[] = ['hy-watermark']
    if (props.fullScreen) {
        classes.push('is-fullscreen')
    }
    return classes
})

/**
 * 水印样式
 */
const rootStyle = computed(() => {
    const style: CSSProperties = {
        // width、height、display, left, top, visibility, transform, margin为了防止在控制台通过修改这些属性导致水印被隐藏
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        visibility: 'visible',
        opacity: props.opacity,
        zIndex: props.zIndex,
        backgroundRepeat: 'repeat',
        backgroundPosition: '0px 0px',
        backgroundSize: addUnit(props.width + props.gutterX)
    }
    if (waterMarkUrl.value) {
        style['backgroundImage'] = `url('${waterMarkUrl.value}')`
    }
    return style
})

function doReset() {
    showCanvas.value = true
    canvasHeight.value = (props.height + props.gutterY) * pixelRatio.value
    canvasWidth.value = (props.width + props.gutterX) * pixelRatio.value
    nextTick(() => {
        doInit()
    })
}

function doInit() {
    // #ifdef H5
    // h5使用document.createElement创建canvas，不用展示canvas标签
    showCanvas.value = false
    // #endif
    const {
        width,
        height,
        color,
        size,
        fontStyle,
        fontWeight,
        fontFamily,
        content,
        rotate,
        gutterX,
        gutterY,
        image,
        imageHeight,
        imageWidth,
        title
    } = props

    // 创建水印
    createWaterMark(
        width,
        height,
        color,
        size,
        fontStyle,
        fontWeight,
        fontFamily,
        content,
        rotate,
        gutterX,
        gutterY,
        image,
        imageHeight,
        imageWidth,
        title
    )
}

/**
 * 创建水印图片
 * @param width canvas宽度
 * @param height canvas高度
 * @param color canvas字体颜色
 * @param size canvas字体大小
 * @param fontStyle canvas字体样式
 * @param fontWeight canvas字体字重
 * @param fontFamily canvas字体系列
 * @param content canvas内容
 * @param rotate 倾斜角度
 * @param gutterX X轴间距
 * @param gutterY Y轴间距
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 * @param title 标题
 */
function createWaterMark(
    width: number,
    height: number,
    color: string,
    size: number,
    fontStyle: string,
    fontWeight: number | string,
    fontFamily: string,
    content: string,
    rotate: number,
    gutterX: number,
    gutterY: number,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string
) {
    const canvasHeight = (height + gutterY) * pixelRatio.value
    const canvasWidth = (width + gutterX) * pixelRatio.value
    const contentWidth = width * pixelRatio.value
    const contentHeight = height * pixelRatio.value
    const fontSize = size * pixelRatio.value
    // 标题字体大小：如果设置了titleSize则使用titleSize，否则使用size的1.2倍
    const titleFontSize = props.titleSize > 0 ? props.titleSize * pixelRatio.value : fontSize * 1.2

    // #ifndef H5
    if (canvasOffScreenable.value) {
        createOffscreenCanvas(
            canvasHeight,
            canvasWidth,
            contentWidth,
            contentHeight,
            rotate,
            fontSize,
            fontFamily,
            fontStyle,
            fontWeight,
            color,
            content,
            image,
            imageHeight,
            imageWidth,
            title,
            titleFontSize
        )
    } else {
        createCanvas(
            canvasHeight,
            contentWidth,
            rotate,
            fontSize,
            color,
            content,
            image,
            imageHeight,
            imageWidth,
            title,
            titleFontSize
        )
    }
    // #endif
    // #ifdef H5
    createH5Canvas(
        canvasHeight,
        canvasWidth,
        contentWidth,
        contentHeight,
        rotate,
        fontSize,
        fontFamily,
        fontStyle,
        fontWeight,
        color,
        content,
        image,
        imageHeight,
        imageWidth,
        title,
        titleFontSize
    )
    // #endif
}

/**
 * 创建离屏canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 内容宽度
 * @param contentHeight 内容高度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param fontFamily 字体系列
 * @param fontStyle 字体样式
 * @param fontWeight 字体字重
 * @param color 字体颜色
 * @param content 内容
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 * @param title 标题文本
 * @param titleFontSize 标题字体大小
 */
function createOffscreenCanvas(
    canvasHeight: number,
    canvasWidth: number,
    contentWidth: number,
    contentHeight: number,
    rotate: number,
    fontSize: number,
    fontFamily: string,
    fontStyle: string,
    fontWeight: string | number,
    color: string,
    content: string,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string,
    titleFontSize: number
) {
    // 创建离屏canvas
    const canvas: any = uni.createOffscreenCanvas({
        height: canvasHeight,
        width: canvasWidth,
        type: '2d'
    })
    const ctx: any = canvas.getContext('2d')
    if (ctx) {
        if (image && (title || content)) {
            // 图片和文字同时显示
            const img = canvas.createImage() as HTMLImageElement
            drawImageAndTextOffScreen(
                ctx,
                img,
                image,
                imageHeight,
                imageWidth,
                title,
                content,
                rotate,
                contentWidth,
                contentHeight,
                fontSize,
                titleFontSize,
                fontFamily,
                fontStyle,
                fontWeight,
                color,
                canvas
            )
        } else if (image) {
            const img = canvas.createImage() as HTMLImageElement
            drawImageOffScreen(
                ctx,
                img,
                image,
                imageHeight,
                imageWidth,
                rotate,
                contentWidth,
                contentHeight,
                canvas
            )
        } else {
            drawTextOffScreen(
                ctx,
                title,
                contentWidth,
                contentHeight,
                rotate,
                fontSize,
                fontFamily,
                fontStyle,
                fontWeight,
                color,
                canvas,
                content,
                titleFontSize
            )
        }
    } else {
        console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
    }
}

/**
 * 非H5创建canvas
 * 不支持创建离屏canvas时调用
 * @param contentHeight 内容高度
 * @param contentWidth 内容宽度
 * @param rotate 内容倾斜角度
 * @param fontSize 字体大小
 * @param color 字体颜色
 * @param content 内容
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 * @param title 标题文本
 * @param titleFontSize 标题字体大小
 */
function createCanvas(
    contentHeight: number,
    contentWidth: number,
    rotate: number,
    fontSize: number,
    color: string,
    content: string,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string,
    titleFontSize: number
) {
    const ctx = uni.createCanvasContext(canvasId.value)
    if (ctx) {
        if (image && (title || content)) {
            // 图片和文字同时显示
            drawImageAndTextOnScreen(
                ctx,
                image,
                imageHeight,
                imageWidth,
                title,
                content,
                rotate,
                contentWidth,
                contentHeight,
                fontSize,
                titleFontSize,
                color
            )
        } else if (image) {
            drawImageOnScreen(
                ctx,
                image,
                imageHeight,
                imageWidth,
                rotate,
                contentWidth,
                contentHeight
            )
        } else {
            drawTextOnScreen(
                ctx,
                title,
                contentWidth,
                rotate,
                fontSize,
                color,
                content,
                titleFontSize
            )
        }
    } else {
        console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
    }
}

/**
 * h5创建canvas
 * @param canvasHeight canvas高度
 * @param canvasWidth canvas宽度
 * @param contentWidth 水印内容宽度
 * @param contentHeight 水印内容高度
 * @param rotate 水印内容倾斜角度
 * @param fontSize 水印字体大小
 * @param fontFamily 水印字体系列
 * @param fontStyle 水印字体样式
 * @param fontWeight 水印字体字重
 * @param color 水印字体颜色
 * @param content 水印内容
 * @param image canvas图片
 * @param imageHeight canvas图片高度
 * @param imageWidth canvas图片宽度
 * @param title 标题文本
 * @param titleFontSize 标题字体大小
 */
function createH5Canvas(
    canvasHeight: number,
    canvasWidth: number,
    contentWidth: number,
    contentHeight: number,
    rotate: number,
    fontSize: number,
    fontFamily: string,
    fontStyle: string,
    fontWeight: string | number,
    color: string,
    content: string,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string,
    titleFontSize: number
) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.setAttribute('width', `${canvasWidth}px`)
    canvas.setAttribute('height', `${canvasHeight}px`)
    if (ctx) {
        if (image && (title || content)) {
            // 图片和文字同时显示
            const img = new Image()
            drawImageAndTextOffScreen(
                ctx,
                img,
                image,
                imageHeight,
                imageWidth,
                title,
                content,
                rotate,
                contentWidth,
                contentHeight,
                fontSize,
                titleFontSize,
                fontFamily,
                fontStyle,
                fontWeight,
                color,
                canvas
            )
        } else if (image) {
            const img = new Image()
            drawImageOffScreen(
                ctx,
                img,
                image,
                imageHeight,
                imageWidth,
                rotate,
                contentWidth,
                contentHeight,
                canvas
            )
        } else {
            drawTextOffScreen(
                ctx,
                title,
                contentWidth,
                contentHeight,
                rotate,
                fontSize,
                fontFamily,
                fontStyle,
                fontWeight,
                color,
                canvas,
                content,
                titleFontSize
            )
        }
    } else {
        console.error('无法获取canvas上下文，请确认当前环境是否支持canvas')
    }
}

/**
 * 测量文本宽度并自动换行
 * @param ctx canvas上下文
 * @param text 文本
 * @param maxWidth 最大宽度
 * @param fontSize 文字大小
 */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number) {
    const words = text.split('')
    const lines: string[] = []
    let currentLine = ''

    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i]
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        // 当文字宽度超过容器宽度的80%时换行
        if (testWidth > maxWidth * 0.8 && currentLine !== '') {
            lines.push(currentLine)
            currentLine = words[i]
        } else {
            currentLine = testLine
        }
    }
    lines.push(currentLine)
    return lines
}

function drawTextOffScreen(
    ctx: CanvasRenderingContext2D,
    title: string,
    contentWidth: number,
    contentHeight: number,
    rotate: number,
    fontSize: number,
    fontFamily: string,
    fontStyle: string,
    fontWeight: string | number,
    color: string,
    canvas: HTMLCanvasElement,
    content: string = '',
    titleFontSize: number = 0
) {
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.translate(contentWidth / 2, contentHeight / 2)
    ctx.rotate((Math.PI / 180) * rotate)

    // 计算总高度
    let totalTextHeight = titleFontSize
    if (content) {
        totalTextHeight += fontSize + 5 // 标题和副标题之间的间距
    }

    // 起始Y坐标
    let startY = -totalTextHeight / 2

    // 绘制主标题（支持自动换行）
    if (title) {
        ctx.font = `${fontStyle} normal ${fontWeight} ${titleFontSize}px/${contentHeight}px ${fontFamily}`
        // 使用titleColor或默认color
        ctx.fillStyle = props.titleColor || color
        const titleLines = wrapText(ctx, title, contentWidth, titleFontSize)
        const titleLineHeight = titleFontSize * 1.2

        for (let i = 0; i < titleLines.length; i++) {
            ctx.fillText(titleLines[i], 0, startY + i * titleLineHeight)
        }

        startY += titleLines.length * titleLineHeight + 5
    }

    // 绘制副标题（支持自动换行）
    if (content) {
        ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
        ctx.fillStyle = color
        const contentLines = wrapText(ctx, content, contentWidth, fontSize)
        const contentLineHeight = fontSize * 1.2

        for (let i = 0; i < contentLines.length; i++) {
            ctx.fillText(contentLines[i], 0, startY + i * contentLineHeight)
        }
    }

    ctx.restore()
    waterMarkUrl.value = canvas.toDataURL()
}

// 简化版本的文字换行（UniApp CanvasContext不支持measureText）
function simpleWrapText(text: string, maxLength: number) {
    const lines: string[] = []
    let currentLine = ''

    // 基于字符数估算换行（适用于UniApp CanvasContext）
    for (let i = 0; i < text.length; i++) {
        currentLine += text[i]
        if (currentLine.length >= maxLength) {
            lines.push(currentLine)
            currentLine = ''
        }
    }
    if (currentLine) {
        lines.push(currentLine)
    }
    return lines
}

/**
 * 绘制在屏文字canvas
 * @param ctx canvas上下文
 * @param title 标题
 * @param content 水印内容
 * @param contentWidth 水印宽度
 * @param rotate 水印内容倾斜角度
 * @param fontSize 水印字体大小
 * @param color 水印字体颜色
 * @param titleFontSize 标题字体大小
 */
function drawTextOnScreen(
    ctx: UniApp.CanvasContext,
    title: string,
    contentWidth: number,
    rotate: number,
    fontSize: number,
    color: string,
    content: string = '',
    titleFontSize: number = 0
) {
    ctx.setTextBaseline('middle')
    ctx.setTextAlign('center')
    ctx.translate(contentWidth / 2, contentWidth / 2)
    ctx.rotate((Math.PI / 180) * rotate)

    // 估算每行最大字符数
    const maxChars = Math.floor(contentWidth / (fontSize * 0.5))

    // 计算总高度
    let totalTextHeight = titleFontSize
    if (content) {
        totalTextHeight += fontSize + 5
    }

    // 起始Y坐标
    let startY = -totalTextHeight / 2

    // 绘制主标题（支持自动换行）
    if (title) {
        // 使用titleColor或默认color
        ctx.setFillStyle(props.titleColor || color)
        ctx.setFontSize(titleFontSize)
        const titleLines = simpleWrapText(title, maxChars)
        const titleLineHeight = titleFontSize * 1.2

        for (let i = 0; i < titleLines.length; i++) {
            ctx.fillText(titleLines[i], 0, startY + i * titleLineHeight)
        }

        startY += titleLines.length * titleLineHeight + 5
    }

    // 绘制副标题（支持自动换行）
    if (content) {
        ctx.setFillStyle(color)
        ctx.setFontSize(fontSize)
        const contentLines = simpleWrapText(content, maxChars)
        const contentLineHeight = fontSize * 1.2

        for (let i = 0; i < contentLines.length; i++) {
            ctx.fillText(contentLines[i], 0, startY + i * contentLineHeight)
        }
    }

    ctx.restore()
    ctx.draw()
    // #ifdef MP-DINGTALK
    // 钉钉小程序的canvasToTempFilePath接口与其他平台不一样
    ;(ctx as any).toTempFilePath({
        success(res: any) {
            showCanvas.value = false
            waterMarkUrl.value = res.filePath
        }
    })
    // #endif
    // #ifndef MP-DINGTALK
    uni.canvasToTempFilePath({
        canvasId: canvasId.value,
        success: (res) => {
            showCanvas.value = false
            waterMarkUrl.value = res.tempFilePath
        }
    })
    // #endif
}

/**
 * 绘制离屏图片canvas
 * @param ctx canvas上下文
 * @param img 水印图片对象
 * @param image 水印图片地址
 * @param imageHeight 水印图片高度
 * @param imageWidth 水印图片宽度
 * @param rotate 水印内容倾斜角度
 * @param contentWidth 水印宽度
 * @param contentHeight 水印高度
 * @param canvas canvas实例
 */
async function drawImageOffScreen(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    image: string,
    imageHeight: number,
    imageWidth: number,
    rotate: number,
    contentWidth: number,
    contentHeight: number,
    canvas: HTMLCanvasElement
) {
    ctx.translate(contentWidth / 2, contentHeight / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'

    img.src = image
    img.onload = () => {
        ctx.drawImage(
            img,
            (-imageWidth * pixelRatio.value) / 2,
            (-imageHeight * pixelRatio.value) / 2,
            imageWidth * pixelRatio.value,
            imageHeight * pixelRatio.value
        )
        ctx.restore()
        waterMarkUrl.value = canvas.toDataURL()
    }
}

// 绘制图片和文字（离屏）
async function drawImageAndTextOffScreen(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string,
    content: string,
    rotate: number,
    contentWidth: number,
    contentHeight: number,
    fontSize: number,
    titleFontSize: number,
    fontFamily: string,
    fontStyle: string,
    fontWeight: string | number,
    color: string,
    canvas: HTMLCanvasElement
) {
    ctx.translate(contentWidth / 2, contentHeight / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'

    const imgHeight = imageHeight * pixelRatio.value
    const imgWidth = imageWidth * pixelRatio.value

    img.src = image
    img.onload = () => {
        // 计算总高度
        let totalHeight = imgHeight
        const textSpacing = 10

        if (title) totalHeight += textSpacing + titleFontSize
        if (content) totalHeight += fontSize

        // 起始Y坐标
        let startY = -totalHeight / 2

        // 绘制图片
        ctx.drawImage(img, -imgWidth / 2, startY, imgWidth, imgHeight)

        startY += imgHeight + textSpacing

        // 设置文字样式
        ctx.textBaseline = 'top'
        ctx.textAlign = 'center'

        // 绘制主标题
        if (title) {
            ctx.font = `${fontStyle} normal ${fontWeight} ${titleFontSize}px/${contentHeight}px ${fontFamily}`
            // 使用titleColor或默认color
            ctx.fillStyle = props.titleColor || color
            const titleLines = wrapText(ctx, title, contentWidth * 0.9, titleFontSize)
            const titleLineHeight = titleFontSize * 1.2

            for (let i = 0; i < titleLines.length; i++) {
                ctx.fillText(titleLines[i], 0, startY + i * titleLineHeight)
            }

            startY += titleLines.length * titleLineHeight + 5
        }

        // 绘制副标题
        if (content) {
            ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${contentHeight}px ${fontFamily}`
            ctx.fillStyle = color
            const contentLines = wrapText(ctx, content, contentWidth * 0.9, fontSize)
            const contentLineHeight = fontSize * 1.2

            for (let i = 0; i < contentLines.length; i++) {
                ctx.fillText(contentLines[i], 0, startY + i * contentLineHeight)
            }
        }

        ctx.restore()
        waterMarkUrl.value = canvas.toDataURL()
    }
}

// 绘制图片和文字（在屏）
function drawImageAndTextOnScreen(
    ctx: UniApp.CanvasContext,
    image: string,
    imageHeight: number,
    imageWidth: number,
    title: string,
    content: string,
    rotate: number,
    contentWidth: number,
    contentHeight: number,
    fontSize: number,
    titleFontSize: number,
    color: string
) {
    ctx.setTextBaseline('top')
    ctx.setTextAlign('center')
    ctx.translate(contentWidth / 2, contentWidth / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))

    const imgHeight = imageHeight * pixelRatio.value
    const imgWidth = imageWidth * pixelRatio.value
    const maxChars = Math.floor(contentWidth / (fontSize * 0.5))

    // 计算总高度
    let totalHeight = imgHeight
    const textSpacing = 10

    if (title) totalHeight += textSpacing + titleFontSize
    if (content) totalHeight += fontSize

    // 起始Y坐标
    let startY = -totalHeight / 2

    // 绘制图片
    ctx.drawImage(image, -imgWidth / 2, startY, imgWidth, imgHeight)

    startY += imgHeight + textSpacing

    // 绘制主标题
    if (title) {
        // 使用titleColor或默认color
        ctx.setFillStyle(props.titleColor || color)
        ctx.setFontSize(titleFontSize)
        const titleLines = simpleWrapText(title, maxChars)
        const titleLineHeight = titleFontSize * 1.2

        for (let i = 0; i < titleLines.length; i++) {
            ctx.fillText(titleLines[i], 0, startY + i * titleLineHeight)
        }

        startY += titleLines.length * titleLineHeight + 5
    }

    // 绘制副标题
    if (content) {
        ctx.setFillStyle(color)
        ctx.setFontSize(fontSize)
        const contentLines = simpleWrapText(content, maxChars)
        const contentLineHeight = fontSize * 1.2

        for (let i = 0; i < contentLines.length; i++) {
            ctx.fillText(contentLines[i], 0, startY + i * contentLineHeight)
        }
    }

    ctx.restore()
    ctx.draw(false, () => {
        // #ifdef MP-DINGTALK
        // 钉钉小程序的canvasToTempFilePath接口与其他平台不一样
        ;(ctx as any).toTempFilePath({
            success(res: any) {
                showCanvas.value = false
                waterMarkUrl.value = res.filePath
            }
        })
        // #endif
        // #ifndef MP-DINGTALK
        uni.canvasToTempFilePath({
            canvasId: canvasId.value,
            success: (res) => {
                showCanvas.value = false
                waterMarkUrl.value = res.tempFilePath
            }
        })
        // #endif
    })
}

/**
 * 绘制在屏图片canvas
 * @param ctx canvas上下文
 * @param image 水印图片地址
 * @param imageHeight 水印图片高度
 * @param imageWidth 水印图片宽度
 * @param rotate 水印内容倾斜角度
 * @param contentWidth 水印宽度
 * @param contentHeight 水印高度
 */
function drawImageOnScreen(
    ctx: UniApp.CanvasContext,
    image: string,
    imageHeight: number,
    imageWidth: number,
    rotate: number,
    contentWidth: number,
    contentHeight: number
) {
    ctx.translate(contentWidth / 2, contentHeight / 2)
    ctx.rotate((Math.PI / 180) * Number(rotate))

    ctx.drawImage(
        image,
        (-imageWidth * pixelRatio.value) / 2,
        (-imageHeight * pixelRatio.value) / 2,
        imageWidth * pixelRatio.value,
        imageHeight * pixelRatio.value
    )
    ctx.restore()
    ctx.draw(false, () => {
        // #ifdef MP-DINGTALK
        // 钉钉小程序的canvasToTempFilePath接口与其他平台不一样
        ;(ctx as any).toTempFilePath({
            success(res: any) {
                showCanvas.value = false
                waterMarkUrl.value = res.filePath
            }
        })
        // #endif
        // #ifndef MP-DINGTALK
        uni.canvasToTempFilePath({
            canvasId: canvasId.value,
            success: (res) => {
                showCanvas.value = false
                waterMarkUrl.value = res.tempFilePath
            }
        })
        // #endif
    })
}
/**
 * 启动监听
 * */
function startObserve() {
    // #ifdef H5
    const target = document.querySelector(WATERMARK_SELECTOR) as HTMLElement
    if (!target || observer.value) return

    // 观察目标节点的属性变化、子节点变化、以及自身被删除
    observer.value = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            let el = document.querySelector('.hy-watermark') as HTMLElement
            if (mutation.type === 'attributes' || mutation.removedNodes.length > 0) {
                // 检查节点是否被删除
                if (!el) {
                    // 手动创建一个新的 div
                    el = document.createElement('div') as HTMLElement
                    parent.appendChild(target)
                }
                el.className = rootClass.value.join(' ') // 加上你需要的初始类名
                el.style.cssText = Object.entries(rootStyle.value)
                    .map(([key, val]) => {
                        // 将 camelCase 转为 kebab-case (例如: backgroundImage -> background-image)
                        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                        return `${cssKey}: ${val};` // 强制加上 !important 增加删除难度
                    })
                    .join(' ')
                console.warn('检测到安全策略违规，正在恢复水印...')

                // 停止旧监听，防止死循环
                stopObserve()
                nextTick(() => startObserve())
            }
        })
    })

    // 监听父级节点，防止整个 .hy-watermark 被删除
    const parent = target.parentElement || document.body
    observer.value.observe(parent, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'] // 仅监听样式和类名改动
    })
    // #endif
}

/**
 * 停止监听
 * */
function stopObserve() {
    if (observer.value) {
        observer.value.disconnect()
        observer.value = null
    }
}

onMounted(() => {
    doInit()
    // 初始化完成后开启监听
    // #ifdef H5
    props.isAntiTheft && nextTick(() => startObserve())
    // #endif
})

// 组件销毁前必须断开监听，否则会导致内存泄漏
onUnmounted(() => {
    // #ifdef H5
    stopObserve()
    // #endif
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
