import type { IEmptyIcon } from "./typing";

const url = "https://registry.npmmirror.com/wot-design-uni-assets/*/files/";

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
    icon: url + "png",
  },
  network: {
    desc: "没有网络",
    icon: url + "network.png",
  },
  order: {
    desc: "订单为空",
    icon: url + "png",
  },
  coupon: {
    desc: "没有优惠券",
    icon: url + "png",
  },
  favor: {
    desc: "暂无收藏",
    icon: url + "collect.png",
  },
  history: {
    desc: "无历史记录",
    icon: url + "png",
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
    icon: url + "halo.png",
  },
};

export default emptyIcon;
