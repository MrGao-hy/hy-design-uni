# hy-coupon

## Props

| Prop | Description | Type | Values | Default |
|------|-------------|------|--------|---------|
| customStyle | - | [String,  |  | - |
| title | 优惠券标题 | String,  |  | - |
| subTitle | 优惠券副标题 | String,  |  | defaultProps.subTitle |
| type | 优惠券主题类型 | String |  | defaultProps.type |
| status | 优惠券状态 | String |  | defaultProps.status |
| minSpend | 最小消费金额限制 | [String,  |  | defaultProps.minSpend |
| validity | 有效期文本 | String,  |  | defaultProps.validity |
| customStyle | 自定义样式 | Object |  | () => defaultProps.customStyle |
| customClass | 自定义类名 | String,  |  | defaultProps.customClass |
| tooltip | 提示文本 | String,  |  | defaultProps.tooltip |
| showActionButton | 是否显示操作按钮 | Boolean,  |  | defaultProps.showActionButton |
| customButtonText | 自定义按钮文本 | String,  |  | defaultProps.customButtonText |
| isExclusive | 是否为专属优惠券 | Boolean,  |  | defaultProps.isExclusive |
| limitPerUser | 每用户限领数量 | Number,  |  | defaultProps.limitPerUser |
| usedDate | 使用日期（已使用状态时显示） | String,  |  | defaultProps.usedDate |
| expireDate | 过期日期（已过期状态时显示） | String,  |  | defaultProps.expireDate |
| disabledReason | 禁用原因（已禁用状态时显示） | String,  |  | defaultProps.disabledReason |

