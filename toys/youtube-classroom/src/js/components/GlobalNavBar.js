import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';

const GlobalNavbar = class extends Component {
  mountTemplate() {
    const template = `
    <nav id="gnb" class="nav">
      <button id="unwatched-videos-button" class="button nav__button">
        🖥 시청 대기중
      </button>
      <button id="watched-videos-button" class="button nav__button">
        ✅ 시청 완료
      </button>
      <button id="search-modal-button" class="button nav__button search__button">
        🔍 검색
      </button>
    </nav>
    `;
    this.$target.insertAdjacentHTML('beforeend', template);
  }

  bindEvent() {
    $('#gnb').addEventListener('click', (e) => this.handleClickNavbar(e));
  }

  handleClickNavbar({ target: { id } }) {
    switch (id) {
      case 'unwatched-videos-button':
        this.dispatchRenderUnwatchedVideos();
        break;
      case 'watched-videos-button':
        this.dispatchRenderWatchedVideos();
        break;
      case 'search-modal-button':
        this.dispatchOpenModal();
        break;
      default:
        break;
    }
  }

  dispatchRenderUnwatchedVideos() {}

  dispatchRenderWatchedVideos() {}

  dispatchOpenModal() {
    this.dispatchCustomEvent($('#app'), 'openModal');
  }
};

export default GlobalNavbar;
