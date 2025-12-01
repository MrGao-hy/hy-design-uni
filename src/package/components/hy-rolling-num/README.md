# hy-rolling-num 滚动数字组件

## 介绍

滚动数字组件，用于实现数字从初始值（全0）平滑滚动到目标值的动画效果。当数字变化时，会先显示与目标值长度相同的全0字符串，然后通过平滑的滚动动画过渡到目标值。

## 特性

- 支持自定义数字大小、颜色、字体粗细
- 支持设置滚动方向（向上、向下、交替）
- 支持设置动画持续时间和延迟步进
- 自动根据目标值长度生成对应长度的初始值（全0）
- 支持特殊字符（非数字字符会直接显示，不会参与滚动）

## 使用方法

### 基本用法

```vue
<template>
  <view class="demo">
    <hy-rolling-num :value="num" :size="'48rpx'" :color="'#1989fa'" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HyRollingNum from '@/package/components/hy-rolling-num/hy-rolling-num.vue';

// 初始值为0，当更新为234564时，会先显示000000然后滚动到234564
const num = ref(234564);
</script>
```

### 自定义配置

```vue
<hy-rolling-num 
  :value="num" 
  :size="'36rpx'" 
  :color="'#ff6b6b'"
  :font-weight="'bold'"
  :duration="2"
  :scroll-direction="'down'"
  :stop-order="'right-to-left'"
  :delay-step="0.15"
/>
```

## Props

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | number \| string | 0 | 要显示的数字或字符串值 |
| size | string | '32rpx' | 数字字体大小 |
| color | string | '#333' | 数字颜色 |
| fontWeight | string \| number | 'normal' | 字体粗细 |
| height | string | '40rpx' | 单个数字的高度 |
| duration | number | 1.5 | 滚动动画持续时间（秒） |
| letterSpacing | string | '0' | 数字间距 |
| scrollDirection | 'up' \| 'down' \| 'alternate' | 'up' | 滚动方向：向上、向下或交替 |
| stopOrder | 'left-to-right' \| 'right-to-left' | 'left-to-right' | 滚动停止顺序：从左到右或从右到左 |
| delayStep | number | 0.1 | 每个数字滚动的延迟时间间隔（秒） |
| customStyle | CSSProperties | {} | 自定义样式对象 |

## 示例

### 示例1：基本滚动效果

```vue
<template>
  <view>
    <text>滚动数字：</text>
    <hy-rolling-num :value="234564" />
    <!-- 会先显示 000000，然后滚动到 234564 -->
  </view>
</template>
```

### 示例2：改变数字长度

```vue
<template>
  <view>
    <button @click="changeValue(234)">显示 234</button>
    <button @click="changeValue(987654321)">显示 987654321</button>
    <hy-rolling-num :value="displayValue" />
    <!-- 点击第一个按钮：显示 000 -> 234 -->
    <!-- 点击第二个按钮：显示 000000000 -> 987654321 -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const displayValue = ref(0);

const changeValue = (val: number) => {
  displayValue.value = val;
};
</script>
```

### 示例3：自定义滚动方向和动画

```vue
<template>
  <view>
    <hy-rolling-num 
      :value="num" 
      :scroll-direction="'alternate'" 
      :duration="1.2"
      :delay-step="0.08"
    />
    <!-- 交替方向滚动，奇偶位滚动方向相反 -->
  </view>
</template>
```

## 注意事项

1. 组件会自动根据传入的 `value` 长度生成对应长度的全0初始值
2. 当 `value` 为字符串时，非数字字符会直接显示，不会参与滚动动画
3. 滚动动画的实现依赖于CSS的transform属性，确保在支持该属性的环境中使用
4. 动画延迟时间总和不宜过长，以免影响用户体验
5. 当需要频繁更新数字时，建议控制更新频率，避免动画效果过于密集

## 常见问题

### Q: 为什么数字变化时会先显示全0？
A: 这是组件的设计特性，用于实现从初始状态到目标状态的滚动动画效果，增强视觉体验。

### Q: 如何调整滚动速度？
A: 通过调整 `duration` 属性可以控制整个滚动动画的持续时间，数值越小，滚动越快。

### Q: 特殊字符会如何显示？
A: 非数字字符（如小数点、货币符号等）会直接显示，不会参与滚动动画。