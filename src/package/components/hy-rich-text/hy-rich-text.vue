<template>
    <view
        id="_root"
        :class="[(selectable ? '_select ' : '') + '_root', customClass]"
        :style="[containerStyle, customStyle]"
        @tap="_tap"
    >
        <slot v-if="!nodes[0]" />
        <!-- 解析后的节点树交给 node 递归渲染（支持视频、音频、图片预览、链接跳转等） -->
        <node
            v-else
            :childs="nodes"
            :opts="[lazyLoad, loadingImg, errorImg, showImgMenu, selectable]"
            name="span"
        />
    </view>
</template>

<script lang="ts">
/**
 * hy-rich-text 富文本组件（mp-html 渲染模式）
 * @description 基于 mp-html v2.5.2（https://github.com/jin-yufeng/mp-html），
 * 解析层复用 parser.js（tagStyle 合并、域名拼接、实体解码等），
 * 渲染层由 node 子组件递归渲染，支持视频、音频、图片预览/保存、链接跳转、锚点等
 * @property {String} containerStyle 容器的样式
 * @property {String} content 用于渲染的 html 字符串
 * @property {Boolean} copyLink 是否允许外部链接被点击时自动复制
 * @property {String} domain 主域名，用于拼接链接
 * @property {String} errorImg 图片出错时的占位图链接
 * @property {Boolean} lazyLoad 是否开启图片懒加载
 * @property {String} loadingImg 图片加载过程中的占位图链接
 * @property {Boolean} pauseVideo 是否在播放一个视频时自动暂停其他视频
 * @property {Boolean} previewImg 是否允许图片被点击时自动预览
 * @property {Boolean} scrollTable 是否给每个表格添加一个滚动层使其能单独横向滚动
 * @property {Boolean | String} selectable 是否开启长按复制
 * @property {Boolean} setTitle 是否将 title 标签的内容设置到页面标题
 * @property {Boolean} showImgMenu 是否允许图片被长按时显示菜单
 * @property {Object} tagStyle 标签的默认样式
 * @property {Boolean | Number} useAnchor 是否使用锚点链接
 * @property {String} customClass 自定义外部类名
 * @property {String | Object} customStyle 定义需要用到的外部样式
 * @event {Function} load dom 结构加载完毕时触发
 * @event {Function} ready 渲染高度稳定后触发（图片全部加载完毕或 350ms 内高度无变化）
 * @event {Function} imgTap 图片被点击时触发
 * @event {Function} linkTap 链接被点击时触发
 * @event {Function} play 音视频播放时触发
 * @event {Function} error 媒体加载出错时触发
 * @event {Function} tap 容器被点击时触发
 * @event {Function} click 容器被点击时触发
 */
import node from './node/node'
import Parser from './parser'
import parseProps from './props'

/** 图片链接列表（parser 解析过程中会附加待加载图片计数 _unloadimgs） */
type HyRichTextImgList = string[] & { _unloadimgs?: number }

/** 视频上下文（播放管理） */
interface HyRichTextVideoContext {
    id?: string
    pause: () => void
    playbackRate: (rate: number) => void
}

/** 富文本插件（预留扩展机制，暂无内置插件） */
interface HyRichTextPlugin {
    [hook: string]: (() => void) | undefined
}

const plugins: Array<new (vm: unknown) => HyRichTextPlugin> = []

/**
 * 组件内部运行时状态
 * 这些状态不放入 data（避免小程序端序列化开销），
 * Parser 解析器与 node 渲染层会直接读取组件实例上的这些属性
 */
interface HyRichTextRuntimeState {
    /** 图片链接列表（解析过程中由 Parser 填充） */
    imgList: HyRichTextImgList
    /** 视频上下文列表（播放管理） */
    _videos: HyRichTextVideoContext[]
    /** 播放速率 */
    playbackRate?: number
    /** 锚点跳转范围（scroll-view） */
    _in?: { page: Record<string, unknown>; selector: string; scrollTop: string }
    /** 插件实例列表 */
    plugins?: HyRichTextPlugin[]
}

