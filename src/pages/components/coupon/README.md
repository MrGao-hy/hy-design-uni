
市场上常用的优惠券组件，支持多种状态展示和丰富的功能配置。

## 引入方式

```js
// 全局引入
import { createApp } from 'vue'
import HyDesignUni from '@/package'
import App from './App.vue'

const app = createApp(App)
app.use(HyDesignUni)
app.mount('#app')

// 局部引入
import { HyCoupon } from '@/package'

export default {
  components: {
    HyCoupon
  }
}
```

## 基本用法

```html
<hy-coupon 
  amount="50" 
  title="新人专享优惠券" 
  subtitle="全场通用，无门槛使用" 
  validity="2023.10.01-2023.12.31" 
  @click="onCouponClick"
/>
```

## 状态展示

```html
<!-- 已使用状态 -->
<hy-coupon 
  amount="30" 
  title="已使用优惠券" 
  status="used" 
  used-date="2023-10-15 14:30"
/>

<!-- 已过期状态 -->
<hy-coupon 
  amount="15" 
  title="已过期优惠券" 
  status="expired" 
  expire-date="2023-10-01"
/>

<!-- 已禁用状态 -->
<hy-coupon 
  amount="25" 
  title="已禁用优惠券" 
  status="disabled" 
  disabled-reason="账户等级不足"
/>
```

## 增强功能

```html
<!-- 专属优惠券 -->
<hy-coupon 
  amount="40" 
  title="专属优惠券" 
  is-exclusive
  limit-per-user="1"
/>

<!-- 显示操作按钮 -->
<hy-coupon 
  amount="60" 
  title="限时优惠券" 
  show-action-button
  @receive="onCouponReceive"
/>

<!-- 自定义按钮文本 -->
<hy-coupon 
  amount="100" 
  title="大额优惠券" 
  show-action-button
  custom-button-text="立即兑换"
/>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| amount | string/number | - | 优惠券金额 |
| title | string | - | 优惠券标题 |
| subtitle | string | '' | 优惠券副标题 |
| status | string | 'normal' | 优惠券状态：normal/disabled/used/expired |
| minSpend | string/number | 0 | 最低消费金额 |
| validity | string | '' | 有效期文本 |
| customStyle | Object | {} | 自定义样式 |
| showRightBorder | boolean | true | 是否显示右侧边框装饰 |
| tooltip | string | '' | 提示文本 |
| showActionButton | boolean | false | 是否显示操作按钮 |
| customButtonText | string | '' | 自定义按钮文本 |
| isExclusive | boolean | false | 是否为专属优惠券 |
| limitPerUser | number | 0 | 每用户限领数量 |
| usedDate | string | '' | 使用日期（已使用状态时显示） |
| expireDate | string | '' | 过期日期（已过期状态时显示） |
| disabledReason | string | '' | 禁用原因（已禁用状态时显示） |
| triggerReceiveOnClick | boolean | true | 点击时是否触发receive事件 |

## Events

| 事件名 | 说明 | 回调参数 |
|-------|------|--------|
| click | 点击优惠券时触发（仅正常状态） | event: { status: CouponStatus } |
| receive | 领取优惠券时触发 | - |
| hover | 鼠标悬停状态改变时触发 | value: boolean |

## 示例页面

请查看 `pages/coupon-demo/index.vue` 了解更多使用示例。

## 注意事项

1. 在移动端环境下，`hover` 相关效果可能表现不同，请根据实际情况调整。
2. 当优惠券金额较大时，建议使用 `customStyle` 调整字体大小以保证显示效果。
3. 在小屏幕设备上，长文本可能会被截断，建议优化文本内容或调整组件宽度。