import type { FormColumnsType } from "../../libs";
import type HyInputProps from "../hy-input/typing";
import type HyTextareaProps from "../hy-textarea/typing";
import type HySwitchProps from "../hy-switch/typing";
import type HyPickerProps from "../hy-picker/typing";
import type HyRadioProps from "../hy-radio/typing";
import type HyCheckButtonProps from "../hy-check-button/typing";

export default interface HyFormProps {
  /**
   * @description 表单域提示文字的位置
   * left - 左侧
   * top - 上方
   * */
  labelPosition?: "left" | "top";
  /**
   * @description label宽度
   * 数字 - 固定值
   * auto - 自适应
   * */
  labelWidth?: string | number;
  /**
   * @description 是否右对齐
   * */
  right?: boolean;
  /**
   * @description label字体的对齐方式
   * left - 左对齐
   * center - 中间对齐
   * right - 右对齐
   * */
  labelAlign?: HyApp.RowCenterType;
  /**
   * @description 显示冒号符号
   * */
  symbol?: boolean;
  /**
   * @description 显示底部下划线
   * */
  borderBottom?: boolean;
  /**
   * @description 当行内容高度
   * */
  itemHeight?: number | string;
  /**
   * @description 输入框属性api集合
   * */
  input?: Partial<HyInputProps>;
  /**
   * @description 文本域属性api集合
   * */
  textarea?: Partial<HyTextareaProps>;
  /**
   * @description 选择器属性api集合
   * */
  picker?: Partial<HyPickerProps>;
  /**
   * @description 开关属性api集合
   * */
  switchItem?: Partial<HySwitchProps>;
  /**
   * @description 单选属性api集合
   * */
  radio?: Partial<HyRadioProps>;
  /**
   * @description 选择按钮属性api集合
   * */
  checkButton?: Partial<HyCheckButtonProps>;
  /**
   * @description 表单配置
   * */
  columns: FormColumnsType[];
  /**
   * @description 表单值
   * */
  formData: Record<string, any>;
}
