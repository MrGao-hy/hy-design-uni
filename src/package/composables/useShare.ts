interface ShareConfig {
  title?: string;
  path?: string;
  friendImageUrl?: string;
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
