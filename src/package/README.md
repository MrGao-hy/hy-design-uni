## 在线使用文档地址
- [华玥组件库文档(需要翻墙)](https://hy-component-docs.vercel.app/)
- [华玥组件库文档(国内旧地址，2025-11-12之后域名过期)](https://www.gxh151.top)
- [华玥组件库文档(国内新地址)](https://www.hy-design-uni.top)

## 📱 移动端预览
<p style="display:flex;gap:24px">
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f37.png" width="200" height="200" />
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f38.jpg" width="200" height="200" />
<img src="https://pic.imgdd.cc/item/690c01291095cbb336f01f36.png" width="200" height="200" />

</p>

## 安装教程

```angular2html
<!-- 只支持vue3+uniapp+ts的项目 -->
pnpm add hy-app

<!-- 没有需要下载 -->
pnpm add dayjs

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

## 在page.json文件里面配置按需引入组件
```json
{
  "easycom": {
    "custom": {
      "^hy-(.*)": "hy-app/components/hy-$1/hy-$1.vue"
    }
  }
}
```
