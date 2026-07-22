/**
 * 文本显示模式
 *
 * 用于 Text 组件根据内容类型进行格式化显示。
 *
 * @values
 * text-普通文本
 * price-金额文本，支持价格格式化
 * phone-手机号文本，支持手机号脱敏
 * name-姓名文本，支持姓名脱敏
 * date-日期文本，支持日期格式化
 * link-链接文本，支持点击跳转
 */
export type TextMode = 'text' | 'price' | 'phone' | 'name' | 'date' | 'link'

/**
 * 文字换行类型
 *
 * 用于控制文本超长时的换行方式。
 *
 * @values
 * normal-正常换行，根据空格和标点进行换行
 * break-word-长单词或连续字符在必要时换行
 * anywhere-任意位置都可以换行
 */
export type TextWrapType = 'normal' | 'break-word' | 'anywhere'

/**
 * 文字装饰类型
 *
 * 用于控制文本的装饰样式。
 *
 * @values
 * none-无装饰
 * underline-下划线
 * line-through-删除线（中划线）
 */
export type TextDecorationType = 'none' | 'underline' | 'line-through'

export interface ITextEmits {
    /** 点击触发 */
    click: [event: any]
}
