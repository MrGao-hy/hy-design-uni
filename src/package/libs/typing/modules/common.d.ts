declare namespace HyApp {
  /**
   * @description dark:暗色、light:亮色
   * */
  type DarkModeType = "dark" | "light";
  /**
   * @description 主题类型 primary-默认，success-错误，warning-警告，error-错误，info-信息
   * */
  type ThemeType = "primary" | "success" | "warning" | "error" | "info";
  /**
   * @description 大小
   * */
  type SizeType = "small" | "medium" | "large";
  /**
   * @description 形状：circle-圆形，square-方块
   * */
  type ShapeType = "circle" | "square";

  /**
   * @description 形状：flex-start-开头排序，flex-start-结尾排序，space-between-两边靠边，space-around-两边留一半空隙，space-evenly-两边留一个空隙，center-居中
   * */
  type JustifyContentType =
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "center";
  /**
   * @description 排列方式，row-横向，column-纵向
   * */
  type DirectionType = "row" | "column";
  /**
   * @description 布局方式；left-左，right-右，top-上，bottom-下，center-中
   * */
  type LayoutType = LeftRightType | TopBottomType | "center";
  /**
   * @description 布局方式：left-左，right-右
   * */
  type LeftRightType = "left" | "right";
  /**
   * @description 布局方式：left-左，right-右，center-中间
   * */
  type RowCenterType = LeftRightType | "center";
  /**
   * @description 布局方式：top-上，bottom-下，center-中间
   * */
  type ColumnCenterType = TopBottomType | "center";
  /**
   * @description 布局方式：top-上，bottom-下
   * */
  type TopBottomType = "top" | "bottom";
  /**
   * @description 主题亮度：light-亮色，dark-暗色
   * */
  type ThemeVo = "light" | "dark";
  /**
   * @description 边框：surround-四周有边框，bottom-底部有边框，none-无边框
   * */
  type BorderType = "surround" | "bottom" | "none";
  /**
   * @description 轮播图指示点样式：line-线形，dot-点
   * */
  type SwiperIndicatorModeType = "line" | "dot";
  /**
   * @description 输入框输入类型
   * @desc text - 文本
   * @desc idcard - 身份证id
   * @desc number - 数字
   * @desc digit - 数字输入框，不支持小数点和复数
   * @desc password - 密码
   * */
  type InputType = "text" | "idcard" | "number" | "digit" | "password";
  /**
   * @description 图片mode,详细见uniApp
   * */
  type ImageModeVo =
    | "scaleToFill"
    | "aspectFit"
    | "aspectFill"
    | "widthFix"
    | "heightFix"
    | "top"
    | "bottom"
    | "center"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  /**
   * @description 导航类型：
   * */
  type NavigationType = "navigateTo" | "redirectTo" | "switchTab" | "reLaunch";
  /**
   * @description 旋转方向
   * */
  type RotateType = "left" | "up" | "down" | "right";
  /**
   * @description 上传类型
   * */
  type FileType = "video" | "media" | "all" | "file" | "image";
  /**
   * @description 加载模式：circle-圆圈，spinner-经典花，semicircle-半圆
   * */
  type LoadingMode = "spinner" | "circle" | "semicircle";
  /**
   * @description 动画类型
   * */
  type TransitionMode =
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade-zoom"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom-in"
    | "zoom-out";
  /** label位置 */
  type LabelPosition = "left" | "top";
  interface IFieldNames {
    /**
     * @description 自定义columns的文本键
     * */
    name: string;
    /**
     * @description 自定义columns的值键
     * */
    value: string;
  }
  type FieldNamesType = {
    [key in keyof IFieldNames as IFieldNames[key]]?: string | number | boolean;
  };
}
