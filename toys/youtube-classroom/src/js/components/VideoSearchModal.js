import { MAX_RESULT_VIDEO_COUNT } from '../lib/constants/searchVideo.js';
import TOAST_DELAY from '../lib/constants/toast.js';
import Component from '../lib/core/Component.js';
import { $, $$ } from '../lib/utils/dom.js';
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
    <dialog class="toast hide">
    <div class="success-icon">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572" stroke="#48B16E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 3.00574L11 13.0157L8 10.0157" stroke="#48B16E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>  
    </div>
    <div class="columnspace(5)"></div>
    <p class="toast--message"></p>
    </dialog>
    `;

    this.$target.insertAdjacentHTML('beforeend', template);
    this.$modalContainer = $('.modal-container');
    this.$toast = $('.toast');
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
    if (searchInput.value !== '') {
      this.dispatchCustomEvent($('#app'), 'searchVideo', searchInput.value);
    }
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
      // TODO: 더 이상 저장할 수 없는 경우 예외처리
      $('.toast--message').textContent = '성공적으로 저장되었습니다!';
      this.renderToast();
      target.disabled = true;
      target.nextElementSibling.disabled = false;
      return;
    }

    if (isUnsaveVideoBtn) {
      this.dispatchCustomEvent($('#app'), 'unsaveVideo', videoId);
      $('.toast--message').textContent = '성공적으로 삭제되었습니다!';
      this.renderToast();
      target.disabled = true;
      target.previousElementSibling.disabled = false;
    }
  }

  renderToast() {
    this.$toast.classList.toggle('hide');

    setTimeout(() => {
      this.$toast.classList.toggle('hide');
    }, TOAST_DELAY.SHORT);
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
