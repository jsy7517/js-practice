import GlobalNavbar from './components/GlobalNavBar.js';
import SavedVideoList from './components/SavedVideoList.js';
import VideoSearchModal from './components/VideoSearchModal.js';
import Component from './lib/core/Component.js';
import VideoManager from './lib/model/videoManager.js';
import { getCache, setCache } from './lib/store/cache.js';
import { searchMoreVideo, searchVideo } from './lib/utils/api.js';
import { $ } from './lib/utils/dom.js';

const App = class extends Component {
  videoManager;

  constructor($target) {
    super($target);
    this.videoManager = new VideoManager();
  }

  mountTemplate() {
    const template = `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
    `;

    this.$target.insertAdjacentHTML('afterbegin', template);
  }

  mountChildComponents() {
    new GlobalNavbar($('#app'));
    this.$savedVideoList = new SavedVideoList($('#app'));
    this.$videoSearchModal = new VideoSearchModal($('#app'), {
      isSavedVideo: this.isSavedVideo.bind(this),
    });
  }

  bindEvent() {
    this.bindCustomEvent(this.$target, 'showSavedVideos', (e) =>
      this.handleShowSavedVideos(e.detail),
    );
    this.bindCustomEvent(this.$target, 'openModal', () =>
      this.handleOpenModal(),
    );
    this.bindCustomEvent(this.$target, 'searchVideo', (e) =>
      this.handleSearchVideo(e.detail),
    );
    this.bindCustomEvent(this.$target, 'searchMoreVideo', () =>
      this.handleSearchMoreVideo(),
    );
    this.bindCustomEvent(this.$target, 'saveVideo', (e) =>
      this.handleSaveVideo(e.detail),
    );
    this.bindCustomEvent(this.$target, 'unsaveVideo', (e) =>
      this.handleUnsaveVideo(e.detail),
    );
    this.bindCustomEvent(this.$target, 'toggleVideoStatus', (e) =>
      this.handleToggleVideoStatus(e.detail),
    );
  }

  handleShowSavedVideos(navBarStatus) {
    this.$savedVideoList.renderVideos(
      this.videoManager.getSavedVideosByStatus(navBarStatus),
    );
  }

  handleOpenModal() {
    this.$videoSearchModal.openModal();
  }

  async handleSearchVideo(keyword) {
    if (keyword === this.latestSearchKeyword) return;

    this.$videoSearchModal.clearVideoList();
    this.videoManager.clearSearchResultVideos();
    this.$videoSearchModal.showSkeletonVideos();

    const { items, nextPageToken } =
      getCache(keyword) ?? (await searchVideo(keyword));

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
    if (window.confirm('정말로 삭제하시겠어요?')) {
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
