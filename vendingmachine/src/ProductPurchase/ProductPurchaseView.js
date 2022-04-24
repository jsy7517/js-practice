import View from '../lib/core/View.js';
import { $ } from '../lib/utils/dom.js';
import { validateCharge } from '../lib/utils/validation.js';

const ProductPurchaseView = class extends View {
	static #template = `
    <section id="product-purchase-section">
      <form id="charge-input-form">
        <fieldset>
          <legend>금액 투입</legend>
          <input id="charge-input" type="number" placeholder="투입할 금액"/>
          <button type="submit" id="charge-button">투입하기</button>
        </fieldset>
        <span id="charge-amount"></span>
      </form>
      <section id="available-product-section">
        <h2>구매할 수 있는 상품 현황</h2>
        <table id="available-product-table"></table>
      </section>
      <section id="change-section">
        <h2>잔돈</h2>
        <button id="coin-return-button">반환하기</button>
        <table id="coin-return-table"></table>
      </section>
    </section>
  `;

	constructor() {
		super();
	}

	render({ chargeAmount, productList, returnCoinsInfo }) {
		$('#current-menu').insertAdjacentHTML('afterbegin', ProductPurchaseView.#template);
		this.updateChargeAmount(chargeAmount);
		this.updateAvailableProductTable(productList);
		this.updateCoinReturnTable(returnCoinsInfo);
		this.bindEvents();
	}

	updateChargeAmount(chargeAmount) {
		$('#charge-amount').textContent = `투입한 금액 : ${chargeAmount}원`;
	}

	updateAvailableProductTable(productList) {
		$('#available-product-table').replaceChildren();
		$('#available-product-table').insertAdjacentHTML(
			'afterbegin',
			this.createAvailableProductTableTemplate(productList)
		);
	}

	updateCoinReturnTable(returnCoinsInfo) {
		$('#coin-return-table').replaceChildren();
		$('#coin-return-table').insertAdjacentHTML('afterbegin', this.createCoinReturnTableTemplate(returnCoinsInfo));
	}

	createAvailableProductTableTemplate(productList) {
		return `
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody>
          ${productList
						.map(
							(product) => `
              <tr class="product-purchase-item" data-product-id=${product.id}>
                <td class="product-purchase-name" data-product-name=${product.name}>${product.name}</td>
                <td class="product-purchase-price" data-product-price=${product.price}>${product.price}</td>
                <td class="product-purchase-quantity" data-product-quantity=${product.quantity}>${product.quantity}</td>
                <td>
                ${
									product.quantity === 0
										? `<button class="purchase-button" disabled>구매</button>`
										: `<button class="purchase-button">구매</button>`
								}
                </td>
              </tr>
            `
						)
						.join('')}
      </tbody>
    `;
	}

	createCoinReturnTableTemplate(returnCoinsInfo) {
		const { coin500, coin100, coin50, coin10 } = returnCoinsInfo;

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
	bindEvents() {
		$('#charge-input-form').addEventListener('submit', (e) => this.onInputCharge(e));
		$('#available-product-table').addEventListener('click', (e) => this.onClickPurchaseButton(e));
		$('#coin-return-button').addEventListener('click', () => this.onClickCoinReturnButton());
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

		this.emit($('#charge-input-form'), 'submitCharge', chargeAmount);
	}

	onClickPurchaseButton({ target }) {
		if (target.className === 'purchase-button') {
			// NOTE: Element.closest()는 자신부터 부모 요소 단위로 출발하여 탐색한다.
			const { productId } = target.closest('.product-purchase-item').dataset;
			this.emit($('#available-product-table'), 'purchaseProduct', productId);
		}
	}

	onClickCoinReturnButton() {
		this.emit($('#coin-return-button'), 'returnCoin');
	}
};

export default ProductPurchaseView;
