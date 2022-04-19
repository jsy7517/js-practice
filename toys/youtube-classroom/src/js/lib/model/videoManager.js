const VideoManager = class {
  #searchResultVideos;

  #savedVideos;

  constructor() {
    this.#searchResultVideos = [];
    this.#savedVideos = [];
  }

  saveVideo(targetVideoId) {
    const targetVideoInfo = this.#searchResultVideos.find(
      ({ id: { videoId } }) => videoId === targetVideoId,
    );

    this.#savedVideos = [
      ...this.#savedVideos,
      {
        videoInfo: targetVideoInfo,
        status: 'unwatched',
      },
    ];
  }

  unsaveVideo(targetVideoId) {
    this.#savedVideos = this.#savedVideos.filter(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId !== targetVideoId,
    );
  }

  getVideoStatus(targetVideoId) {
    const targetVideoInfo = this.#savedVideos.find(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );
    console.log(targetVideoInfo);
    return '';
  }

  toggleVideoStatus(targetVideoId) {
    const targetVideoInfo = this.#savedVideos.find(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );
    const oppositeVideoStatus =
      targetVideoInfo.status === 'unwatched' ? 'watched' : 'unwatched';
    targetVideoInfo.status = oppositeVideoStatus;
  }

  checkVideoSaved(targetVideoId) {
    return this.#savedVideos.some(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );
  }

  clearSearchResultVideos() {
    this.#searchResultVideos = [];
  }

  getSavedVideosByStatus(videoStatus) {
    return this.#savedVideos.filter(({ status }) => status === videoStatus);
  }

  set searchResultVideos(videos) {
    this.#searchResultVideos = [...this.#searchResultVideos, ...videos];
  }
};

export default VideoManager;
