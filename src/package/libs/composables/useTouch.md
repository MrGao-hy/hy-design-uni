# useTouch 触摸事件组合式 API

## 功能介绍

`useTouch` 是一个基于 Vue 3 Composition API 的触摸事件处理钩子，用于跟踪和分析用户的触摸操作，包括触摸方向、位移距离等信息。

- 支持跟踪触摸的水平和垂直方向
- 提供实时的位移数据
- 支持响应式状态管理
- 轻量简洁，易于集成

## 引入方式

```typescript
import { useTouch } from '@/package/libs/composables/useTouch'
```

## API 文档

### useTouch()

创建并返回触摸事件处理实例，包含触摸事件处理函数和触摸状态。

**返回值**：包含以下属性的对象：

| 返回值 | 类型 | 说明 |
|--------|------|------|
| touchStart | (event: any) => void | 触摸开始事件处理函数 |
| touchMove | (event: any) => void | 触摸移动事件处理函数 |
| direction | Ref<string> | 触摸方向，值为 "horizontal"（水平）、"vertical"（垂直）或 ""（未确定） |
| deltaX | Ref<number> | 水平方向位移，正数表示向右，负数表示向左 |
| deltaY | Ref<number> | 垂直方向位移，正数表示向下，负数表示向上 |
| offsetX | Ref<number> | 水平方向位移的绝对值 |
| offsetY | Ref<number> | 垂直方向位移的绝对值 |
| startX | Ref<number> | 触摸开始时的 X 坐标 |
| startY | Ref<number> | 触摸开始时的 Y 坐标 |

## 使用示例

### 基础用法

```vue
<template>
  <div 
    class="touch-area"
    @touchstart="touchStart"
    @touchmove="touchMove"
  >
    <div class="info">
      <p>触摸方向: {{ direction }}</p>
      <p>水平位移: {{ deltaX }}px</p>
      <p>垂直位移: {{ deltaY }}px</p>
      <p>水平偏移: {{ offsetX }}px</p>
      <p>垂直偏移: {{ offsetY }}px</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTouch } from '@/package/libs/composables/useTouch'

const {
  touchStart,
  touchMove,
  direction,
  deltaX,
  deltaY,
  offsetX,
  offsetY
} = useTouch()
</script>

<style scoped>
.touch-area {
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  touch-action: none;
}

.info {
  text-align: center;
  font-size: 14px;
  color: #333;
}

.info p {
  margin: 8px 0;
}
</style>
```

### 高级用法 - 实现滑动手势

```vue
<template>
  <div 
    class="swipe-container"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div 
      class="swipe-content"
      :style="{
        transform: `translateX(${swipeOffset}px)`
      }"
    >
      滑动内容区域
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTouch } from '@/package/libs/composables/useTouch'

const {
  touchStart,
  touchMove,
  direction,
  deltaX
} = useTouch()

const swipeOffset = ref(0)
const maxSwipeOffset = 100

const touchEnd = () => {
  if (direction.value === 'horizontal') {
    if (deltaX.value > 50) {
      // 向右滑动超过阈值
      swipeOffset.value = maxSwipeOffset
    } else if (deltaX.value < -50) {
      // 向左滑动超过阈值
      swipeOffset.value = -maxSwipeOffset
    } else {
      // 复位
      swipeOffset.value = 0
    }
  }
}
</script>

<style scoped>
.swipe-container {
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.swipe-content {
  width: 100%;
  height: 100%;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}
</style>
```

## 技术实现

### 核心原理

1. **响应式状态管理**：使用 Vue 3 的 `ref` 创建响应式变量，跟踪触摸状态
2. **触摸事件处理**：通过 `touchStart` 和 `touchMove` 函数处理触摸事件
3. **方向判断**：根据水平和垂直位移的绝对值大小判断触摸方向
4. **位移计算**：实时计算触摸点的位移距离和偏移量

### 关键函数

#### touchStart(event: any)

触摸开始时的事件处理函数，初始化所有状态变量。

- **参数**：`event` - 触摸事件对象
- **功能**：
  - 获取第一个触摸点
  - 重置方向和位移状态
  - 记录触摸开始的坐标位置

#### touchMove(event: any)

触摸移动时的事件处理函数，计算位移和方向。

- **参数**：`event` - 触摸事件对象
- **功能**：
  - 获取当前触摸点
  - 计算水平和垂直方向的位移
  - 计算位移的绝对值
  - 根据位移绝对值判断触摸方向

## 返回值详解

| 返回值 | 类型 | 说明 |
|--------|------|------|
| touchStart | Function | 触摸开始事件处理函数，需绑定到元素的 @touchstart 事件 |
| touchMove | Function | 触摸移动事件处理函数，需绑定到元素的 @touchmove 事件 |
| direction | Ref<string> | 触摸方向，值为 "horizontal"（水平）、"vertical"（垂直）或 ""（未确定） |
| deltaX | Ref<number> | 水平方向位移，正数表示向右，负数表示向左 |
| deltaY | Ref<number> | 垂直方向位移，正数表示向下，负数表示向上 |
| offsetX | Ref<number> | 水平方向位移的绝对值 |
| offsetY | Ref<number> | 垂直方向位移的绝对值 |
| startX | Ref<number> | 触摸开始时的 X 坐标 |
| startY | Ref<number> | 触摸开始时的 Y 坐标 |

## 注意事项

1. **事件绑定**：需要在目标元素上同时绑定 `@touchstart` 和 `@touchmove` 事件
2. **触摸设备**：此钩子仅在支持触摸事件的设备上有效
3. **性能优化**：对于频繁的触摸移动事件，可以考虑使用 `passive` 事件监听器或节流处理
4. **浏览器兼容性**：不同浏览器对触摸事件的实现可能存在差异，建议在主要目标设备上进行测试
5. **事件对象类型**：当前实现中 `event` 参数类型为 `any`，在 TypeScript 项目中可以根据需要定义更具体的类型

## 应用场景

1. **滑动手势识别**：如左右滑动切换内容、上下滑动刷新等
2. **拖拽功能**：实现元素的拖拽移动
3. **手势密码**：辅助实现手势密码功能
4. **游戏控制**：用于游戏中的触摸控制
5. **交互式组件**：如滑块、滑动菜单等组件的实现

## 总结

`useTouch` 是一个轻量级的触摸事件处理钩子，提供了简单而强大的触摸状态跟踪功能。通过使用它，开发者可以轻松实现各种基于触摸的交互效果，提升应用的用户体验。

该钩子返回的响应式状态和事件处理函数可以与 Vue 3 的组合式 API 无缝集成，适用于各种需要触摸交互的场景。