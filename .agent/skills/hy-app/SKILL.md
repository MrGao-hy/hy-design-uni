---
name: 'hy-app'
description: '基于@hy-app/ui组件库的uni-app开发辅助技能。当用户在uni-app项目中需要创建页面、组件、表单、布局、接口请求等开发任务时自动触发。负责环境检查、组件安装配置、代码规范生成。'
---

# hy-app 组件开发技能

## 一、环境检查与初始化

在开始任何开发任务之前，**必须先执行以下检查步骤**：

### 1.1 检查 @hy-app/ui 组件库是否已安装

检查项目根目录 `package.json` 中是否存在 `@hy-app/ui`。如果没有，执行：

```bash
pnpm add @hy-app/ui
# 或
npm install @hy-app/ui
```

### 1.2 检查样式引入

在 `uni.scss` 或全局入口文件中，确认是否引入了 hy-app 的样式文件：

```vue
<style lang="scss">
@use '@hy-app/ui/index.scss' as *;
</style>
```

如果没有引入，**询问用户是否添加**。

### 1.3 检查 easycom 配置

在 `pages.config.ts` 中检查是否有 easycom 自动导入配置：

```ts
easycom: {
    autoscan: true,
    custom: {
        '^hy-(.*)': '@hy-app/ui/components/hy-$1/hy-$1.vue'
    }
}
```

如果没有配置，**询问用户是否要添加**。

### 1.4 检查公共根页面

检查项目中是否存在公共根页面组件（如 `the-root-page.vue`）。该组件应包含：

- `<hy-config-provider>` 主题配置
- `<hy-toast>` 全局提示
- `<slot />` 插槽用于包裹页面内容

**公共根页面标准模板**：

```vue
<template>
    <hy-config-provider
        :theme-color="color"
        :theme="darkMode"
        :custom-style="customStyle"
        :custom-class="`${customClass} custom-class`"
    >
        <slot />
        <hy-toast></hy-toast>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { CSSProperties } from 'vue'

interface IProps {
    customStyle?: CSSProperties
    customClass?: string
}

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const props = withDefaults(defineProps<IProps>(), {})
</script>
```

**如果用户项目中没有公共根页面**：

1. 先询问用户是否要创建公共根页面，并让所有页面都使用 `<the-root-page>` 包裹
2. 如果用户点击 **否**，则在当前页面直接写入 `<hy-toast>` 和 `<hy-config-provider>`

### 1.5 检查 HTTP 拦截器

检查 `src/api/request.ts`（或类似路径）是否存在 HTTP 请求拦截器。

**如果用户还没有创建拦截器**，使用 `@hy-app/ui` 提供的 `Http` 类创建：

```ts
import { Http } from '@hy-app/ui'

const http = new Http()

// 基础配置
http.config = {
    baseURL: 'https://your-api-domain.com',
    url: 'https://your-api-domain.com',
    timeout: 10000
}

// 请求拦截器
http.interceptor.request((conf) => {
    const token = uni.getStorageSync('token')
    if (token) {
        conf.header = {
            ...conf.header,
            Authorization: `Bearer ${token}`
        }
    }
    return conf
})

// 响应拦截器
http.interceptor.response(
    (response) => {
        const res: any = response.data
        if (res && typeof res === 'object' && response.statusCode === 200) {
            if (res.code === 200) {
                return res.data
            } else {
                const isLoginInterception = res.code === 401
                if (isLoginInterception) {
                    uni.navigateTo({ url: '/pages/login/Index' })
                }
                uni.showToast({ title: res.message || '请求错误', icon: 'none' })
                return Promise.reject(res.message)
            }
        }
        return Promise.reject(response)
    },
    (error) => {
        uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
        return Promise.reject(error)
    }
)

export default http
```

---

## 二、组件使用规范

### 2.1 组件查询规范

在生成代码前，**必须先通过 MCP 工具查询组件文档**。

> **重要**：调用 MCP 组件查询工具时，`componentName` 参数**必须去掉 `hy-` 前缀并转为 PascalCase 大驼峰命名**，否则搜索不到组件。例如：
>
> - `hy-button` → 传 `Button`
> - `hy-count-down` → 传 `CountDown`
> - `hy-form-item` → 传 `FormItem`

