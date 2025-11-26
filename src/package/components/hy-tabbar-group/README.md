# Hy Tabbar 组件

## 介绍

Tabbar 是一个底部标签导航组件，用于在应用不同页面之间进行快速切换。支持自定义样式、图标、文字、徽章、激活状态和路由跳转等功能。

## 组件关系

- `hy-tabbar-group`: 作为容器，管理多个 tabbar-item
- `hy-tabbar-item`: 作为单个标签项，包含图标、文字和徽章等元素

## 引入方式

### 全局引入

```typescript
// 在 main.ts 或 index.ts 中引入
import { createApp } from 'vue'
import App from './App.vue'
import HyDesignUni from '@/package'

const app = createApp(App)
app.use(HyDesignUni)
app.mount('#app')
```

### 局部引入

```vue
<template>
  <hy-tabbar-group v-model="current">
    <hy-tabbar-item index="0" icon="home" text="首页"></hy-tabbar-item>
    <hy-tabbar-item index="1" icon="discover" text="发现"></hy-tabbar-item>
  </hy-tabbar-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyTabbarGroup from '@/package/components/hy-tabbar-group/hy-tabbar-group.vue'
import HyTabbarItem from '@/package/components/hy-tabbar-item/hy-tabbar-item.vue'

const current = ref('0')
</script>
```

## HyTabbarGroup API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | `string \| number` | - | 是 | 当前选中项的索引 |
| fixed | `boolean` | `false` | 否 | 是否固定在底部 |
| safe-area-inset-bottom | `boolean` | `false` | 否 | 是否适配底部安全区域 |
| background | `string` | `#fff` | 否 | 背景色 |
| height | `string \| number` | `50px` | 否 | 高度 |
| border-style | `string` | - | 否 | 边框样式，可选值：`solid`、`dashed`、`dotted` |
| shadow-level | `0 \| 1 \| 2 \| 3` | `0` | 否 | 阴影等级 |
| active-color | `string` | `#1677ff` | 否 | 激活状态颜色 |
| inactive-color | `string` | `#606266` | 否 | 非激活状态颜色 |
| icon-size | `string \| number` | `24` | 否 | 图标大小 |
| fontSize | `string \| number` | `12` | 否 | 文字大小 |
| icon-text-space | `string \| number` | `4` | 否 | 图标与文字间距 |
| indicator-mode | `'none' \| 'bottom' \| 'top' \| 'full'` | `'none'` | 否 | 指示器模式 |
| indicator-color | `string` | `#1677ff` | 否 | 指示器颜色 |
| indicator-height | `string \| number` | `3px` | 否 | 指示器高度 |
| indicator-length | `string \| number` | `20px` | 否 | 指示器长度 |
| indicator-radius | `string \| number` | `4px` | 否 | 指示器圆角 |
| transition-duration | `string \| number` | `300` | 否 | 过渡动画时长 |
| customClass | `string` | - | 否 | 自定义类名 |
| customStyle | `object` | - | 否 | 自定义样式 |
| activeClass | `string` | - | 否 | 激活时的自定义类名 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击标签项时触发 | `index: string \| number` | 选中项的索引 |
| change | 选中项改变时触发 | `index: string \| number` | 选中项的索引 |
| active | 选中项被激活时触发 | `index: string \| number` | 选中项的索引 |
| update:active | 更新激活状态时触发 | `index: string \| number` | 选中项的索引 |

### Slots

| 名称 | 说明 | 子标签 |
| --- | --- | --- |
| default | 容纳 hy-tabbar-item 子组件 | `<hy-tabbar-item>` |

### Expose

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| selectItem | 选中指定标签项 | `index: string \| number` | 要选中的索引 |
| updateRectInfo | 更新位置信息 | - |
| registerTabItem | 注册标签项 | `item: object` | 标签项信息 |
| unregisterTabItem | 注销标签项 | `item: object` | 标签项信息 |
| handleClick | 处理点击事件 | `index: string \| number` | 点击的索引 |

