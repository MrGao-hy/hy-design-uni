# AGENTS.md - AI 开发助手指引

> 本文件用于帮助 AI 开发助手快速理解 `@hy-app/ui` 组件库的架构、规范和约定，以便在开发、调试或扩展时做出准确的判断。

---

## 项目概述

`@hy-app/ui`（华玥组件库）是一个基于 **Vue 3 + TypeScript + UniApp** 的移动端 UI 组件库，支持多端适配（微信小程序、支付宝小程序、App、H5、鸿蒙等），提供 **80+** 精美组件，支持暗黑模式、国际化（i18n）和自定义主题。

- **包名**：`@hy-app/ui`
- **入口文件**：`index.ts`（导出 libs 目录下的所有模块）
- **组件注册**：`components/index.ts`（全局注册入口，导出 `install` 函数）
- **全局样式**：`index.scss`（聚合所有样式，用户通过 `@use` 引入）
- **类型声明**：`global.d.ts`（Volar/VS Code 组件类型识别）
- **Node 版本要求**：>= 16.14.0
- **开源协议**：MIT

---

## 目录结构

```
src/package/
├── index.ts              # 包入口，re-export libs 下所有模块
├── index.scss            # 样式入口，聚合所有 SCSS
├── global.d.ts           # Volar 全局组件类型声明
├── package.json          # 包配置（uni_modules 平台兼容声明）
├── README.md             # 使用文档
│
├── components/           # 所有 UI 组件（按组件名独立目录）
│   └── hy-xxx/
│       ├── hy-xxx.vue     # 组件主文件
│       ├── props.ts       # 组件 Props 定义
│       ├── typing.d.ts    # 组件类型声明
│       └── index.scss     # 组件局部样式
│
├── libs/                  # 工具库和基础设施
│   ├── api/               # HTTP 请求封装
│   │   └── http.ts
│   ├── common/            # 公共模块（版本控制、任务队列）
│   ├── composables/       # Vue Composables（Hooks）
│   ├── config/            # 全局配置（颜色、图标）
│   ├── css/               # SCSS 基础样式（变量、混入、函数、主题）
│   ├── global/            # 全局注册（Vue Plugin，挂载 $hy 全局属性）
│   ├── locale/            # 国际化（i18n，默认 zh-CN，支持 en-US）
│   ├── typing/            # 全局类型定义（枚举、接口）
│   └── utils/             # 工具函数（单位转换、颜色渐变、日历、Base64 等）
│
└── AGENTS.md              # 本文件
```

---

## 组件开发规范

### 命名约定

| 项目 | 约定 | 示例 |
|------|------|------|
| 组件目录 | `hy-kebab-case` | `hy-button`, `hy-date-picker` |
| 组件文件 | 与目录同名 | `hy-button.vue` |
| 组件注册名 | `HyPascalCase`（全局）/ `<hy-kebab-case>`（模板） | `HyButton` / `<hy-button>` |
| Props 文件 | `props.ts` | 每个组件目录下的 `props.ts` |
| 类型文件 | `typing.d.ts` | 每个组件目录下的 `typing.d.ts` |
| 样式文件 | `index.scss` | 每个组件目录下的 `index.scss` |

### 组件标准结构

每个组件目录应包含以下文件：

```
hy-xxx/
├── hy-xxx.vue        # 必选：组件模板 + 逻辑
├── props.ts          # 必选：defineProps 类型定义
├── typing.d.ts       # 可选：补充类型声明
└── index.scss        # 可选：组件样式
```

### 子组件/辅助组件

部分复杂组件可能包含子组件或辅助文件（如 `hy-calendar` 包含 `header.vue`、`month.vue`），这些文件应放在同一组件目录下。

### 按需引入机制

组件通过 `page.json` 的 `easycom` 规则自动按需引入：

```json
{
  "easycom": {
    "custom": {
      "^hy-(.*)": "@hy-app/ui/components/hy-$1/hy-$1.vue"
    }
  }
}
```

**AI 注意**：创建新组件时，必须确保文件路径符合此规则：`components/hy-{name}/hy-{name}.vue`。

---

## 全局属性（$hy）

通过 `globalRegister` 注册后，所有组件可通过 `this.$hy`（Options API）或 `getCurrentInstance().appContext.config.globalProperties.$hy`（Composition API）访问以下全局方法：

