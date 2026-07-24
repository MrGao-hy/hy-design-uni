# AGENTS.md - AI 开发助手指引

> 本文件用于帮助 AI 开发助手快速理解 `@hy-app/ui` 组件库的架构、规范和约定，以便在开发、调试或扩展时做出准确的判断。

---

## 项目概述

`@hy-app/ui`（华玥组件库）是一个基于 **Vue 3 + TypeScript + UniApp** 的移动端 UI 组件库，支持多端适配（微信小程序、支付宝小程序、App、H5、鸿蒙等），提供 **88+** 精美组件，支持暗黑模式、国际化（i18n）和自定义主题。

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

| 项目       | 约定                                              | 示例                           |
| ---------- | ------------------------------------------------- | ------------------------------ |
| 组件目录   | `hy-kebab-case`                                   | `hy-button`, `hy-date-picker`  |
| 组件文件   | 与目录同名                                        | `hy-button.vue`                |
| 组件注册名 | `HyPascalCase`（全局）/ `<hy-kebab-case>`（模板） | `HyButton` / `<hy-button>`     |
| Props 文件 | `props.ts`                                        | 每个组件目录下的 `props.ts`    |
| 类型文件   | `typing.d.ts`                                     | 每个组件目录下的 `typing.d.ts` |
| 样式文件   | `index.scss`                                      | 每个组件目录下的 `index.scss`  |

**AI 注意**：组件注册名必须统一使用 `Hy` 前缀，禁止使用 `Yk` 或其他前缀。

### 组件标准结构

每个组件目录应包含以下文件：

```
hy-xxx/
├── hy-xxx.vue        # 必选：组件模板 + 逻辑
├── props.ts          # 必选：defineProps 类型定义
├── typing.d.ts       # 可选：补充类型声明
└── index.scss        # 可选：组件样式
```

**AI 注意**：`props.ts` 是必选文件，当前 `hy-safe-bottom` 和 `hy-watermark` 缺少该文件，需尽快补全。

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

| 方法                             | 说明          | 示例                                       |
| -------------------------------- | ------------- | ------------------------------------------ |
| `$hy.addUnit(value, unit)`       | 添加 CSS 单位 | `$hy.addUnit(10, 'px')` → `'10px'`         |
| `$hy.random(min, max)`           | 获取随机整数  | `$hy.random(1, 10)` → `3`                  |
| `$hy.formatTime(timestamp, fmt)` | 时间格式化    | `$hy.formatTime(Date.now(), 'YYYY-mm-dd')` |
| `$hy.bytesToSize(bytes)`         | 字节单位转换  | `$hy.bytesToSize(1024)` → `'1KB'`          |

---

## 样式体系

### SCSS 层级

| 文件             | 用途                                 |
| ---------------- | ------------------------------------ |
| `_vars.scss`     | CSS 变量和主题色                     |
| `_mixin.scss`    | 公共混入（flex 布局、文字省略等）    |
| `_function.scss` | SCSS 函数                            |
| `_config.scss`   | SCSS 配置                            |
| `theme.scss`     | 主题定义（支持暗黑模式）             |
| `common.scss`    | 通用样式重置                         |
| `index.scss`     | 样式总入口，用户在 `uni.scss` 中引入 |

### 使用方式

用户在项目的 `uni.scss` 中添加：

```scss
@use '@hy-app/ui/index.scss' as *;
```

**AI 注意**：新增公共样式变量或混入应放在 `libs/css/` 对应文件中，不要在组件 `index.scss` 中定义全局样式。

### 组件样式引入规范

每个组件的样式应放在独立的 `index.scss` 文件中，并在 `.vue` 文件的 `<style>` 块中通过 `@use` 引入：

```vue
<style lang="scss">
@use './index.scss';
</style>
```

**规范要求**：

- 使用**单引号**（`'`）而非双引号（`"`）
- 末尾必须添加**分号**（`;`）
- 样式文件中应使用 `@use '../../libs/css/mixin' as *;` 和 `@use '../../libs/css/theme' as *;` 引入公共混入和主题变量
- 组件样式应使用 BEM 命名规范，通过 mixin 中的 `@include b()`, `@include e()`, `@include m()` 定义

---

## 核心模块说明

### composables（组合式函数）

| Hook              | 说明         |
| ----------------- | ------------ |
| `useToast`        | Toast 提示   |
| `useMessage`      | 消息通知     |
| `usePopover`      | 弹出框控制   |
| `useQueue`        | 任务队列管理 |
| `useShare`        | 分享功能     |
| `useTouch`        | 触摸手势处理 |
| `useShakeService` | 摇一摇功能   |
| `useTranslate`    | 平移动画     |

