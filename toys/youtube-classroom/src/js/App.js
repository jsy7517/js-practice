import GlobalNavbar from './components/GlobalNavBar.js';
import VideoSearchModal from './components/VideoSearchModal.js';
import Component from './lib/core/Component.js';
import { getCache, setCache } from './lib/store/cache.js';
import { searchMoreVideo, searchVideo } from './lib/utils/api.js';
import { $ } from './lib/utils/dom.js';

const App = class extends Component {
  mountTemplate() {
    const template = `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
    `;

    this.$target.insertAdjacentHTML('afterbegin', template);
  }

  mountChildComponents() {
    new GlobalNavbar($('#app'));
    this.$videoSearchModal = new VideoSearchModal($('#app'));
  }

  bindEvent() {
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
  }

  handleOpenModal() {
    this.$videoSearchModal.openModal();
  }

  async handleSearchVideo(keyword) {
    if (keyword !== this.latestSearchKeyword) {
      this.$videoSearchModal.clearVideoList();
    }

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

    this.$videoSearchModal.hideSkeletonVideos();
    this.$videoSearchModal.renderVideos(items);
  }

  handleSaveVideo(videoId) {
    console.log(`save ${videoId}`);
    // this.$unwatchedVideoList.renderVideos();
  }

  handleUnsaveVideo(videoId) {
    console.log(`unsave ${videoId}`);
    // this.$unwatchedVideoList.renderVideos();
  }
};

export default App;