| MCP 工具                   | 用途             | 参数                                                                |
| -------------------------- | ---------------- | ------------------------------------------------------------------- |
| `search_components`        | 搜索组件         | `query`(关键词), `category`(分类)                                   |
| `get_component_api`        | 获取组件API文档  | `componentName`(**去掉hy-前缀**), `section`(props/events/slots/all) |
| `get_component_examples`   | 获取组件示例代码 | `componentName`(**去掉hy-前缀**), `feature`(功能关键词)             |
| `get_hook_doc`             | 获取 Hook 文档   | `name`(如 useToast, useMessage)                                     |
| `get_tool_doc`             | 获取工具函数文档 | `name`(如 http, throttle)                                           |
| `get_guide`                | 获取指南文档     | `topic`(theme/locale/style/intro)                                   |
| `validate_component_usage` | 验证组件用法     | `componentName`(**去掉hy-前缀**), `code`                            |
| `check_platform_support`   | 检查平台兼容性   | `componentName`(**去掉hy-前缀**), `platform`                        |

### 2.2 强制组件规范

| 场景      | 必须使用的组件            | 说明                                    |
| --------- | ------------------------- | --------------------------------------- |
| 表单      | `hy-form`                 | 所有表单必须包裹在 `<hy-form>` 中       |
| 弹性布局  | `hy-flex`                 | 使用 `<hy-flex>` 替代手写 flex 样式     |
| 容器/卡片 | `hy-card`                 | 列表、内容块使用 `<hy-card>` 包裹       |
| 提示消息  | `hy-toast` + `useToast`   | 通过 Hook 调用，模板中放置 `<hy-toast>` |
| 确认弹窗  | `hy-modal` + `useMessage` | 通过 Hook 调用，模板中放置 `<hy-modal>` |
| 分享功能  | `useShare`                | 小程序分享使用 Hook                     |

### 2.3 组件列表

#### 基础组件

| 组件名       | 说明                             |
| ------------ | -------------------------------- |
| `hy-button`  | 按钮组件，支持多种类型/形状/尺寸 |
| `hy-badge`   | 徽标数组件，用于消息数量提示     |
| `hy-icon`    | 图标组件                         |
| `hy-image`   | 图片组件，支持懒加载/模式/圆角   |
| `hy-tag`     | 标签组件                         |
| `hy-text`    | 文本组件                         |
| `hy-price`   | 价格展示组件                     |
| `hy-loading` | 加载组件                         |

#### 表单组件

| 组件名               | 说明                           |
| -------------------- | ------------------------------ |
| `hy-form`            | **表单容器**，所有表单必须使用 |
| `hy-form-item`       | 表单项组件                     |
| `hy-form-group`      | 表单分组组件                   |
| `hy-input`           | 输入框组件                     |
| `hy-textarea`        | 多行输入框                     |
| `hy-checkbox`        | 复选框                         |
| `hy-checkbox-group`  | 复选框组                       |
| `hy-checkbox-item`   | 复选框项                       |
| `hy-radio`           | 单选框                         |
| `hy-switch`          | 开关组件                       |
| `hy-picker`          | 选择器组件                     |
| `hy-datetime-picker` | 日期时间选择器                 |
| `hy-cascader`        | 级联选择器                     |
| `hy-calendar`        | 日历组件                       |
| `hy-code-input`      | 验证码输入框                   |
| `hy-number-step`     | 数字步进器                     |
| `hy-slider`          | 滑块组件                       |
| `hy-upload`          | 上传组件                       |
| `hy-rate`            | 评分组件                       |
| `hy-search`          | 搜索组件                       |
| `hy-address-picker`  | 地址选择器                     |

#### 布局组件

