<template>
  <view class="normal-login-container">
    <view class="logo-content align-center flex justify-center">
      <image class="image" :src="props.logo" mode="widthFix"></image>
    </view>
    <!-- 登录 -->
    <view class="login-form-content">
      <view class="form-top">
        <view
          class="top-col"
          v-for="(item, i) in tabs"
          :key="i"
          @tap="currentTab = i"
        >
          <view class="form-top-title">
            {{ item.name }}
          </view>
          <view
            :class="i === currentTab ? 'line' : ''"
            :style="'background:' + props.themeColor"
          ></view>
        </view>
      </view>
      <TheUserLogin
        v-if="'user' === indexCode(currentTab)"
        ref="userLoginRef"
        :themeColor="props.themeColor"
        :prefix="props.prefix"
        :isShowPwd="isShowPwd"
        :userPlaceholder="userPlaceholder"
        :pwdPlaceholder="pwdPlaceholder"
        :customUserValidator="props.customUserValidator"
        :customPwdValidator="props.customPwdValidator"
        :userNumValidator="props.userNumValidator"
        :pwdNumValidator="props.pwdNumValidator"
        @handleCheckbox="handleCheckbox"
      />
      <ThePhoneLogin
        v-if="'phone' === indexCode(currentTab)"
        ref="phoneLoginRef"
        :themeColor="props.themeColor"
        :customPhoneValidator="props.customPhoneValidator"
      />
      <view class="action-btn">
        <HyButton class="login-btn" :color="props.themeColor" @click="loginFn"
          >登录
        </HyButton>
      </view>
      <view class="footer">
        <view
          class="footer__tips"
          v-for="(item, i) in menu"
          :key="i"
          @click="clickMenuFn(i)"
          >{{ item }}</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { encryptData } from "../../utils";
import { useUserInfo } from "../../store";
import defaultProps from "./props";
import type IProps from "./typing";

// 组件
import TheUserLogin from "./TheUserLogin.vue";
import ThePhoneLogin from "./ThePhoneLogin.vue";
import HyButton from "../hy-button/hy-button.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const emit = defineEmits(["login", "handleClickMenu"]);

const userInfoStore = useUserInfo();
const { userForm, rememberPsw } = storeToRefs(userInfoStore);
const indexCode = computed(() => {
  return (temp: string | number) => {
    switch (Number(props.loginType)) {
      case 1:
        return "user";
      case 2:
        return "phone";
      default:
        if (temp == 0) {
          return "user";
        } else {
          return "phone";
        }
    }
  };
});
const selectModel = (temp: number) => {
  return new Promise((resolve, reject) => {
    switch (Number(props.loginType)) {
      case 1:
        resolve("user");
        break;
      case 2:
        resolve("phone");
        break;
      default:
        if (temp == 0) {
          resolve("user");
        } else {
          resolve("phone");
        }
        break;
    }
  });
};
const tabs = ref([
  {
    name: "账号登录",
  },
  {
    name: "验证码登录",
  },
]);
const currentTab = ref(0);
const userLoginRef = ref<InstanceType<typeof TheUserLogin>>();
const phoneLoginRef = ref<InstanceType<typeof ThePhoneLogin>>();
watch(
  () => Number(props.loginType),
  (newVal) => {
    tabs.value = computed(() => {
      switch (newVal) {
        case 1:
          return [{ name: "账号登录" }];
        case 2:
          return [{ name: "验证码登录" }];
        default:
          return [{ name: "账号登录" }, { name: "验证码登录" }];
      }
    }).value;
  },
  { immediate: true, deep: true },
);

/**
 * 登录用户名
 * */
const loginFn = async () => {
  const type = await selectModel(currentTab.value);
  switch (type) {
    case "user":
      // let user = userForm.value.userName;
      // let pwd = userForm.value.password;
      await userLoginRef.value?.loginFn();
      //缓存账号和密码
      if (rememberPsw.value) {
        uni.setStorageSync(
          `${props.prefix}_account`,
          encryptData({
            rememberPsw: rememberPsw.value,
            ...userForm.value,
          }),
        );
      } else {
        // 如果没有选记住密码就移除之前保存的
        uni.removeStorageSync(`${props.prefix}_account`);
        uni.setStorageSync(
          `${props.prefix}_account`,
          encryptData({ rememberPsw: rememberPsw.value }),
        );
      }
      emit("login", userForm.value);
      break;
    case "phone":
      await phoneLoginRef.value?.loginFn();
      break;
    default:
      break;
  }
};

/**
 * 点击下面小菜单
 * */
const clickMenuFn = (index: number) => {
  emit("handleClickMenu", index);
};

/**
 * @description 记住密码
 * */
const handleCheckbox = () => {};
</script>

<style lang="scss" scoped>
.normal-login-container {
  width: 100%;
  height: 100vh;
  padding: 0 60rpx;
  /* #ifndef APP-PLUS-NVUE */
  box-sizing: border-box;
  /* #endif */
  display: flex;
  justify-content: center;
  flex-direction: column;
  //align-items: center;

  /*logo图片展示*/
  .logo-content {
    width: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    /* #ifndef APP-PLUS-NVUE */
    margin: 0 auto 100rpx;
    box-sizing: border-box;
    height: auto;
    .image {
      width: 100%;
      height: auto;
    }
    /* #endif */
  }

  /*登录模块*/
  .login-form-content {
    //text-align: center;
    box-shadow: 0px 5px 4px 0px rgba(200, 200, 200, 0.5);
    border-radius: 10px;
    background: #ffffff;
    padding: 28rpx 50rpx 50rpx;

    .form-top {
      display: flex;
      justify-content: space-around;
      margin-bottom: 40rpx;

      .top-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .form-top-title {
          font-size: 28rpx;
        }

        .line {
          width: 90rpx;
          height: 4rpx;
          margin-top: 6rpx;
        }
      }
    }

    .mui-input-row {
      display: flex;
      /* #ifndef APP-PLUS-NVUE */
      justify-self: start;
      /* #endif */
      margin-top: 27rpx;
    }

    .action-btn {
      margin-top: 30rpx;
    }

    .footer {
      display: flex;
      justify-content: space-around;
      /* #ifndef APP-PLUS-NVUE */
      margin: auto 20%;
      /* #endif */

      &__tips {
        font-size: 12px;
        margin-top: 27rpx;
        text-align: center;
        color: grey;
        text-decoration: underline;
      }
    }

    .xieyi {
      color: #333;
      margin-top: 40rpx;
    }
  }
}
</style>