### utils（工具函数）

| 模块               | 说明                                                    |
| ------------------ | ------------------------------------------------------- |
| `utils.ts`         | 通用工具（addUnit、random、formatTime、bytesToSize 等） |
| `colorGradient.ts` | 颜色渐变计算                                            |
| `calendar.js`      | 日历计算                                                |
| `base64.ts`        | Base64 编解码                                           |
| `inside.ts`        | 内部状态管理                                            |
| `inspect.ts`       | 类型检查工具                                            |
| `address.json`     | 中国地址数据（省市区）                                  |

### locale（国际化）

- 默认语言：`zh-CN`
- 支持语言：`zh-CN`、`en-US`
- 扩展方式：`Locale.use('newLang', messageObj)`

### api（HTTP 请求）

封装了 UniApp 的网络请求工具，位于 `libs/api/http.ts`。

---

## 平台兼容性

### 支持平台

| 平台                       | 支持状态 |
| -------------------------- | -------- |
| Vue 3 Web（Chrome/Safari） | ✅       |
| App（Android/iOS/鸿蒙）    | ✅       |
| 微信小程序                 | ✅       |
| 支付宝小程序               | ✅       |
| 头条/抖音小程序            | ✅       |
| QQ 小程序                  | ✅       |
| 鸿蒙（Harmony）            | ✅       |
| Vue 2                      | ❌       |
| uni-app x                  | ❌       |
| 快应用                     | ❌       |
| 百度/快手/JD 小程序        | ❌       |

### 禁止使用的 API（小程序环境不可用）

以下 API 在小程序环境中不可用或行为不一致，**禁止直接使用**：

| 禁止 API                                         | 危害                              | 推荐替代方案                                      |
| ------------------------------------------------ | --------------------------------- | ------------------------------------------------- |
| `window.*`                                       | 小程序无 window 对象              | 使用条件编译 `// #ifdef H5` 包裹                  |
| `document.*`                                     | 小程序无 DOM                      | 使用条件编译或 `uni.createSelectorQuery()`        |
| `localStorage` / `sessionStorage`                | 小程序使用 `uni.setStorageSync()` | `uni.setStorageSync()` / `uni.getStorageSync()`   |
| `requestAnimationFrame` / `cancelAnimationFrame` | 小程序不保证全局可用              | 定义基于 `setTimeout` 的 polyfill，或使用条件编译 |
| `IntersectionObserver`                           | 小程序需通过 uni API 创建         | `uni.createIntersectionObserver()`                |
| `ResizeObserver`                                 | 小程序不支持                      | 使用 `uni.createSelectorQuery()` 轮询             |
| `MutationObserver`                               | 小程序不支持                      | 使用条件编译 `// #ifdef H5` 包裹                  |
| `getBoundingClientRect()`                        | 小程序无 DOM API                  | `uni.createSelectorQuery().boundingClientRect()`  |
| `HTMLElement` / `Node` / `Event` 等 DOM 类型     | 类型不准确，编译后擦除            | 仅作为类型注解使用时可接受，但不影响运行时        |
| `$el.querySelector()`                            | 小程序 `$el` 不是 DOM 元素        | `uni.createSelectorQuery()`                       |

### 条件编译规范

使用条件编译时必须成对出现，且注释与代码之间不得有空行：

```vue
<script lang="ts" setup>
// #ifdef H5
window.open(url)
// #endif

// #ifdef APP-PLUS
// 仅在 App 平台执行的代码
// #endif

// #ifdef MP-WEIXIN
// 仅在微信小程序执行的代码
// #endif
</script>
```

**AI 注意**：修改组件时需考虑跨平台兼容性，避免使用仅特定平台支持的 API。所有涉及 DOM 的操作必须使用条件编译保护或 uni-app 提供的替代 API。

---

## 代码风格规范

### 脚本语法

- 组件必须使用 `<script lang="ts" setup>` 语法
- 不允许使用 Options API 风格（除非有特殊理由）

### 引号风格

- 字符串必须使用**单引号**（`'`）
- 模板字符串使用反引号（`` ` ``）
- 禁止使用双引号（`"`）

### 缩进风格

- 使用**2 空格**缩进
- 禁止使用 Tab

### 注释语言

- 代码注释必须使用**中文**
- 注释应简洁明了，说明代码意图而非重复代码

### Props 定义

