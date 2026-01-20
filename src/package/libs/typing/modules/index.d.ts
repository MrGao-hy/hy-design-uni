declare namespace HyUtils {
    type Primitive = string | number | boolean | null | undefined | symbol | bigint
    /**
     * 深度合并参数
     * */
    type DeepMergeable = Record<string, any>

    /**
     * 节点返回数据类型
     * */
    type RectResultType<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo
}
