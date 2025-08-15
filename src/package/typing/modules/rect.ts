export interface Rect {
  id: string; // 节点的 ID
  dataset: Record<string, any>; // 节点的 dataset 属性
  left: number; // 节点的左边界坐标
  right: number; // 节点的右边界坐标
  top: number; // 节点的上边界坐标
  bottom: number; // 节点的下边界坐标
  width: number; // 节点的宽度
  height: number; // 节点的高度
}
