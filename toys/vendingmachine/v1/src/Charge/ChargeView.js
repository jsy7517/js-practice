import { SELECTORS } from '../lib/constants/dom.js';
import { $ } from '../lib/utils/dom.js';

const ChargeView = class {
	$target;
	constructor($target) {
		this.$target = $target;
	}

	render(chargeInfo) {
		const $menuSection = $('#current-menu', this.$target);
		const template = `
			<section id="vending-machine-charge-section">
				<h2 id="vending-machine-charge-title">자판기 동전 충전하기</h2>
				<form id="vending-machine-charge-form">
					<input type="number" id="vending-machine-charge-input" valueAsNumber/>
					<button type="submit" id="vending-machine-charge-button">충전하기</button>
				</form>
				<span id="vending-machine-charge-amount">보유 금액 : ${chargeInfo.total}원</span>
			</section>
			<section id="vending-machine-overall-section">
				<h2 id="vending-machine-overall-title">동전 보유 현황</h2>
				<table>
					<tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
					<tr>
            <td>500원</td>
            <td id="vending-machine-coin-500-quantity">${chargeInfo.coins.coin500}개</td>
          </tr>
					<tr>
            <td>100원</td>
            <td id="vending-machine-coin-100-quantity">${chargeInfo.coins.coin100}개</td>
          </tr>
					<tr>
            <td>50원</td>
            <td id="vending-machine-coin-50-quantity">${chargeInfo.coins.coin50}개</td>
          </tr>
					<tr>
            <td>10원</td>
            <td id="vending-machine-coin-10-quantity">${chargeInfo.coins.coin10}개</td>
          </tr>
				</table>
			</section>
		`;

		$menuSection.insertAdjacentHTML('afterbegin', template);
	}
	// NOTE: Or bindEvent
	initEvent(handleSubmit) {
		const $chargeForm = $('#vending-machine-charge-form', this.$target);
		$chargeForm.addEventListener('submit', handleSubmit);
	}

	updateCharge(chargeInfo) {
		const $chargeAmount = $(SELECTORS.CHARGE_MENU.VENDING_MACHINE_CHARGE_AMOUNT, this.$target);
		const $coin500Quantity = $(SELECTORS.CHARGE_MENU.VENDING_MACHINE_COIN_500_QUANTITY, this.$target);
		const $coin100Quantity = $(SELECTORS.CHARGE_MENU.VENDING_MACHINE_COIN_100_QUANTITY, this.$target);
		const $coin50Quantity = $(SELECTORS.CHARGE_MENU.VENDING_MACHINE_COIN_50_QUANTITY, this.$target);
		const $coin10Quantity = $(SELECTORS.CHARGE_MENU.VENDING_MACHINE_COIN_10_QUANTITY, this.$target);
		$chargeAmount.textContent = `보유 금액 : ${chargeInfo.total}원`;
		$coin500Quantity.textContent = `${chargeInfo.coins.coin500}개`;
		$coin100Quantity.textContent = `${chargeInfo.coins.coin100}개`;
		$coin50Quantity.textContent = `${chargeInfo.coins.coin50}개`;
		$coin10Quantity.textContent = `${chargeInfo.coins.coin10}개`;
	}
};

export default ChargeView;