## HyTabbarItem API

### Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| index | `string \| number` | - | 是 | 标签项的索引 |
| icon | `string` | - | 否 | 图标名称 |
| text | `string` | - | 否 | 文字内容 |
| route | `string` | - | 否 | 路由路径 |
| show-icon | `boolean` | `true` | 否 | 是否显示图标 |
| hide-text | `boolean` | `false` | 否 | 是否隐藏文字 |
| disabled | `boolean` | `false` | 否 | 是否禁用 |
| click-effect | `'none' \| 'feedback' \| 'ripple'` | `'none'` | 否 | 点击效果 |
| ripple-duration | `string` | `'300ms'` | 否 | 波纹动画时长 |
| width | `string \| number` | - | 否 | 宽度 |
| height | `string \| number` | - | 否 | 高度 |
| show-active-bg | `boolean` | `false` | 否 | 是否显示激活背景 |
| active-bg-color | `string` | - | 否 | 激活背景颜色 |
| icon-color | `string` | - | 否 | 图标颜色 |
| active-icon-color | `string` | - | 否 | 激活时图标颜色 |
| inactive-icon-color | `string` | - | 否 | 非激活时图标颜色 |
| text-color | `string` | - | 否 | 文字颜色 |
| active-text-color | `string` | - | 否 | 激活时文字颜色 |
| inactive-text-color | `string` | - | 否 | 非激活时文字颜色 |
| icon-size | `string \| number` | `24` | 否 | 图标大小 |
| icon-text-space | `string \| number` | `4` | 否 | 图标与文字间距 |
| badge | `string \| number \| null` | - | 否 | 徽章内容 |
| badge-offset | `[number, number]` | `[0, 0]` | 否 | 徽章偏移量 |
| badge-max | `number` | `99` | 否 | 徽章最大值 |
| badge-is-dot | `boolean` | `false` | 否 | 是否显示为点 |
| badge-inverted | `boolean` | `false` | 否 | 是否使用浅色背景 |
| badge-bg-color | `string` | `#ff4d4f` | 否 | 徽章背景色 |
| badge-text-color | `string` | `#fff` | 否 | 徽章文字颜色 |
| badge-show-zero | `boolean` | `false` | 否 | 徽章为0时是否显示 |
| customClass | `string` | - | 否 | 自定义类名 |
| customStyle | `object` | - | 否 | 自定义样式 |
| activeClass | `string` | - | 否 | 激活时的自定义类名 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击标签项时触发 | `{ index, icon, text }` | 标签项信息 |
| active | 标签项被激活时触发 | `index: string \| number` | 标签项索引 |
| change | 标签项状态改变时触发 | `index: string \| number` | 标签项索引 |
| update:active | 更新激活状态时触发 | `index: string \| number` | 标签项索引 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义文字内容 |
| icon | 自定义图标内容 |

## 使用示例

### 基础用法

```vue
<hy-tabbar-group v-model="current">
  <hy-tabbar-item index="0" icon="home" text="首页"></hy-tabbar-item>
  <hy-tabbar-item index="1" icon="discover" text="发现"></hy-tabbar-item>
  <hy-tabbar-item index="2" icon="shopping-cart" text="购物车"></hy-tabbar-item>
  <hy-tabbar-item index="3" icon="user" text="我的"></hy-tabbar-item>
</hy-tabbar-group>
```

### 固定在底部

```vue
<hy-tabbar-group 
  v-model="current"
  fixed
  safe-area-inset-bottom
  background="#fff"
  border-style="solid"
>
  <hy-tabbar-item index="0" icon="home" text="首页"></hy-tabbar-item>
  <hy-tabbar-item index="1" icon="discover" text="发现"></hy-tabbar-item>
</hy-tabbar-group>
```

### 添加徽章

