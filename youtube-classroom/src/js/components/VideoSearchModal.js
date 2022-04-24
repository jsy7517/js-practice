import { ERROR_MESSAGES } from '../lib/constants/errorMessages.js';
import { MAX_RESULT_VIDEO_COUNT } from '../lib/constants/searchVideo.js';
import Component from '../lib/core/Component.js';
import { $, $$ } from '../lib/utils/dom.js';
import { showToastWithMessage } from '../lib/utils/toast.js';
import { getVideoDetail, parsePublishTime } from '../lib/utils/video.js';

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
            <ul class="video-list"></ul>
          </section>
      </div>
    </dialog>
    <div class="toast--container"></div>
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
    $('.video-list').addEventListener('click', (e) =>
      this.dispatchManageVideo(e),
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
    if (searchInput.value === '') {
      alert(ERROR_MESSAGES.NO_KEYWORD);
      return;
    }

    this.dispatchCustomEvent($('#app'), 'searchVideo', searchInput.value);
  }

  dispatchManageVideo({ target }) {
    if (!target.classList.contains('button')) return;

    const isSaveVideoBtn = target.classList.contains(
      'video-item__watch_button',
    );
    const isUnsaveVideoBtn = target.classList.contains(
      'video-item__delete_button',
    );
    const { videoId } = target.closest('.video-item').dataset;
    if (isSaveVideoBtn) {
      this.dispatchCustomEvent($('#app'), 'saveVideo', videoId);
      showToastWithMessage(
        $('.toast--container'),
        '성공적으로 저장되었습니다!',
      );
      target.disabled = true;
      target.nextElementSibling.disabled = false;

      return;
    }

    if (isUnsaveVideoBtn) {
      this.dispatchCustomEvent($('#app'), 'unsaveVideo', videoId);
      showToastWithMessage(
        $('.toast--container'),
        '성공적으로 삭제되었습니다!',
      );
      target.disabled = true;
      target.previousElementSibling.disabled = false;
    }
  }

  openModal() {
    this.$modalContainer.classList.remove('hide');
  }

  closeModal() {
    this.$modalContainer.classList.add('hide');
  }

  clearVideoList() {
    $('.video-list').replaceChildren();
  }

  showSkeletonVideos() {
    const template = `
      <li class="skeleton-video-item">
        <div class="skeleton-video-item__thumbnail"></div>
        <div class="skeleton-video-item__title"></div>
        <div class="skeleton-video-item__detail"></div>
      </li>
    `.repeat(MAX_RESULT_VIDEO_COUNT);

    $('.video-list').insertAdjacentHTML('beforeend', template);
  }

  hideSkeletonVideos() {
    $$('.skeleton-video-item').forEach((skeletonEl) => {
      $('.video-list').removeChild(skeletonEl);
    });
  }

  renderNoResultPage() {
    const template = `
      <p class="modal--no-result">검색 결과가 존재하지 않습니다.
      <br> 다른 검색어를 입력해 주세요.</p>
    `;

    $('.video-list').insertAdjacentHTML('beforeend', template);
  }

  renderVideos(videos) {
    const lastVideoIdx = videos.length - 1;
    const template = `
      ${videos
        .map(
          (video, idx) => `
        ${this.createVideoItemTemplate({
          video,
          idx,
          lastVideoIdx,
        })}
      `,
        )
        .join('')}
        `;
    $('.video-list').insertAdjacentHTML('beforeend', template);
    this.bindObserver($('.video-item--last'));
  }

  createVideoItemTemplate({ video, idx, lastVideoIdx }) {
    const { videoId, thumbnailSrc, title, channelTitle, publishTime } =
      getVideoDetail(video);
    return `
      <li class="video-item ${
        idx === lastVideoIdx ? 'video-item--last' : ''
      }" data-video-id=${videoId}
    }>
      <div class="video-item__thumbnail-container">
        <img
          src=${thumbnailSrc}
          alt="video-item-thumbnail" class="video-item__thumbnail">
        </img>
      </div>
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${parsePublishTime(publishTime)}</p>
      <div class="button-list">
        <button class="video-item__watch_button button"
        ${this.props.isSavedVideo(videoId) ? 'disabled' : ''} 
        >✅</button>
        <button class="video-item__delete_button button" 
        ${this.props.isSavedVideo(videoId) ? '' : 'disabled'}
        >🗑</button>
      </div>
    </li>`;
  }

  bindObserver($targetEl) {
    const options = {
      root: null,
      threshold: 1.0,
    };
    const handleIntersecting = ([{ isIntersecting, target }], observer) => {
      if (isIntersecting) {
        this.dispatchCustomEvent($('#app'), 'searchMoreVideo');
        target.classList.remove('video-item--last');
        observer.unobserve(target);
      }
    };
    const observer = new IntersectionObserver(handleIntersecting, options);
    observer.observe($targetEl);
  }
};

export default VideoSearchModal;
