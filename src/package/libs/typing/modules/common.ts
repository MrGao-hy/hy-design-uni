/**
 * 公共类型声明
 *
 * 类型统一导出，用于组件 Props 类型约束。
 *
 * 使用方式：
 * import type { ThemeType, LayoutType } from '@/package/libs/typing'
 */

// ---------------------------------------------------------------
// 主题 / 外观
// ---------------------------------------------------------------

/**
 * 主题颜色类型
 *
 * @values
 * primary-默认主题色
 * success-成功状态色
 * warning-警告状态色
 * error-错误状态色
 * info-信息提示色
 */
export type ThemeType = 'primary' | 'success' | 'warning' | 'error' | 'info'

/**
 * 主题亮度类型
 *
 * @values
 * light-亮色主题
 * dark-暗色主题
 */
export type ThemeModeType = 'light' | 'dark'

/**
 * 组件尺寸类型
 *
 * @values
 * small-小尺寸
 * medium-中等尺寸
 * large-大尺寸
 */
export type SizeType = 'small' | 'medium' | 'large' | 'mini'

/**
 * 组件形状类型
 *
 * @values
 * circle-圆形
 * square-方形
 */
export type ShapeType = 'circle' | 'square'

/**
 * 徽标形状类型
 *
 * @values
 * circle-圆形徽标
 * horn-缺角徽标
 */
export type BadgeShapeType = 'circle' | 'horn'

/**
 * 组件形状类型
 *
 * @values
 * circle-圆形
 * square-方形
 * opposite-对角
 */
export type TagShapeType = ShapeType | 'opposite'

/**
 * 徽标数字超出最大值后的显示方式
 *
 * @values
 * overflow-显示溢出标识，例如 99+
 * ellipsis-显示省略号，例如 99...
 * limit-显示最大限制值
 */
export type BadgeNumberType = 'overflow' | 'ellipsis' | 'limit'

/**
 * 边框类型
 *
 * @values
 * surround-四周显示边框
 * bottom-仅底部显示边框
 * none-无边框
 */
export type BorderType = 'surround' | 'bottom' | 'none'

// ---------------------------------------------------------------
// 布局 / 排列
// ---------------------------------------------------------------

/**
 * Flex排列方向
 *
 * @values
 * row-横向排列
 * column-纵向排列
 */
export type DirectionType = 'row' | 'column'

/**
 * 主轴对齐方式
 *
 * @values
 * flex-start-起始端对齐
 * flex-end-末尾端对齐
 * space-between-两端贴边且间距均分
 * space-around-两侧保留相等间距
 * space-evenly-所有间距完全相等
 * center-居中对齐
 */
export type JustifyContentType =
    'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'center'

/**
 * Flex换行方式
 *
 * @values
 * nowrap-不换行
 * wrap-自动换行
 * wrap-reverse-反向换行
 */
export type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse'

/**
 * 交叉轴对齐方式
 *
 * @values
 * flex-start-起点对齐
 * center-居中对齐
 * flex-end-终点对齐
 * stretch-拉伸填充
 * baseline-基线对齐
 */
export type AlignType = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

/**
 * 水平方向位置
 *
 * @values
 * left-左侧
 * right-右侧
 */
export type LeftRightType = 'left' | 'right'

/**
 * 垂直方向位置
 *
 * @values
 * top-顶部
 * bottom-底部
 */
export type TopBottomType = 'top' | 'bottom'

/**
 * 上下左右方向集合
 */
export type UDLRType = LeftRightType | TopBottomType

/**
 * 水平方向位置（包含居中）
 *
 * @values
 * left-左侧
 * right-右侧
 * center-居中
 */
export type RowCenterType = LeftRightType | 'center'

/**
 * 垂直方向位置（包含居中）
 *
 * @values
 * top-顶部
 * bottom-底部
 * center-居中
 */
export type ColumnCenterType = TopBottomType | 'center'

/**
 * 通用布局方向
 *
 * @values
 * left-左侧
 * right-右侧
 * top-顶部
 * bottom-底部
 * center-居中
 */
export type LayoutType = LeftRightType | TopBottomType | 'center'

// ---------------------------------------------------------------
// 表单 / 输入
// ---------------------------------------------------------------

/**
 * 表单标签位置
 *
 * @values
 * left-标签显示在左侧
 * top-标签显示在顶部
 */
export type LabelPosition = 'left' | 'top'

/**
 * 标签相对于图标的位置
 *
 * @values
 * right-标签显示在图标右侧
 * bottom-标签显示在图标下方
 */
export type IconLabelPosition = 'right' | 'bottom'

/**
 * 输入框类型
 *
 * @values
 * text-文本输入
 * idcard-身份证输入
 * number-整数输入
 * digit-数字输入（支持小数）
 * password-密码输入
 */
export type InputType = 'text' | 'idcard' | 'number' | 'digit' | 'password'

/**
 * 图片裁剪、缩放的模式
 * ScaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
 * AspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来，可以完整地将图片显示出来
 * AspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
 * WidthFix 宽度不变，高度自动变化，保持原图宽高比不变
 * HeightFix 高度不变，宽度自动变化，保持原图宽高比不变
 * Top 不缩放图片，只显示图片的顶部区域
 * Bottom 不缩放图片，只显示图片的底部区域
 * Center 不缩放图片，只显示图片的中间区域
 * Left 不缩放图片，只显示图片的左边区域
 * Right 不缩放图片，只显示图片的右边区域
 * Top left 不缩放图片，只显示图片的左上边区域
 * Top right 不缩放图片，只显示图片的右上边区域
 * Bottom left 不缩放图片，只显示图片的左下边区域
 * Bottom right 不缩放图片，只显示图片的右下边区域
 */
export type ImageMode =
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'

/**
 * 加载状态类型
 *
 * @values
 * loadMore-加载更多
 * loading-正在加载
 * noMore-没有更多数据
 */
export type LoadMoreStatus = 'loadMore' | 'loading' | 'noMore'

/**
 * 过渡动画类型
 *
 * 用于控制组件显示和隐藏时的动画效果。
 *
 * @values
 * fade-淡入淡出
 * fade-zoom - 缩放淡入
 * fade-up-上滑淡入
 * fade-down-下滑淡入
 * fade-left-左滑淡入
 * fade-right-右滑淡入
 * slide-up-向上滑入
 * slide-down-向下滑入
 * slide-left-向左滑入
 * slide-right-向右滑入
 * zoom-in-放大进入
 * zoom-out-缩小进入
 */
export type TransitionModeType =
    | 'fade'
    | 'fade-zoom'
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'zoom-in'
    | 'zoom-out'
