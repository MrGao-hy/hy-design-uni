<h1 align="center">
华玥组件库
</h1>

<p align="center">
  基于 Vue3 + TypeScript 的现代化组件库，内置 80+ 常用组件。<br>
  一键切换主题色，自动亮色/暗色模式，国际化语言，AI 友好文档，开发体验丝滑。
</p>

## 支持平台
| APP(vue) | H5(网页版) | 微信小程序 | 支付宝小程序 |
|----------|---------|-------|--------|
| ✔        | ✔       | ✔     | ✔      |

## 📖 在线文档

- [华玥组件库文档(国内地址)](https://www.hy-design-uni.top)
- [华玥组件库文档(需要梯子)](https://hy-component-docs.vercel.app/)

## 📱 移动端预览

<p style="display:flex;gap:24px">
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f37.png" width="200" height="200" />
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f38.jpg" width="200" height="200" />
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f36.png" width="200" height="200" />
</p>

## 安装教程

```bash
# 安装组件库（仅支持 Vue 3 + UniApp + TypeScript 项目）
pnpm add @hy-app/ui

# 安装依赖（如果项目中未安装）
pnpm add dayjs

# Node 版本要求 >= 16.14.0
```

## 🚀 快速上手

### 1. 全局注册（main.ts）

```javascript
import { globalRegister } from "@hy-app/ui";
import { createSSRApp } from "vue";

export function createApp() {
  const app = createSSRApp(App);
  app.use(globalRegister);
  return { app };
}
```

### 2. 使用工具函数

```vue
<template>
  <!-- 获取 0-10 之间的随机数 -->
  <div>{{ $hy.random(1, 10) }}</div>
</template>
```

### 3. 配置 Volar 类型识别

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@hy-app/ui/global"]
  }
}
```

### 4. 配置按需引入（page.json）

```json
{
  "easycom": {
    "custom": {
      "^hy-(.*)": "@hy-app/ui/components/hy-$1/hy-$1.vue"
    }
  }
}
```

### 5. 全局导入样式（uni.scss）

```scss
// uni.scss
@use "@hy-app/ui/index.scss" as *;
```

## 🤝 贡献指南

欢迎大家参与项目开发！如果你有任何问题或更好的建议，欢迎：

- **提交 Issue**：[https://github.com/MrGao-hy/hy-design-uni/issues](https://github.com/MrGao-hy/hy-design-uni/issues)
- **提交 PR**：欢迎 Fork 项目并提交合并请求

## 📄 开源协议

MIT License
