import { getLocalStorage, setLocalStorage } from '../store/localStorage.js';

const VideoManager = class {
  #searchResultVideos;

  #savedVideos;

  constructor() {
    this.#searchResultVideos = [];
    this.#savedVideos = getLocalStorage('savedVideos') ?? [];
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
    setLocalStorage('savedVideos', this.#savedVideos);
  }

  unsaveVideo(targetVideoId) {
    this.#savedVideos = this.#savedVideos.filter(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId !== targetVideoId,
    );
    setLocalStorage('savedVideos', this.#savedVideos);
  }

  getVideoStatus(targetVideoId) {
    const { status } = this.#savedVideos.find(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );

    return status;
  }

  toggleVideoStatus(targetVideoId) {
    const targetVideo = this.#savedVideos.find(
      ({
        videoInfo: {
          id: { videoId },
        },
      }) => videoId === targetVideoId,
    );
    const oppositeVideoStatus =
      targetVideo.status === 'unwatched' ? 'watched' : 'unwatched';
    targetVideo.status = oppositeVideoStatus;
    setLocalStorage('savedVideos', this.#savedVideos);
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
