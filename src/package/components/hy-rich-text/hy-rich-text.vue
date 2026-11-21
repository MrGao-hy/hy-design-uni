<template>
    <view
        id="_root"
        :class="[(selectable ? '_select ' : '') + '_root', customClass]"
        :style="[containerStyle, customStyle]"
        @tap="_tap"
    >
        <slot v-if="!nodes[0]" />
        <!-- 解析后的节点树直接交给 rich-text 渲染 -->
        <rich-text v-else :nodes="nodes" />
    </view>
</template>

<script lang="ts">
/**
 * hy-rich-text 富文本组件（rich-text 渲染模式）
 * @description 基于 mp-html v2.5.2 解析器（https://github.com/jin-yufeng/mp-html），
 * 解析层复用 parser.js（tagStyle 合并、域名拼接、实体解码等），渲染层直接使用原生
 * rich-text 组件，结构简单、各端表现一致
 * @property {String} containerStyle 容器的样式
 * @property {String} content 用于渲染的 html 字符串
 * @property {String} domain 主域名，用于拼接链接
 * @property {Boolean | String} selectable 是否开启长按复制
 * @property {Boolean} setTitle 是否将 title 标签的内容设置到页面标题
 * @property {Object} tagStyle 标签的默认样式
 * @property {String} customClass 自定义外部类名
 * @property {String | Object} customStyle 定义需要用到的外部样式
 * @event {Function} load dom 结构加载完毕时触发
 * @event {Function} ready 渲染高度稳定后触发（350ms 内高度无变化）
 * @event {Function} tap 容器被点击时触发
 * @event {Function} click 容器被点击时触发
 */
import Parser from './parser'
import parseProps from './props'

/**
 * 组件内部运行时状态
 * 这些状态不放入 data（避免小程序端序列化开销），
 * Parser 解析器会直接读取组件实例上的这些属性
 */
interface HyRichTextRuntimeState {
    /** 图片链接列表（解析过程中由 Parser 填充） */
    imgList: string[]
}

export default {
    name: 'hy-rich-text',
    data() {
        return {
            // 解析后的节点树，结构由 parser.js 生成，直接作为 rich-text 的 nodes
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodes: [] as any[]
        }
    },
    props: parseProps,
    // #ifdef VUE3
    emits: ['load', 'ready', 'tap', 'click'],
    // #endif
    watch: {
        content(content) {
            this.setContent(content)
        }
    },
    mounted() {
        if (this.content && !this.nodes.length) {
            this.setContent(this.content)
        }
    },
    methods: {
        /** 获取组件内部运行时状态 */
        _vm(): HyRichTextRuntimeState {
            return this as unknown as HyRichTextRuntimeState
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
         * @description 设置内容
         * @param {String} content html 内容
         * @param {Boolean} append 是否在尾部追加
         */
        setContent(content: string, append?: boolean) {
            const vm = this._vm()
            if (!append || !vm.imgList) {
                vm.imgList = []
            }
            const nodes = new Parser(this).parse(content)
            this.nodes = append ? (this.nodes || []).concat(nodes) : nodes

            this.$nextTick(() => {
                this.$emit('load')
            })

            // rich-text 无法感知内部图片加载事件，通过轮询高度的方式判断渲染稳定
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
