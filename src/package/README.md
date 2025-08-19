## 在线使用文档地址
[华玥组件库文档(需要翻墙)](https://hy-component-docs.vercel.app/)
[华玥组件库文档(国内地址)](https://www.gxh151.top)

## H5测试页面地址
[华玥组件库dome(需要翻墙)](https://hy-design-uni.vercel.app/#/)

## 安装教程

```angular2html
<!--只支持vue3+uniapp的项目-->
pnpm install hy-app

node版本 >= 16.14.*
```

## 如何再div里面使用方法
```javascript
// main.ts使用方法
import { globalRegister } from "hy-app";
import { createSSRApp } from "vue";
export function createApp () {
    const app = createSSRApp(App);
    app.use(globalRegister);
    return {
        app,
    };
}
```
```vue
<template>
  <!-- 获取0-10之间的随机数 -->
  <div>{{ $hy.random(1,10) }}</div>
</template>
```

## 在小程序里面配置全局组件
```json
{
  "easycom": {
    "custom": {
      "^hy-(.*)": "hy-app/components/hy-$1/hy-$1.vue"
    }
  }
}
```
