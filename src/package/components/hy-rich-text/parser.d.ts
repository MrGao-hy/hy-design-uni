/**
 * parser.js 的类型声明
 * 该解析器移植自 mp-html v2.5.2，内部通过原型方法挂载解析逻辑，
 * 此处仅声明组件使用到的外部接口
 */
declare const Parser: new (
    vm: Record<string, any>
) => {
    /** 执行解析，返回节点树 */
    parse: (content: string) => Record<string, any>[]
}

export default Parser
