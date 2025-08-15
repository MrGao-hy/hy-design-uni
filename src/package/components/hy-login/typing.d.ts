export interface UserLoginInfoVo {
  userName: string;
  password: string;
}

export default interface HyLoginProps {
  /**
   * @description 登录logo
   * */
  logo?: string;
  /**
   * @description 登录类型：可选：1-用户密码登录、2-手机验证码登录、其他-两者都可以
   * */
  loginType?: number | string;
  /**
   * @description 主题颜色
   * */
  themeColor?: string;
  /**
   * @description 浏览器缓存名称前缀
   * */
  prefix?: string;
  /**
   * @description 是否需要显示密码操作
   * */
  isShowPwd?: boolean;
  /**
   * @description 用户输入框占位提示
   * */
  userPlaceholder?: string;
  /**
   * @description 密码输入框占位提示
   * */
  pwdPlaceholder?: string;
  /**
   * @description 底部小菜单
   * */
  menu?: string[];
  /**
   * @description 自定义用户名效验
   * customUserValidator: {
   *     validator: (rule, value, callback) => {
   *     },
   *     message: '提示信息',
   *     trigger: ['change','blur'],
   * }
   * */
  customUserValidator?: Record<string, any>;
  /**
   * @description 自定义密码效验
   * */
  customPwdValidator?: Record<string, any>;
  /**
   * @description 用户名输入数量校验
   * */
  userNumValidator?: Record<string, any>;
  /**
   * @description 密码输入数量校验
   * */
  pwdNumValidator?: Record<string, any>;
  /**
   * @description 自定义手机效验规则
   * */
  customPhoneValidator?: Record<string, any>;
}
