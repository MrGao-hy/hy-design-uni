import type { IEmptyIcon } from "./typing";

const url = "https://hy-design-uni.oss-cn-hangzhou.aliyuncs.com/image/";

const emptyIcon: IEmptyIcon = {
  content: {
    desc: "暂无内容",
    icon: url + "content.png",
  },
  search: {
    desc: "没有搜索结果",
    icon: url + "search.png",
  },
  address: {
    desc: "没有收货地址",
    icon: url + "address.png",
  },
  network: {
    desc: "没有网络",
    icon: url + "network.png",
  },
  order: {
    desc: "订单为空",
    icon: url + "order.png",
  },
  coupon: {
    desc: "没有优惠券",
    icon: url + "coupon.png",
  },
  collect: {
    desc: "暂无收藏",
    icon: url + "collect.png",
  },
  history: {
    desc: "无历史记录",
    icon: url + "history.png",
  },
  message: {
    desc: "消息列表为空",
    icon: url + "message.png",
  },
  comment: {
    desc: "暂无评论",
    icon: url + "comment.png",
  },
  integral: {
    desc: "暂无积分",
    icon: url + "integral.png",
  },
  card: {
    desc: "暂无银行卡",
    icon: url + "card.png",
  },
  notification: {
    desc: "暂无通知",
    icon: url + "notification.png",
  },
  shop: {
    desc: "暂无购物车",
    icon: url + "shop.png",
  },
  activity: {
    desc: "暂无活动",
    icon: url + "activity.png",
  },
  loading: {
    desc: "加载中",
    icon: url + "loading.png",
  },
};

export default emptyIcon;
