export default interface HyWaterfallProps {
  /**
   * @description 数据列表
   * */
  modelValue: Array<any>;
  /**
   * @description 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
   * */
  addTime?: number;
  /**
   * @description id值
   * */
  idKey?: string;
}
