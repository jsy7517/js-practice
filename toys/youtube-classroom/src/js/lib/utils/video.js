export const getVideoDetail = (video) => {
  const {
    id: { videoId },
    snippet: {
      channelTitle,
      publishTime,
      thumbnails: {
        medium: { url },
      },
      title,
    },
  } = video;

  return {
    videoId,
    thumbnailSrc: url,
    channelTitle,
    publishTime,
    title,
  };
};

export const isSavedVideo = (videoId) => false;
