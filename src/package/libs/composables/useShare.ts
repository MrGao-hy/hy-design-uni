/**
 * 全局分享hooks
 * */
interface ShareConfig {
  /**
   * 标题名称
   * */
  title?: string;
  /**
   * 页面路径
   * */
  path?: string;
  /**
   * 分享朋友的封面图片
   * */
  friendImageUrl?: string;
  /**
   * 分享朋友圈的封面图片
   * */
  timelineImageUrl?: string;
}

export const useShare = (config: ShareConfig = {}) => {
  return {
    //分享给好友的处理函数
    onShareAppMessage() {
      return {
        title: config.title,
        path: config.path,
        imageUrl: config.friendImageUrl,
      };
    },

    //分享到朋友圈的处理函数
    onShareTimeline() {
      return {
        title: config.title,
        imageUrl: config.timelineImageUrl,
      };
    },
  };
};
