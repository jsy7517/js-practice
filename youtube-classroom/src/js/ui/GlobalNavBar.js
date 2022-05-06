import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';

const GlobalNavbar = class extends Component {
  mountTemplate() {
    const template = `
    <nav id="gnb" class="nav">
      <button id="unwatched-videos-button" class="button nav__button" data-status="unwatched">
        🖥 시청 대기중
      </button>
      <button id="watched-videos-button" class="button nav__button" data-status="watched">
        ✅ 시청 완료
      </button>
      <button id="search-modal-button" class="button nav__button search__button">
        🔍 검색
      </button>
    </nav>
    `;
    this.$target.insertAdjacentHTML('beforeend', template);
    this.currentNavBarStatus = 'unwatched';
  }

  bindEvent() {
    $('#gnb').addEventListener('click', (e) => this.handleClickNavbar(e));
  }

  handleClickNavbar({ target }) {
    if (target.id.includes('videos-button')) {
      const { status } = target.dataset;
      if (status === this.currentNavBarStatus) return;

      this.dispatchShowSavedVideos(status);
      this.currentNavBarStatus = status;
      return;
    }

    if (target.id === 'search-modal-button') {
      this.dispatchOpenModal();
    }
  }

  dispatchShowSavedVideos(navBarStatus) {
    this.dispatchCustomEvent($('#app'), 'showSavedVideos', navBarStatus);
  }

  dispatchOpenModal() {
    this.dispatchCustomEvent($('#app'), 'openModal');
  }
};

export default GlobalNavbar;