| 方法 | 说明 | 示例 |
|------|------|------|
| `$hy.addUnit(value, unit)` | 添加 CSS 单位 | `$hy.addUnit(10, 'px')` → `'10px'` |
| `$hy.random(min, max)` | 获取随机整数 | `$hy.random(1, 10)` → `3` |
| `$hy.formatTime(timestamp, fmt)` | 时间格式化 | `$hy.formatTime(Date.now(), 'YYYY-mm-dd')` |
| `$hy.bytesToSize(bytes)` | 字节单位转换 | `$hy.bytesToSize(1024)` → `'1KB'` |

---

## 样式体系

### SCSS 层级

| 文件 | 用途 |
|------|------|
| `_vars.scss` | CSS 变量和主题色 |
| `_mixin.scss` | 公共混入（flex 布局、文字省略等） |
| `_function.scss` | SCSS 函数 |
| `_config.scss` | SCSS 配置 |
| `theme.scss` | 主题定义（支持暗黑模式） |
| `common.scss` | 通用样式重置 |
| `index.scss` | 样式总入口，用户在 `uni.scss` 中引入 |

### 使用方式

用户在项目的 `uni.scss` 中添加：

```scss
@use "@hy-app/ui/index.scss" as *;
```

**AI 注意**：新增公共样式变量或混入应放在 `libs/css/` 对应文件中，不要在组件 `index.scss` 中定义全局样式。

---

## 核心模块说明

### composables（组合式函数）

| Hook | 说明 |
|------|------|
| `useToast` | Toast 提示 |
| `useMessage` | 消息通知 |
| `usePopover` | 弹出框控制 |
| `useQueue` | 任务队列管理 |
| `useShare` | 分享功能 |
| `useTouch` | 触摸手势处理 |
| `useShakeService` | 摇一摇功能 |
| `useTranslate` | 平移动画 |

### utils（工具函数）

| 模块 | 说明 |
|------|------|
| `utils.ts` | 通用工具（addUnit、random、formatTime、bytesToSize 等） |
| `colorGradient.ts` | 颜色渐变计算 |
| `calendar.js` | 日历计算 |
| `base64.ts` | Base64 编解码 |
| `inside.ts` | 内部状态管理 |
| `inspect.ts` | 类型检查工具 |
| `address.json` | 中国地址数据（省市区） |

### locale（国际化）

- 默认语言：`zh-CN`
- 支持语言：`zh-CN`、`en-US`
- 扩展方式：`Locale.use('newLang', messageObj)`

### api（HTTP 请求）

封装了 UniApp 的网络请求工具，位于 `libs/api/http.ts`。

---

## 平台兼容性

| 平台 | 支持状态 |
|------|---------|
| Vue 3 Web（Chrome/Safari） | ✅ |
| App（Android/iOS/鸿蒙） | ✅ |
| 微信小程序 | ✅ |
| 支付宝小程序 | ✅ |
| 头条/抖音小程序 | ✅ |
| QQ 小程序 | ✅ |
| 鸿蒙（Harmony） | ✅ |
| Vue 2 | ❌ |
| uni-app x | ❌ |
| 快应用 | ❌ |
| 百度/快手/JD 小程序 | ❌ |

**AI 注意**：修改组件时需考虑跨平台兼容性，避免使用仅特定平台支持的 API（如 `document`、`window` 等 DOM API 在小程序中不可用）。

---

## AI 开发规则

### 修改现有组件时

1. 先阅读组件的 `props.ts` 和 `typing.d.ts`，了解 Props 和类型定义
2. 样式修改优先使用已有的 SCSS 变量和混入（`libs/css/`）
3. 不要修改组件的注册名或文件路径（会破坏 easycom 规则）
4. 保持与现有代码风格一致（中文注释、2 空格缩进、单引号）

### 新增组件时

1. 在 `components/` 下创建 `hy-xxx/` 目录
2. 必须包含 `hy-xxx.vue` 和 `props.ts`
3. 在 `global.d.ts` 中添加 Volar 类型声明
4. 在 `components/index.ts` 中添加导入和注册
5. 样式应使用现有的 SCSS 变量和混入

### 注意事项

- 组件使用 `<script lang="ts" setup>` 语法
- 组件 Props 通过 `defineProps` + 独立 `props.ts` 文件定义类型
- 依赖库：`dayjs`（时间处理），请勿引入其他重依赖
- 全局属性挂在 `$hy` 上，新增全局方法需修改 `libs/global/register-properties.ts`
