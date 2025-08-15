<template>
  <view class="user-login">
    <u-form
      :model="phoneForm"
      ref="formRef"
      :rules="phoneRules"
      labelWidth="30"
    >
      <!--手机号输入-->
      <u-form-item prop="phone">
        <u-input
          v-model="phoneForm.phone"
          placeholder="请输入手机号"
          :clearable="true"
          border="bottom"
        >
          <!-- #ifndef APP-PLUS-NVUE -->
          <template #prefix>
            <u-icon name="phone" :color="themeColor"></u-icon>
          </template>
          <!-- #endif -->
        </u-input>
      </u-form-item>

      <!--验证码输入-->
      <u-form-item prop="code">
        <u-input
          v-model="phoneForm.code"
          border="bottom"
          placeholder="请填写验证码"
          :color="themeColor"
        >
          <!-- #ifndef APP-PLUS-NVUE -->
          <template #prefix>
            <u-icon name="fingerprint" :color="themeColor"></u-icon>
          </template>
          <!-- #endif -->
        </u-input>
        <!-- #ifndef APP-PLUS-NVUE -->
        <template #right>
          <u-button
            text="获取验证码"
            :color="themeColor"
            size="mini"
          ></u-button>
        </template>
        <!-- #endif -->
      </u-form-item>
    </u-form>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserInfo } from "../../store";

interface IProps {
  themeColor: string;
  customPhoneValidator: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
  themeColor: "",
  customPhoneValidator: () => ({})
});

const userInfoStore = useUserInfo();
const { phoneForm } = storeToRefs(userInfoStore);
const formRef = ref(null);

const phoneRules = reactive({
  phone: [
    {
      required: true,
      message: "请先输入手机号",
      // 可以单个或者同时写两个触发验证方式
      trigger: ["change"]
    },
    props.customPhoneValidator
  ],
  code: [
    {
      type: "string",
      required: true,
      message: "请输入验证码",
      // 可以单个或者同时写两个触发验证方式
      trigger: ["blur", "change"]
    }
  ]
});

/**
 * 登录效验
 * */
const loginFn = () => {
  return new Promise((resolve) => {
    formRef.value.validate().then((res) => {
      resolve();
    });
  });
};
defineExpose({
  loginFn
});
</script>