```vue
<hy-tabbar-group v-model="current">
  <hy-tabbar-item index="0" icon="home" text="首页"></hy-tabbar-item>
  <hy-tabbar-item index="1" icon="message" text="消息" :badge="5"></hy-tabbar-item>
  <hy-tabbar-item index="2" icon="notification" text="通知" badge-is-dot></hy-tabbar-item>
</hy-tabbar-group>
```

### 自定义激活样式

```vue
<hy-tabbar-group 
  v-model="current"
  active-color="#ff6b81"
>
  <hy-tabbar-item 
    index="0" 
    icon="home" 
    text="首页" 
    show-active-bg
    active-bg-color="rgba(255, 107, 129, 0.1)"
  ></hy-tabbar-item>
  <hy-tabbar-item 
    index="1" 
    icon="discover" 
    text="发现" 
    show-active-bg
    active-bg-color="rgba(255, 107, 129, 0.1)"
  ></hy-tabbar-item>
</hy-tabbar-group>
```

### 点击效果

```vue
<hy-tabbar-group v-model="current">
  <hy-tabbar-item 
    index="0" 
    icon="home" 
    text="首页" 
    click-effect="ripple"
  ></hy-tabbar-item>
  <hy-tabbar-item 
    index="1" 
    icon="discover" 
    text="发现" 
    click-effect="feedback"
  ></hy-tabbar-item>
</hy-tabbar-group>
```

### 路由跳转

```vue
<hy-tabbar-group v-model="current">
  <hy-tabbar-item 
    index="0" 
    icon="home" 
    text="首页" 
    route="/pages/index/index"
  ></hy-tabbar-item>
  <hy-tabbar-item 
    index="1" 
    icon="mine" 
    text="我的" 
    route="/pages/mine/index"
  ></hy-tabbar-item>
</hy-tabbar-group>
```

### 指示器模式

```vue
<hy-tabbar-group 
  v-model="current"
  indicator-mode="bottom"
  indicator-color="#1677ff"
  indicator-height="3px"
>
  <hy-tabbar-item index="0" icon="home" text="首页"></hy-tabbar-item>
  <hy-tabbar-item index="1" icon="discover" text="发现"></hy-tabbar-item>
</hy-tabbar-group>
```

## 多端兼容性说明

### H5 端
- 支持 `vue-router` 路由跳转
- 支持完整的触摸反馈和波纹效果
- 支持所有 CSS 动画和过渡效果

### 小程序端
- 使用 `uni.navigateTo` 进行路由跳转
- 优化了触摸事件处理，确保流畅的交互体验
- 适配小程序的样式和布局特性

### APP 端
- 支持原生的触摸事件
- 优化了性能，减少不必要的渲染
- 适配不同设备的屏幕尺寸和安全区域

## 常见问题

### 1. 如何实现标签项的动态增减？

通过 `v-if` 或 `v-for` 动态渲染 `hy-tabbar-item` 组件，组件会自动注册和注销。

### 2. 如何自定义图标？

可以使用 `icon` slot 来自定义图标内容，例如：

```vue
<hy-tabbar-item index="0" text="首页">
  <template #icon>
    <image src="/static/custom-icon.png" style="width: 24px; height: 24px;"></image>
  </template>
</hy-tabbar-item>
```

### 3. 如何处理路由跳转？

设置 `route` 属性，组件会根据不同端自动选择合适的跳转方式。

### 4. 如何适配 iPhone 的底部安全区域？

设置 `safe-area-inset-bottom` 属性为 `true`。

### 5. 如何自定义徽章样式？

使用 `badge-*` 系列属性可以自定义徽章的各种样式，如颜色、大小、位置等。

## 组件源码

- [hy-tabbar-group](https://github.com/example/hy-design-uni/blob/main/src/package/components/hy-tabbar-group)
- [hy-tabbar-item](https://github.com/example/hy-design-uni/blob/main/src/package/components/hy-tabbar-item)

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的 tabbar 功能
- 支持自定义样式和交互效果
- 支持多端适配