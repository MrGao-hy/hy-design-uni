import type IProps from "./typing";

const defaultProps: IProps = {
  logo: "",
  loginType: 0,
  themeColor: "#20D56E",
  prefix: "hy",
  isShowPwd: false,
  userPlaceholder: "输入您的用户名",
  pwdPlaceholder: "输入您的密码",
  menu: ["立即注册", "忘记密码？"],
  customUserValidator: () => ({}),
  customPwdValidator: () => ({}),
  userNumValidator: () => ({}),
  pwdNumValidator: () => ({
    min: 6,
    max: 20,
    message: "长度在6-20个字符之间",
    trigger: ["blur", "change"],
  }),
  customPhoneValidator: () => ({
    // 自定义验证函数，见上说明
    validator: (rule, value, callback) => {
      // 上面有说，返回true表示校验通过，返回false表示不通过
      return /^[1][0-9]{10}$/.test(value);
    },
    message: "手机号码不正确",
    trigger: ["change", "blur"],
  }),
};

export default defaultProps;
