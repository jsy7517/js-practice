import { $ } from '../lib/utils/dom.js';
import ProductPurchaseModel from './ProductPurchaseModel.js';
import ProductPurchaseView from './ProductPurchaseView.js';

const ProductPurchaseController = class {
	model;
	view;

	constructor() {
		this.model = new ProductPurchaseModel();
		this.view = new ProductPurchaseView();
	}

	renderProductPurchaseMenu() {
		this.model.updateData();
		this.view.render({
			chargeAmount: this.model.chargeAmount,
			productList: this.model.productList,
			returnCoinsInfo: this.model.returnCoinsInfo
		});
		this.bindEvents();
	}

	bindEvents() {
		// NOTE: selector 정확하게 지정하기
		this.view.on($('#charge-input-form'), 'submitCharge', (e) => this.handleSubmitCharge(e.detail));
		this.view.on($('#available-product-table'), 'purchaseProduct', (e) => this.handlePurchaseProduct(e.detail));
		this.view.on($('#coin-return-button'), 'returnCoin', () => this.handleReturnCoin());
	}

	handleSubmitCharge(chargeAmount) {
		this.model.chargeAmount = chargeAmount;
		this.view.updateChargeAmount(this.model.chargeAmount);
	}

	handlePurchaseProduct(targetProductId) {
		try {
			this.model.purchaseProduct(targetProductId);
		} catch (error) {
			alert(error.message);
			return;
		}

		this.view.updateChargeAmount(this.model.chargeAmount);
		this.view.updateAvailableProductTable(this.model.productList);
	}

	handleReturnCoin() {
		try {
			this.model.returnCoins();
		} catch (error) {
			alert(error.message);
			return;
		}

		this.view.updateChargeAmount(this.model.chargeAmount);
		this.view.updateCoinReturnTable(this.model.returnCoinsInfo);
	}
};

export default ProductPurchaseController;
