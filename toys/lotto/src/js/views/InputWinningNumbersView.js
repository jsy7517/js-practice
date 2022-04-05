import { LOTTO_GAME } from '../lib/constants/lottoGame.js';
import View from '../lib/core/View.js';
import { validateWinningNumbers } from '../lib/utils/validation.js';

const InputWinningNumbersView = class extends View {
  winningNumbers;

  static #template = `
  <form class="mt-9" id="input-winning-numbers-form">
  <label class="flex-auto d-inline-block mb-3"
    >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
  <div class="d-flex">
    <div>
      <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
      <div>
        <input
          type="number"
          data-lotto-idx="0"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          data-lotto-idx="1"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          data-lotto-idx="2"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          data-lotto-idx="3"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          data-lotto-idx="4"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          data-lotto-idx="5"
          required
          min="1"
					max="45"
          class="winning-number mx-1 text-center"
        />
      </div>
    </div>
    <div class="bonus-number-container flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div class="d-flex justify-center">
        <input type="number"
        data-lotto-idx="6"
        required
        min="1"
				max="45" 
        class="bonus-number winning-number text-center" />
      </div>
    </div>
  </div>
  <button
    type="submit"
    class="open-result-modal-button mt-5 btn btn-cyan w-100"
  >
    결과 확인하기
  </button>
</form>
  `;

  constructor($target) {
    super($target);
    this.winningNumbers = Array.from(
      { length: LOTTO_GAME.WINNING_NUMBERS_COUNT },
      () => 0,
    );
    this.bindEventHandler('submit', (e) => this.onSubmitWinningNumbers(e));
    this.bindEventHandler('input', (e) => this.onInputWinningNumbers(e));
  }

  render() {
    this.$target.insertAdjacentHTML(
      'afterbegin',
      InputWinningNumbersView.#template,
    );
  }

  onSubmitWinningNumbers(e) {
    e.preventDefault();
    const {
      target: { id },
    } = e;
    if (id !== 'input-winning-numbers-form') return;

    try {
      validateWinningNumbers(this.winningNumbers);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.dispatch('submitWinningNumbers', this.winningNumbers);
  }

  onInputWinningNumbers({ target }) {
    if (!target.classList.contains('winning-number')) return;
    const { lottoIdx } = target.dataset;
    const inputLottoNumber = target.valueAsNumber;
    this.winningNumbers[lottoIdx] = inputLottoNumber;
  }
};

export default InputWinningNumbersView;
