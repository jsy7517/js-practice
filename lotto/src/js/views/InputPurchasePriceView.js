import View from '../lib/core/View.js';
import { $ } from '../lib/utils/dom.js';
import { validatePurchasePrice } from '../lib/utils/validation.js';

const InputPurchasePriceView = class extends View {
  static #template = `
      <h1 class="text-center">π± νμ΄μ λ‘λ</h1>
      <form class="mt-5" id="input-purchase-price-form">
        <label class="mb-2 d-inline-block">κ΅¬μν  κΈμ‘μ μλ ₯ν΄μ£ΌμΈμ.</label>
        <div class="d-flex">
          <input
            id="input-purchase-price"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="κ΅¬μ κΈμ‘"
						required
						min="1000"
						max="100000"
          />
          <button type="submit" id="submit-price-btn" class="btn btn-cyan">νμΈ</button>
        </div>
      </form>
  `;

  constructor($target) {
    super($target);
    this.bindEventHandler('submit', (e) => this.onSubmitPurchasePrice(e));
  }

  render() {
    this.$target.insertAdjacentHTML(
      'afterbegin',
      InputPurchasePriceView.#template,
    );
  }

  reset() {
    $('#input-purchase-price-form').reset();
    $('#submit-price-btn').disabled = false;
  }

  onSubmitPurchasePrice(e) {
    e.preventDefault();
    const {
      target: { id },
    } = e;
    if (id !== 'input-purchase-price-form') return;

    const {
      target: [purchasePriceInput],
    } = e;
    const purchasePrice = purchasePriceInput.valueAsNumber;
    try {
      validatePurchasePrice(purchasePrice);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.dispatch('submitPurchasePrice', purchasePrice);
    $('#submit-price-btn').disabled = true;
  }
};

export default InputPurchasePriceView;