- Props 必须通过独立的 `props.ts` 文件定义类型
- 在 `.vue` 文件中通过 `defineProps(stickyProps)` 引入
- 禁止在 `.vue` 文件中直接定义 Props

### 类型注解

- 使用 TypeScript 类型注解时，避免过度使用 `any`
- emit 事件类型应在 `typing.d.ts` 中定义 `IXXXEmits` 接口

---

## TypeScript 类型检查

### 检查命令

提交代码前必须运行 TypeScript 类型检查：

```bash
npm run type-check
```

### 错误处理

- 所有类型错误必须修复
- 禁止使用 `// @ts-ignore` 或 `// @ts-expect-error` 跳过错误，除非有充分理由并添加注释说明

### 类型声明规范

- `global.d.ts` 中必须为每个组件添加 Volar 类型声明
- 声明路径必须与实际组件路径一致
- 禁止引用不存在的组件路径

---

## 测试规范

### 测试框架

当前项目使用 `@dcloudio/uni-automator` 进行自动化测试，但尚未建立完整的测试体系。

### 测试要求

- 新增组件时应编写对应的测试用例
- 测试用例应覆盖组件的主要功能和边界情况
- 测试文件应放在组件目录下，命名为 `hy-xxx.test.ts`

### 测试命令

项目尚未配置测试脚本，待后续完善。

---

## AI 开发规则

### 组件质量原则

作为组件库专家，在修改或创建组件时必须遵循以下原则：

**性能优化**

- 使用 `computed` 缓存派生状态，避免在模板中进行复杂计算
- 滚动/触摸事件处理中避免频繁写入响应式对象，使用节流或 `requestAnimationFrame`
- 大型列表使用虚拟滚动或分页加载，避免一次性渲染过多 DOM
- 对非关键渲染的子组件使用异步组件或懒加载
- 减少不必要的 `watch`，优先使用 `computed` 或事件驱动
- 避免在模板中频繁调用方法，提取为计算属性

**复用性**

- 将可复用逻辑提取到 `libs/composables/` 中的 composable 函数
- 优先使用 `libs/css/` 中已有的 SCSS 变量和混入，避免重复定义
- 共享通用的 Props 模式，可通过工厂函数或类型别名复用
- 相似功能的组件考虑抽象为基础组件 + 配置项的形式
- 工具函数统一放在 `libs/utils/` 中，避免在组件内重复实现

**减少代码冗余**

- 创建新组件前检查是否已有相似组件可扩展或改造
- 避免重复声明已存在于 `libs/utils/` 中的工具函数
- 样式优先使用公共变量和混入，避免硬编码值
- 使用类型别名和接口复用 TypeScript 类型定义
- 相似逻辑优先通过组合而非复制粘贴实现
- 定期清理未使用的变量、导入和代码分支

### 修改现有组件时

1. 先阅读组件的 `props.ts` 和 `typing.d.ts`，了解 Props 和类型定义
2. 样式修改优先使用已有的 SCSS 变量和混入（`libs/css/`）
3. 不要修改组件的注册名或文件路径（会破坏 easycom 规则）
4. 保持与现有代码风格一致（中文注释、2 空格缩进、单引号）
5. 检查多端兼容性，确保修改后的代码在所有平台都能正常运行
6. 运行 `npm run type-check` 确保无类型错误

### 新增组件时

1. 在 `components/` 下创建 `hy-xxx/` 目录
2. 必须包含 `hy-xxx.vue` 和 `props.ts`
3. 在 `global.d.ts` 中添加 Volar 类型声明
4. 在 `components/index.ts` 的 `install` 函数中添加注册
5. 在 `components/index.ts` 的 `export` 中添加导出
6. 样式应使用现有的 SCSS 变量和混入
7. 运行 `npm run type-check` 确保无类型错误

**AI 注意**：新增组件时必须确保三处同步更新：

- `components/index.ts` 的 `install` 函数
- `components/index.ts` 的 `export` 语句
- `global.d.ts` 的类型声明

### 注意事项

- 组件使用 `<script lang="ts" setup>` 语法
- 组件 Props 通过 `defineProps` + 独立 `props.ts` 文件定义类型
- 依赖库：`dayjs`（时间处理），请勿引入其他重依赖
- 全局属性挂在 `$hy` 上，新增全局方法需修改 `libs/global/register-properties.ts`
- 组件注册名必须统一使用 `Hy` 前缀，禁止使用 `Yk` 前缀
- 禁止在组件中直接使用 DOM API，必须使用 uni-app 提供的替代方案
