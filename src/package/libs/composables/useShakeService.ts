/**
 * 摇一摇传感器hooks
 * */
import { ref } from "vue";
import type { Ref } from "vue";
import { debounce } from "../../libs";

interface Acceleration {
  x: number;
  y: number;
  z: number;
}

export function useShakeService(shakeThreshold: number = 30) {
  const lastAcceleration: Ref<Acceleration> = ref({ x: 0, y: 0, z: 0 });
  const lastTime: Ref<number> = ref(Date.now());
  const shakeCallback: Ref<null | (() => void)> = ref(null);

  const startShakeListener = (callback: () => void): void => {
    shakeCallback.value = callback;
    uni.startAccelerometer({
      success: () => {
        uni.onAccelerometerChange(handleShake);
      },
      fail: (err: any) => {
        console.error("加速度传感器启动失败", err.errMsg);
      },
    });
  };

  const stopShakeListener = (): void => {
    uni.stopAccelerometer().then(
      (res) => {
        uni.offAccelerometerChange(handleShake);
      },
      (err) => console.error("加速度传感器关闭失败", err.errMsg),
    );
  };

  const handleShake = (res: Acceleration): void => {
    const acceleration = res;
    const currentTime = Date.now();
    const timeDiff = (currentTime - lastTime.value) / 1000; // 转换为秒

    // 计算加速度的欧几里得距离
    const deltaX = acceleration.x - lastAcceleration.value.x;
    const deltaY = acceleration.y - lastAcceleration.value.y;
    const deltaZ = acceleration.z - lastAcceleration.value.z;
    const speed =
      Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ) / timeDiff;

    if (speed > shakeThreshold && shakeCallback.value) {
      debounce(shakeCallback.value, 500);
    }

    lastAcceleration.value = acceleration;
    lastTime.value = currentTime;
  };

  return {
    startShakeListener,
    stopShakeListener,
  };
}
