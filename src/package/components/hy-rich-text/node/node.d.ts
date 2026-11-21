/**
 * node 渲染组件的类型声明
 * node.vue 为纯 JS 实现（与 parser.js 同模式：js 实现 + d.ts 声明），
 * 此处仅提供模块类型，具体 props 见 node.vue（name/attrs/childs/opts）
 */
declare const node: Record<string, unknown>
export default node