export default {
    name: 'hy-rich-text',
    components: {
        node
    },
    data() {
        return {
            // 解析后的节点树，结构由 parser.js 生成，交给 node 子组件递归渲染
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodes: [] as any[]
        }
    },
    props: parseProps,
    // #ifdef VUE3
    emits: ['load', 'ready', 'imgTap', 'linkTap', 'play', 'error', 'tap', 'click'],
    // #endif
    watch: {
        content(content: string) {
            this.setContent(content)
        }
    },
    created() {
        const vm = this._vm()
        vm.plugins = []
        for (let i = plugins.length; i--; ) {
            vm.plugins.push(new plugins[i](this))
        }
    },
    mounted() {
        if (this.content && !this.nodes.length) {
            this.setContent(this.content)
        }
    },
    beforeUnmount() {
        this._hook('onDetached')
    },
    methods: {
        /** 获取组件内部运行时状态 */
        _vm(): HyRichTextRuntimeState {
            return this as unknown as HyRichTextRuntimeState
        },

        /**
         * @description 将锚点跳转的范围限定在一个 scroll-view 内
         * @param {Object} page scroll-view 所在页面的实例
         * @param {String} selector scroll-view 的选择器
         * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
         */
        in(page: Record<string, unknown>, selector: string, scrollTop: string) {
            if (page && selector && scrollTop) {
                this._vm()._in = { page, selector, scrollTop }
            }
        },

        /**
         * @description 锚点跳转
         * @param {String} id 要跳转的锚点 id
         * @param {Number} offset 跳转位置的偏移量
         * @return {Promise}
         */
        navigateTo(id: string, offset?: number): Promise<void> {
            return new Promise((resolve, reject) => {
                if (!this.useAnchor) {
                    reject(Error('Anchor is disabled'))
                    return
                }
                offset = offset || parseInt(String(this.useAnchor)) || 0
                // 闭包内无法依赖参数收窄，提取为局部常量
                const finalOffset = offset
                let deep = ' '
                // #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO
                deep = '>>>'
                // #endif
                const vm = this._vm()
                const selector = uni
                    .createSelectorQuery()
                    // #ifndef MP-ALIPAY
                    .in(vm._in ? vm._in.page : this)
                    // #endif
                    .select((vm._in ? vm._in.selector : '._root') + (id ? `${deep}#${id}` : ''))
                    .boundingClientRect()
                if (vm._in) {
                    selector
                        .select(vm._in.selector)
                        .scrollOffset(() => {})
                        .select(vm._in.selector)
                        .boundingClientRect()
                } else {
                    // 获取窗口的滚动距离
                    selector.selectViewport().scrollOffset(() => {})
                }
                selector.exec((res) => {
                    if (!res[0]) {
                        reject(Error('Label not found'))
                        return
                    }
                    const target = res[0] as { top: number }
                    const viewport = res[1] as { scrollTop: number }
                    const scroll = res[2] as { top: number } | undefined
                    const scrollTop =
                        viewport.scrollTop + target.top - (scroll ? scroll.top : 0) + finalOffset
                    if (vm._in) {
                        // scroll-view 跳转
                        vm._in.page[vm._in.scrollTop] = scrollTop
                    } else {
                        // 页面跳转
                        uni.pageScrollTo({
                            scrollTop,
                            duration: 300
                        })
                    }
                    resolve()
                })
            })
        },

        /**
         * @description 获取文本内容
         * @return {String}
         */
        getText(nodes?: Array<Record<string, unknown>>) {
            let text = ''
            ;(function traversal(nodes: Array<Record<string, unknown>>) {
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i] as {
                        type?: string
                        name?: string
                        text?: string
                        children?: Array<Record<string, unknown>>
                    }
                    if (node.type === 'text') {
                        text += (node.text || '').replace(/&amp;/g, '&')
                    } else if (node.name === 'br') {
                        text += '\n'
                    } else {
                        // 块级标签前后加换行
                        const isBlock =
                            node.name === 'p' ||
                            node.name === 'div' ||
                            node.name === 'tr' ||
                            node.name === 'li' ||
                            ((node.name?.[0] === 'h' &&
                                (node.name?.[1] || '0') > '0' &&
                                (node.name?.[1] || '0') < '7') as boolean)
                        if (isBlock && text && text[text.length - 1] !== '\n') {
                            text += '\n'
                        }
                        // 递归获取子节点的文本
                        if (node.children) {
                            traversal(node.children)
                        }
                        if (isBlock && text[text.length - 1] !== '\n') {
                            text += '\n'
                        } else if (node.name === 'td' || node.name === 'th') {
                            text += '\t'
                        }
                    }
                }
            })(nodes || (this as { nodes: Array<Record<string, unknown>> }).nodes)
            return text
        },

        /**
         * @description 获取内容大小和位置
         * @return {Promise}
         */
        getRect() {
            return new Promise<UniApp.NodeInfo>((resolve, reject) => {
                uni.createSelectorQuery()
                    // #ifndef MP-ALIPAY
                    .in(this)
                    // #endif
                    .select('#_root')
                    .boundingClientRect()
                    .exec((res) =>
                        res[0] ? resolve(res[0]) : reject(Error('Root label not found'))
                    )
            })
        },

        /**
         * @description 暂停播放媒体
         */
        pauseMedia() {
            const vm = this._vm()
            for (let i = (vm._videos || []).length; i--; ) {
                vm._videos[i].pause()
            }
            // #ifdef APP-PLUS
            const command =
                'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].pause()'
            let page = this.$parent as unknown as {
                $parent?: unknown
                $scope?: { $getAppWebview: () => { evalJS: (cmd: string) => void } }
            }
            while (page && !page.$scope) {
                page = page.$parent as typeof page
            }
            page?.$scope?.$getAppWebview().evalJS(command)
            // #endif
        },

        /**
         * @description 设置媒体播放速率
         * @param {Number} rate 播放速率
         */
        setPlaybackRate(rate: number) {
            const vm = this._vm()
            vm.playbackRate = rate
            for (let i = (vm._videos || []).length; i--; ) {
                vm._videos[i].playbackRate(rate)
            }
            // #ifdef APP-PLUS
            const command =
                'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].playbackRate=' +
                rate
            let page = this.$parent as unknown as {
                $parent?: unknown
                $scope?: { $getAppWebview: () => { evalJS: (cmd: string) => void } }
            }
            while (page && !page.$scope) {
                page = page.$parent as typeof page
            }
            page?.$scope?.$getAppWebview().evalJS(command)
            // #endif
        },

        /**
         * @description 设置内容
         * @param {String} content html 内容
         * @param {Boolean} append 是否在尾部追加
         */
        setContent(content: string, append?: boolean) {
            const vm = this._vm()
            if (!append || !vm.imgList) {
                vm.imgList = [] as HyRichTextImgList
            }
            const nodes = new Parser(this).parse(content)
            this.nodes = append ? (this.nodes || []).concat(nodes) : nodes

            vm._videos = []
            this.$nextTick(() => {
                this._hook('onLoad')
                this.$emit('load')
            })

            if (this.lazyLoad || (vm.imgList._unloadimgs || 0) < vm.imgList.length / 2) {
                // 设置懒加载，每 350ms 获取高度，不变则认为加载完毕
                let height = 0
                const callback = (rect?: { height?: number }) => {
                    if (!rect || !rect.height) rect = {}
                    // 350ms 总高度无变化就触发 ready 事件
                    if (rect.height === height) {
                        this.$emit('ready', rect)
                    } else {
                        height = rect.height || 0
                        setTimeout(() => {
                            this.getRect().then(callback).catch(callback)
                        }, 350)
                    }
                }
                this.getRect().then(callback).catch(callback)
            } else if (!vm.imgList._unloadimgs) {
                // 无待加载图片，直接触发 ready（有图片时由 node 渲染层计数归零后触发）
                this.getRect()
                    .then((rect) => {
                        this.$emit('ready', rect)
                    })
                    .catch(() => {
                        this.$emit('ready', {})
                    })
            }
        },

        /**
         * @description 调用插件钩子函数
         */
        _hook(name: string) {
            const instances = this._vm().plugins || []
            for (let i = instances.length; i--; ) {
                instances[i]?.[name]?.()
            }
        },

        /**
         * @description 容器点击事件
         */
        _tap() {
            this.$emit('tap')
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
