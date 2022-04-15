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

  changeVideoStatus(targetVideoId, status) {
    const targetVideoInfo = this.#savedVideos.find(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );
    targetVideoInfo.status = status;
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

  get savedVideos() {
    return this.#savedVideos;
  }

  set searchResultVideos(videos) {
    if (!this.#searchResultVideos.length) {
      this.#searchResultVideos = videos;
      return;
    }

    this.#searchResultVideos = [...this.#searchResultVideos, videos];
  }
};

export default VideoManager;
