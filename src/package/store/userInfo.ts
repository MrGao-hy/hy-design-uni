import { defineStore } from "pinia";
import type { UserLoginInfoVo } from "../components/hy-login/typing";

export const useUserInfo = defineStore("gxh_userInfo", {
  state: () => ({
    userForm: {
      userName: "",
      password: "",
    } as UserLoginInfoVo,
    phoneForm: {
      phone: "",
      code: "",
    },
    rememberPsw: false,
    // 历史账户列表
    choiceList: [] as UserLoginInfoVo[],
    // 选中账户信息
    choiceIndex: 0,
    secretKey: "hy",
  }),
  actions: {
    saveHistoriesList() {
      this.choiceList;
    },
  },
});