| 组件名         | 说明                                 |
| -------------- | ------------------------------------ |
| `hy-card`      | **卡片容器**，用于统一风格的列表条目 |
| `hy-flex`      | **弹性布局**，替代手写 flex          |
| `hy-grid`      | 宫格布局                             |
| `hy-cell`      | 单元格组件                           |
| `hy-cell-item` | 单元格项                             |
| `hy-divider`   | 分割线                               |
| `hy-line`      | 线条                                 |
| `hy-waterfall` | 瀑布流布局                           |
| `hy-sticky`    | 粘性定位                             |

#### 反馈组件

| 组件名            | 说明                                  |
| ----------------- | ------------------------------------- |
| `hy-toast`        | 轻提示，配合 `useToast` Hook 使用     |
| `hy-modal`        | 模态弹窗，配合 `useMessage` Hook 使用 |
| `hy-notify`       | 通知栏                                |
| `hy-popup`        | 弹出层                                |
| `hy-overlay`      | 遮罩层                                |
| `hy-action-sheet` | 操作菜单                              |
| `hy-dropdown`     | 下拉菜单                              |
| `hy-tooltip`      | 文字提示                              |
| `hy-empty`        | 空状态                                |
| `hy-skeleton`     | 骨架屏                                |
| `hy-loading`      | 加载中                                |

#### 导航组件

| 组件名           | 说明       |
| ---------------- | ---------- |
| `hy-navbar`      | 导航栏     |
| `hy-tabbar`      | 底部导航栏 |
| `hy-tabbar-item` | 底部导航项 |
| `hy-tabs`        | 标签页     |
| `hy-steps`       | 步骤条     |
| `hy-index-bar`   | 索引栏     |
| `hy-pagination`  | 分页       |
| `hy-subsection`  | 分段器     |

#### 其他组件

| 组件名               | 说明                          |
| -------------------- | ----------------------------- |
| `hy-avatar`          | 头像组件                      |
| `hy-swiper`          | 轮播组件                      |
| `hy-list`            | 列表组件（下拉刷新/上拉加载） |
| `hy-scroll-list`     | 横向滚动列表                  |
| `hy-swipe-action`    | 滑动操作                      |
| `hy-float-button`    | 悬浮按钮                      |
| `hy-back-top`        | 返回顶部                      |
| `hy-submit-bar`      | 提交栏                        |
| `hy-folding-panel`   | 折叠面板                      |
| `hy-count-down`      | 倒计时                        |
| `hy-count-to`        | 数字滚动                      |
| `hy-rolling-num`     | 滚动数字                      |
| `hy-read-more`       | 展开阅读更多                  |
| `hy-line-progress`   | 线性进度条                    |
| `hy-qrcode`          | 二维码                        |
| `hy-signature`       | 手写签名                      |
| `hy-watermark`       | 水印                          |
| `hy-coupon`          | 优惠券                        |
| `hy-config-provider` | 全局配置 provider             |
| `hy-transition`      | 过渡动画                      |
| `hy-parse`           | 富文本解析                    |
| `hy-keyboard`        | 自定义键盘                    |
| `hy-status-bar`      | 状态栏                        |
| `hy-warn`            | 警告提示                      |
| `hy-popover`         | 气泡弹出框                    |
| `hy-check-button`    | 选择按钮                      |
| `hy-table`           | 表格组件                      |

---

## 三、Hook / 组合式函数

所有 Hook 从 `@hy-app/ui`（npm）导入：

```ts
import {
    useToast,
    useMessage,
    useShare,
    usePopover,
    useQueue,
    useShakeService,
    useTranslate,
    useTouch
} from '@hy-app/ui'
```

### 3.1 useToast - 轻提示

**模板中必须放置 `<hy-toast />`**

```ts
import { useToast } from '@hy-app/ui'
const toast = useToast()

toast.show('默认提示')
toast.info('信息提示')
toast.success('成功提示')
toast.error('错误提示')
toast.warning('警告提示')
toast.primary('主题提示')
toast.loading('加载中...')
toast.close() // 关闭所有提示
```

### 3.2 useMessage - 消息弹窗

**模板中必须放置 `<hy-modal />`**

