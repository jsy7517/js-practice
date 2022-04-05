import View from '../lib/core/View.js';
import { $ } from '../lib/utils/dom.js';
import { validateCharge } from '../lib/utils/validation.js';

const VendingMachineManageView = class extends View {
	static #template = `
    <section id="vending-machine-manage-section">
      <form id="vending-machine-charge-form">
        <fieldset>
          <legend>자판기 동전 충전하기</legend>
          <input type="number" id="vending-machine-charge-input" placeholder="충전할 금액"/>
          <button id="vending-machine-charge-button">충전하기</button>
        </fieldset>
        <span id="vending-machine-charge-amount"></span>
      </form>
      <section id="current-charge-section">
        <h2>동전 보유 현황</h2>
        <table id="current-charge-table"></table>
      </section>
    </section>
  `;

	constructor() {
		super();
	}

	render(chargeInfo) {
		$('#current-menu').insertAdjacentHTML('afterbegin', VendingMachineManageView.#template);
		this.updateChargeInfo(chargeInfo);
		this.bindInputChargeEvent();
	}

	updateChargeInfo(chargeInfo) {
		const { total, coins } = chargeInfo;
		$('#vending-machine-charge-amount').textContent = `보유 금액 : ${total}원`;
		$('#current-charge-table').replaceChildren();
		$('#current-charge-table').insertAdjacentHTML('afterbegin', this.createChargeTableTemplate(coins));
	}

	createChargeTableTemplate(coins) {
		const { coin500, coin100, coin50, coin10 } = coins;

		return `
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>500원</td>
          <td>${coin500}개</td>
        </tr>
        <tr>
          <td>100원</td>
          <td>${coin100}개</td>
        </tr>
        <tr>
          <td>50원</td>
          <td>${coin50}개</td>
        </tr>
        <tr>
          <td>10원</td>
          <td>${coin10}개</td>
        </tr>
      </tbody>
    `;
	}

	bindInputChargeEvent() {
		$('#vending-machine-charge-form').addEventListener('submit', (e) => this.onInputCharge(e));
	}

	onInputCharge(e) {
		e.preventDefault();
		const {
			target: [_, chargeInput]
		} = e;

		const chargeAmount = chargeInput.valueAsNumber;
		try {
			validateCharge(chargeAmount);
		} catch (error) {
			alert(error.message);
			return;
		}

		this.emit($('#vending-machine-charge-form'), 'submitCharge', chargeAmount);
	}
};

export default VendingMachineManageView;
