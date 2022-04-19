import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';
import { showToastWithMessage } from '../lib/utils/toast.js';
import { getVideoDetail, parsePublishTime } from '../lib/utils/video.js';

const SavedVideoList = class extends Component {
  mountTemplate() {
    const template = `
      <div class="rowspace(20)"></div>
      <section class="saved-video-list-section">
      </section>
      <div class="toast--container"></div>
    `;

    this.$target.insertAdjacentHTML('beforeend', template);
    this.$savedVideoListSection = $('.saved-video-list-section');
  }

  bindEvent() {
    this.$savedVideoListSection.addEventListener('click', (e) =>
      this.dispatchManageVideo(e),
    );
  }

  dispatchManageVideo({ target }) {
    if (!target.classList.contains('button')) return;

    const isToggleVideoStatusBtn = target.classList.contains(
      'video-item__watch_button',
    );

    const isUnsaveVideoBtn = target.classList.contains(
      'video-item__delete_button',
    );

    const { videoId } = target.closest('.video-item').dataset;
    if (isToggleVideoStatusBtn) {
      this.dispatchCustomEvent($('#app'), 'toggleVideoStatus', videoId);
      showToastWithMessage(
        $('.toast--container'),
        '성공적으로 이동되었습니다!',
      );

      return;
    }

    if (isUnsaveVideoBtn) {
      this.dispatchCustomEvent($('#app'), 'unsaveVideo', videoId);
      showToastWithMessage(
        $('.toast--container'),
        '성공적으로 삭제되었습니다!',
      );
    }
  }

  renderVideos(videos) {
    this.$savedVideoListSection.replaceChildren();
    const template = `
      <ul class="saved-video__list">
        ${videos.map((video) => this.createVideoItemTemplate(video)).join('')}
      </ul>
    `;

    this.$savedVideoListSection.insertAdjacentHTML('afterbegin', template);
  }

  createVideoItemTemplate({ videoInfo }) {
    const { videoId, thumbnailSrc, title, channelTitle, publishTime } =
      getVideoDetail(videoInfo);
    return `
      <li class="video-item data-video-id=${videoId}}>
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
        <button class="video-item__watch_button button">✅</button>
        <button class="video-item__delete_button button">🗑</button>
      </div>
    </li>`;
  }
};

export default SavedVideoList;