```ts
import { useMessage } from '@hy-app/ui'
const message = useMessage()

// 警告弹窗
const result = await message.alert('操作成功') // 返回 true

// 确认弹窗
const confirmed = await message.confirm('确定要删除吗？') // true=确认, false=取消

// 高级确认弹窗
const result = await message.confirm({
    title: '删除确认',
    content: '确定要删除这条数据吗？此操作不可恢复。',
    confirmText: '确定删除',
    cancelText: '取消',
    confirmColor: '#ff4d4f',
    confirm: async () => {
        /* 确认回调 */
    }
})
```

### 3.3 useShare - 分享

```ts
import { useShare } from '@hy-app/ui'
const { onShareAppMessage, onShareTimeline } = useShare({
    title: '华玥组件库',
    path: '/pages/index/index',
    friendImageUrl: '/static/share_friend.png',
    timelineImageUrl: '/static/share_timeline.png'
})

defineExpose({ onShareAppMessage, onShareTimeline })
```

### 3.4 Http - 网络请求

```ts
import { Http } from '@hy-app/ui'
const http = new Http()

http.config = { baseURL: 'https://your-api.com' }

// 请求拦截
http.interceptor.request((conf) => {
    // 添加 token 等
    return conf
})

// 响应拦截
http.interceptor.response(
    (response) => {
        /* 成功 */ return response.data
    },
    (error) => {
        /* 失败 */ return Promise.reject(error)
    }
)

// 使用

/**
 * 微信登录接口
 * @param jsCode 微信官方返回的用户登录凭证
 * 开发者需要在开发者服务器后台，使用 code 换取 openid 和 session_key 等信息
 * */
export const wxLoginApi = (jsCode: string): Promise<WxLogin> => {
    return http.post('/wechat/mini/user/login', {
        jsCode
    })
}

/**
 * 微信登录接口
 * @param jsCode 微信官方返回的用户登录凭证
 * 开发者需要在开发者服务器后台，使用 code 换取 openid 和 session_key 等信息
 * */
export const getUsersApi = (jsCode: string): Promise<WxLogin> => {
    return http.get('/user/list')
}
```

---

## 四、SCSS 样式规范

### 4.1 style 标签必须加 lang="scss"

```vue
<style lang="scss">
/* 所有页面样式必须使用 scss */
</style>
```

### 4.2 可用的 SCSS 变量

hy-app 定义了丰富的 SCSS 变量，**优先使用这些变量**：

#### 主题色

```scss
$hy-primary          // 主色 #2979ff
$hy-primary-dark     // 主色-暗
$hy-primary-light    // 主色-亮
$hy-primary-disabled // 主色-禁用
$hy-warning          // 警告色 #ff9900
$hy-success          // 成功色 #19be6b
$hy-error            // 错误色 #fa3534
$hy-info             // 信息色 #909399
```

#### 文字颜色

```scss
$hy-text-color               // 基础文字色
$hy-text-color--2            // 提示文字色
$hy-text-color--3            // 浅色提示
$hy-text-color--4            // 极浅色
$hy-icon-color               // 图标色
$hy-text-color--placeholder  // 占位符色
$hy-text-color--disabled     // 禁用文字色
```

#### 字体大小

```scss
$hy-font-size-xs   // 20rpx
$hy-font-size-sm   // 24rpx
$hy-font-size-base // 28rpx
$hy-font-size-md   // 32rpx
$hy-font-size-lg   // 36rpx
$hy-font-size-xl   // 40rpx
$hy-font-size-xxl  // 48rpx
```

#### 间距

```scss
$hy-border-margin-padding-sm   // 10rpx
$hy-border-margin-padding-base  // 20rpx
$hy-border-margin-padding-lg     // 30rpx
$hy-border-margin-padding-xl     // 48rpx
```

#### 圆角

```scss
$hy-radius-no        // 0
$hy-radius-sm        // 8rpx
$hy-radius-base      // 20rpx
$hy-radius-lg        // 32rpx
$hy-radius-circle    // 50%
```

#### 阴影

```scss
$hy-shadow-sm   // 轻微阴影
$hy-shadow-base  // 基础阴影
$hy-shadow-lg   // 强烈阴影
```

#### 背景色

