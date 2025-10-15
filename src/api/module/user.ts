import http from "@/api/request";

interface WxLogin {
  token: string;
}

/**
 * 微信登录接口
 * @param jsCode 微信官方返回的用户登录凭证
 * 开发者需要在开发者服务器后台，使用 code 换取 openid 和 session_key 等信息
 * */
export const wxLoginApi = (jsCode: string): Promise<WxLogin> => {
  return http.get("/wechat/mini/user/login", {
    jsCode,
  });
};
