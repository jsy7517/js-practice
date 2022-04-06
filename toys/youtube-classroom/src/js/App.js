import GlobalNavbar from './components/GlobalNavBar.js';
import VideoSearchModal from './components/VideoSearchModal.js';
import Component from './lib/core/Component.js';
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
  }

  handleOpenModal() {
    this.$videoSearchModal.openModal();
  }

  handleSearchVideo(keyword) {
    // TODO: Youtube API 요청
    console.log(keyword);
  }
};

export default App;