```scss
$hy-background               // 页面背景 #f8f8f8
$hy-background--2            // 弹窗背景 #fff
$hy-background--container    // 容器背景 #fff
$hy-background--track        // 轨道背景
$hy-background--disabled    // 禁用背景
$hy-background--mask         // 遮罩色
```

### 4.3 可用的 Mixin

```scss
// Flex 布局
@include flex(row); // 横向布局
@include flex(column); // 纵向布局

// 文本截断
@include lineEllipsis; // 单行超出隐藏
@include multiEllipsis(3); // 多行超出隐藏（需设置 width/max-width）

// BEM 命名
@include b('button') {
} // .hy-button
@include e('icon') {
} // .hy-button__icon
@include m('primary') {
} // .hy-button--primary
@include is('active') {
} // .hy-button.is-active
@include pseudo('hover') {
} // .hy-button:hover

// 主题色处理函数
$color-dark: themeColor($hy-primary, '', 'dark');
$color-light: themeColor($hy-primary, '', 'light');
```

### 4.4 公共样式类

```scss
.hy-page         // 页面容器（含 padding 和全屏高度）
.hy-title        // 标题样式（带左侧竖条）
.hy-border       // 全边框
.hy-border__top  // 上边框
.hy-border__bottom // 下边框
```

---

## 五、代码生成规范

### 5.1 页面模板

生成页面时，遵循以下结构：

```vue
<template>
    <the-root-page>
        <!-- 页面内容 -->
        <hy-card>
            <hy-flex direction="column" gap="20rpx">
                <!-- 内容区 -->
            </hy-flex>
        </hy-card>
    </the-root-page>
</template>

<script setup lang="ts">
// 按需导入
</script>

<style lang="scss">
/* 使用 hy-app SCSS 变量 */
</style>
```

### 5.2 表单模板

```vue
<template>
    <the-root-page>
        <hy-form ref="formRef" :model="formData" :rules="rules">
            <hy-card>
                <hy-form-item label="用户名" prop="username">
                    <hy-input v-model="formData.username" placeholder="请输入用户名" />
                </hy-form-item>
                <hy-form-item label="手机号" prop="phone">
                    <hy-input v-model="formData.phone" placeholder="请输入手机号" />
                </hy-form-item>
            </hy-card>
        </hy-form>
    </the-root-page>
</template>
```

### 5.3 列表模板

```vue
<template>
    <the-root-page>
        <hy-list @load="onLoad" :finished="finished">
            <hy-card v-for="item in list" :key="item.id">
                <hy-flex direction="column" gap="10rpx">
                    <hy-text :size="32" :bold="true">{{ item.title }}</hy-text>
                    <hy-text :size="24" color="--hy-text-color--2">{{ item.desc }}</hy-text>
                </hy-flex>
            </hy-card>
        </hy-list>
    </the-root-page>
</template>
```

---

## 六、工作流程

当用户请求开发任务时，按以下顺序执行：

1. **环境检查**：检查 @hy-app/ui 安装、样式引入、easycom 配置
2. **缺失修复**：安装缺失的依赖，添加缺失的配置
3. **MCP 查询**：查询所需组件的 API 文档和示例代码
4. **代码生成**：按照规范生成代码
5. **样式验证**：确保使用 hy-app SCSS 变量和 mixin
6. **Toast 确认**：如果没有公共根页面，询问用户是否创建

---

## 七、注意事项

- 所有 `<style>` 标签必须添加 `lang="scss"` 属性
- `hy-toast` 必须放在页面模板中才能配合 `useToast` 使用，推荐放在公共根页面
- `hy-modal` 必须放在页面模板中才能配合 `useMessage` 使用,推荐放在公共根页面
- 组件属性和事件名请通过 MCP 查询确认，不要猜测
- 优先使用 `hy-flex`、`hy-card` 等布局组件，减少手写 CSS
- SCSS 变量导入通过 `@/package/index.scss` 全局引入，页面中可直接使用
- 如果需要工具函数（如 `throttle`、`deepClone` 等），先通过 MCP `get_tool_doc` 查询文档
