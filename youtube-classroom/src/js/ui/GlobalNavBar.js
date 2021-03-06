import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';

const GlobalNavbar = class extends Component {
  mountTemplate() {
    const template = `
    <nav id="gnb" class="nav">
      <button id="unwatched-videos-button" class="button nav__button" data-status="unwatched">
        π₯ μμ²­ λκΈ°μ€
      </button>
      <button id="watched-videos-button" class="button nav__button" data-status="watched">
        β μμ²­ μλ£
      </button>
      <button id="search-modal-button" class="button nav__button search__button">
        π κ²μ
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
