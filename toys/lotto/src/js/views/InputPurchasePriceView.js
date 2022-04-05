import View from '../lib/core/View.js';
import { validatePurchasePrice } from '../lib/utils/validation.js';

const InputPurchasePriceView = class extends View {
	static #template = `
      <h1 class="text-center">🎱 행운의 로또</h1>
      <form class="mt-5" id="input-purchase-price-form">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
						required
						min="1000"
						max="100000"
          />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </form>
  `;

	constructor($target) {
		super($target);
		this.bindEventHandler('submit', (e) => this.onSubmitPurchasePrice(e));
	}

	render() {
		this.$target.insertAdjacentHTML('afterbegin', InputPurchasePriceView.#template);
	}

	onSubmitPurchasePrice(e) {
		e.preventDefault();
		const {
			target: { id }
		} = e;
		if (id !== 'input-purchase-price-form') return;

		const {
			target: [purchasePriceInput]
		} = e;
		const purchasePrice = purchasePriceInput.valueAsNumber;
		try {
			validatePurchasePrice(purchasePrice);
		} catch (error) {
			alert(error.message);
			return;
		}

		this.dispatch('submitPurchasePrice', purchasePrice);
	}
};

export default InputPurchasePriceView;
