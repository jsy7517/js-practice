import { SELECTORS } from '../lib/constants/dom.js';
import { $ } from '../lib/utils/dom.js';

const PurchaseView = class {
	$target;
	constructor($target) {
		this.$target = $target;
	}

	render(chargeAmount, productList, returnCoinsInfo) {
		const $currentMenu = $('#current-menu', this.$target);
		const template = `
			<section id="charge-section">
				<h2 id="charge-section-title">금액 투입</h2>
				<form id="charge-form">
					<input type="number" id="charge-input" />
					<button type="submit" id="charge-button">투입하기</button>
				</form>
				<p id="charge-amount">투입한 금액 : ${chargeAmount}원</p>
			</section>
			<section id="product-purchase-section">
				<h2 id="product-purchase-title">구매할 수 있는 상품 현황</h2>
				<table id="product-purchase-table">
					<tr>
						<th>상품명</th>
						<th>가격</th>
						<th>수량</th>
						<th>구매</th>
					</tr>
					${this.getProductTableTemplate(productList)}
				</table>
			</section>
			<section id="coin-return-section">
				<h2 id="coin-return-title">잔돈</h2>
				<button id="coin-return-button">반환하기</button>
				<table id="coin-return-table">
					<tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
					<tr>
            <td>500원</td>
            <td id="coin-500-quantity">${returnCoinsInfo.coin500}개</td>
          </tr>
					<tr>
            <td>100원</td>
            <td id="coin-100-quantity">${returnCoinsInfo.coin100}개</td>
          </tr>
					<tr>
            <td>50원</td>
            <td id="coin-50-quantity">${returnCoinsInfo.coin50}개</td>
          </tr>
					<tr>
            <td>10원</td>
            <td id="coin-10-quantity">${returnCoinsInfo.coin10}개</td>
          </tr>
				</table>
			</section>
		`;
		$currentMenu.insertAdjacentHTML('afterbegin', template);
	}

	initEvent({ handleCharge, handlePurchase, handleCoinReturn }) {
		// or bindEvent
		const $chargeForm = $(SELECTORS.PURCHASE_MENU.CHARGE_FORM, this.$target);
		const $productPurchaseTable = $(SELECTORS.PURCHASE_MENU.PRODUCT_PURCHASE_TABLE, this.$target);
		const $coinReturnButton = $(SELECTORS.PURCHASE_MENU.COIN_RETURN_BUTTON, this.$target);
		$chargeForm.addEventListener('submit', handleCharge);
		$productPurchaseTable.addEventListener('click', handlePurchase);
		$coinReturnButton.addEventListener('click', handleCoinReturn);
	}

	getProductTableTemplate(productList) {
		return productList.length
			? productList
					.map(
						(product) => `
				<tr class="product-purchase-item" data-product-id=${product.id}>
					<td class="product-purchase-name" data-product-name=${product.name}>${product.name}</td>
					<td class="product-purchase-price" data-product-price=${product.price}>${product.price}</td>
					<td class="product-purchase-quantity" data-product-quantity=${product.quantity}>${product.quantity}</td>
					<td>
						<button class="purchase-button">구매하기</button>
					</td>
				</tr>
			`
					)
					.join('')
			: '';
	}

	updateChargeAmount(chargeAmount) {
		const $chargeAmount = $(SELECTORS.PURCHASE_MENU.CHARGE_AMOUNT, this.$target);
		$chargeAmount.textContent = `투입한 금액 : ${chargeAmount}원`;
	}

	updateProductPurchaseItem($purchaseItem, product) {
		const [_, __, $productQuantity, $purchaseButtonWrapper] = $purchaseItem.children;
		const $purchaseButton = $purchaseButtonWrapper.firstElementChild;
		$productQuantity.textContent = `${product.quantity}`;
		if (product.quantity === 0) {
			$purchaseButton.disabled = true;
		} else {
			$purchaseButton.disabled = false;
		}
	}

	updateCoinReturnTable(returnCoinsInfo) {
		const $coin500Quantity = $(SELECTORS.PURCHASE_MENU.COIN_500_QUANTITY, this.$target);
		const $coin100Quantity = $(SELECTORS.PURCHASE_MENU.COIN_100_QUANTITY, this.$target);
		const $coin50Quantity = $(SELECTORS.PURCHASE_MENU.COIN_50_QUANTITY, this.$target);
		const $coin10Quantity = $(SELECTORS.PURCHASE_MENU.COIN_10_QUANTITY, this.$target);
		$coin500Quantity.textContent = `${returnCoinsInfo.coin500}개`;
		$coin100Quantity.textContent = `${returnCoinsInfo.coin100}개`;
		$coin50Quantity.textContent = `${returnCoinsInfo.coin50}개`;
		$coin10Quantity.textContent = `${returnCoinsInfo.coin10}개`;
	}
};

export default PurchaseView;
