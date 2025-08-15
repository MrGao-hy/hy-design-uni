<template>
  <view class="promptBox">
    <view class="prompt">
      <image class="promptRipple" src="../../public/icons/warning.png"></image>

      <view class="promptTit">
        {{ title }}
      </view>
      <view class="promptDesc"> 我是内容 </view>
      <view class="pBtnBox">
        <button class="pBtnCancel" @click="onCancel">取消</button>
        <button class="pBtnOk" @click="onOk('hahahhaah')">确定</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("我是标题");
</script>

<style lang="scss" scoped>
.promptBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;

  .prompt {
    position: fixed;
    width: 300px;
    height: 234px;
    border-radius: 16px;
    background: linear-gradient(180deg, #e3eeff 0%, #ffffff 100%);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .promptRipple {
      position: absolute;
      top: -50px;
      width: 100px;
      height: 100px;
      z-index: -1;
    }

    .promptIcon {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      width: 110px;
      height: 110px;
      border-radius: 90px;
      overflow: hidden;
      // background: linear-gradient(149.98deg, rgba(132, 181, 255, 1) 5.7%, rgba(33, 119, 250, 1) 90.23%);
      // box-shadow: 0px 4px 10px rgba(18, 103, 232, 0.4);
    }

    .promptTit {
      width: 80%;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      text-align: center;
      margin-top: 66px;
    }

    .promptDesc {
      height: 40px;
      margin-top: 12px;
      color: rgba(102, 102, 102, 1);
      font-family: PingFang SC;
      font-size: 14px;
      text-align: center;
    }

    .pBtnBox {
      width: 280px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 12px;

      .pBtnOk {
        width: 120px;
        height: 44px;
        line-height: 44px;
        border-radius: 8px !important;
        background: linear-gradient(
          301.23deg,
          rgba(71, 143, 253, 1) 0%,
          rgba(18, 103, 232, 1) 102.96%
        );
        border: none;
        color: #ffffff;
        font-weight: 500;
        font-size: 15px;
      }

      .pBtnCancel {
        width: 120px;
        height: 44px;
        line-height: 44px;
        border-radius: 8px;
        background: rgba(224, 237, 255, 1);
        color: rgba(18, 103, 232, 1);
        font-weight: 500;
        font-size: 15px;
      }
    }
  }
}

button::after {
  border: none;
}
</style>
