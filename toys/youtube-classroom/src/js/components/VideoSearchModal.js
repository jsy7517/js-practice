import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';
import { getVideoDetail } from '../lib/utils/video.js';

const VideoSearchModal = class extends Component {
  mountTemplate() {
    const template = `
    <dialog class="modal-container hide">
      <div class="dimmer"></div>
      <div
        class="search-modal"
        role="dialog"
        aria-labelledby="search-modal-title">
          <h2 id="search-modal-title" class="search-modal__title">
            🔍 보고싶은 영상 찾기 🔍
          </h2>
          <div class="modal-close" id="modal-close-btn">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>
          <section class="search-input">
            <h3 hidden>검색어 입력</h3>
            <form id="video-search-form" class="search-input__form">
              <input
                id="search-input-keyword"
                type="text"
                placeholder="검색"
                class="search-input__keyword" />
              <button type="submit" id="search-button" class="search-input__search-button button">
                검색
              </button>
            </form>
          </section>
          <section class="video-list-section">
          </section>
      </div>
    </dialog>
    `;

    this.$target.insertAdjacentHTML('beforeend', template);
    this.$modalContainer = $('.modal-container');
  }

  bindEvent() {
    this.$modalContainer.addEventListener('click', (e) =>
      this.handleCloseModal(e),
    );
    $('#video-search-form').addEventListener('submit', (e) =>
      this.dispatchSearchVideo(e),
    );
  }

  handleCloseModal({ target }) {
    if (target.closest('.dimmer') || target.closest('#modal-close-btn')) {
      this.closeModal();
    }
  }

  dispatchSearchVideo(e) {
    e.preventDefault();
    const {
      target: [searchInput],
    } = e;
    if (searchInput.value !== '') {
      // TODO: Skeleton UI 보여주기
      this.dispatchCustomEvent($('#app'), 'searchVideo', searchInput.value);
    }
  }

  openModal() {
    this.$modalContainer.classList.remove('hide');
  }

  closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  renderVideos(videos) {
    const template = `
      <ul class="video-list">
      ${videos
        .map(
          (video) => `
        ${this.createVideoItemTemplate(video)}
      `,
        )
        .join('')}
        </ul>`;
    $('.video-list-section').insertAdjacentHTML('afterbegin', template);
  }

  createVideoItemTemplate(video) {
    const { videoId, thumbnailSrc, title, channelTitle, publishTime } =
      getVideoDetail(video);
    return `
      <li class="video-item" data-video-id=${videoId}>
      <div id="image-wrapper">
        <img
          src=${thumbnailSrc}
          alt="video-item-thumbnail" class="video-item__thumbnail">
        </img>
      </div>
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${publishTime}</p>
      <div class="button-list">
        <button class="video-item__watch_button button">✅</button>
        <button class="video-item__delete_button button">🗑</button>
      </div>
    </li>`;
  }
};

export default VideoSearchModal;
