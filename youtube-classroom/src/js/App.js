import GlobalNavbar from './components/GlobalNavBar.js';
import SavedVideoList from './components/SavedVideoList.js';
import VideoSearchModal from './components/VideoSearchModal.js';
import Component from './lib/core/Component.js';
import VideoManager from './lib/model/videoManager.js';
import { getCache, setCache } from './lib/store/cache.js';
import { searchMoreVideo, searchVideo } from './lib/utils/api.js';
import { $ } from './lib/utils/dom.js';

const App = class extends Component {
  initStates() {
    this.videoManager = new VideoManager();
  }

  mountTemplate() {
    const template = `
      <h1 class="classroom-container__title">π©π»βπ» λλ§μ μ νλΈ κ°μμ€ π¨π»βπ»</h1>
    `;

    this.$target.insertAdjacentHTML('afterbegin', template);
  }

  mountChildComponents() {
    new GlobalNavbar($('#app'));
    this.$savedVideoList = new SavedVideoList($('#app'));
    this.$savedVideoList.renderVideos(
      this.videoManager.getSavedVideosByStatus('unwatched'),
    );
    this.$videoSearchModal = new VideoSearchModal($('#app'), {
      isSavedVideo: this.isSavedVideo.bind(this),
    });
  }

  bindEvent() {
    this.bindCustomEvent(this.$target, [
      { eventType: 'openModal', handler: () => this.handleOpenModal() },
      {
        eventType: 'showSavedVideos',
        handler: (e) => this.handleShowSavedVideos(e.detail),
      },
      {
        eventType: 'searchVideo',
        handler: (e) => this.handleSearchVideo(e.detail),
      },
      {
        eventType: 'searchMoreVideo',
        handler: () => this.handleSearchMoreVideo(),
      },
      {
        eventType: 'saveVideo',
        handler: (e) => this.handleSaveVideo(e.detail),
      },
      {
        eventType: 'unsaveVideo',
        handler: (e) => this.handleUnsaveVideo(e.detail),
      },
      {
        eventType: 'toggleVideoStatus',
        handler: (e) => this.handleToggleVideoStatus(e.detail),
      },
    ]);
  }

  handleOpenModal() {
    this.$videoSearchModal.openModal();
  }

  handleShowSavedVideos(navBarStatus) {
    this.$savedVideoList.renderVideos(
      this.videoManager.getSavedVideosByStatus(navBarStatus),
    );
  }

  async handleSearchVideo(keyword) {
    if (keyword === this.latestSearchKeyword) return;

    this.$videoSearchModal.clearVideoList();
    this.videoManager.clearSearchResultVideos();
    this.$videoSearchModal.showSkeletonVideos();

    const { items, nextPageToken } =
      getCache(keyword) ?? (await searchVideo(keyword));

    if (!items) {
      this.$videoSearchModal.renderNoResultPage();
      return;
    }

    if (!getCache(keyword)) {
      setCache(keyword, {
        items,
        nextPageToken,
      });
    }

    this.latestSearchKeyword = keyword;
    this.pageToken = nextPageToken;
    this.videoManager.searchResultVideos = items;
    this.$videoSearchModal.hideSkeletonVideos();
    this.$videoSearchModal.renderVideos(items);
  }

  async handleSearchMoreVideo() {
    this.$videoSearchModal.showSkeletonVideos();

    const { items, nextPageToken } = await searchMoreVideo(
      this.latestSearchKeyword,
      this.pageToken,
    );
    this.pageToken = nextPageToken;
    this.videoManager.searchResultVideos = items;
    this.$videoSearchModal.hideSkeletonVideos();
    this.$videoSearchModal.renderVideos(items);
  }

  handleSaveVideo(videoId) {
    this.videoManager.saveVideo(videoId);
    this.$savedVideoList.renderVideos(
      this.videoManager.getSavedVideosByStatus('unwatched'),
    );
  }

  handleUnsaveVideo(videoId) {
    if (window.confirm('μ λ§λ‘ μ­μ νμκ² μ΄μ?')) {
      const videoStatus = this.videoManager.getVideoStatus(videoId);
      this.videoManager.unsaveVideo(videoId);
      this.$savedVideoList.renderVideos(
        this.videoManager.getSavedVideosByStatus(videoStatus),
      );
    }
  }

  handleToggleVideoStatus(videoId) {
    const prevVideoStatus = this.videoManager.getVideoStatus(videoId);
    this.videoManager.toggleVideoStatus(videoId);
    this.$savedVideoList.renderVideos(
      this.videoManager.getSavedVideosByStatus(prevVideoStatus),
    );
  }

  isSavedVideo(videoId) {
    return this.videoManager.checkVideoSaved(videoId);
  }
};

export default App;
