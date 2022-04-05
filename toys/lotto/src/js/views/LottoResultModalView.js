import { LOTTO_GAME } from '../lib/constants/lottoGame.js';
import View from '../lib/core/View.js';
import { $, $$ } from '../lib/utils/dom.js';

const LottoResultModalView = class extends View {
  constructor($target) {
    super($target);
    this.bindEventHandler('click', (e) => this.onClickCloseModalBtn(e));
    this.bindEventHandler('click', (e) => this.onClickRestartBtn(e));
  }

  render(lottoRankCount, profit) {
    this.openModal();
    $$('.match-count').forEach(($el, idx) => {
      $el.textContent = `${
        lottoRankCount[LOTTO_GAME.TOTAL_RANK_COUNT - idx - 1]
      }개`;
    });
    $('#profit').textContent = `${profit}`;
  }

  openModal() {
    this.$target.classList.add('open');
  }

  closeModal() {
    this.$target.classList.remove('open');
  }

  onClickCloseModalBtn({ target }) {
    if (target.closest('#modal-close-btn') || !target.closest('.modal-inner')) {
      this.$target.classList.remove('open');
    }
  }

  onClickRestartBtn({ target }) {
    if (target.id === 'restart-btn') {
      this.dispatch('restartGame');
    }
  }
};

export default LottoResultModalView;
