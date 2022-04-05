import { SELECTORS } from '../lib/constants/dom.js';
import { ERROR_MESSAGE } from '../lib/constants/validation.js';
import { $, clearInput, checkClickedTargetByClassName } from '../lib/utils/dom.js';
import PurchaseModel from './PurchaseModel.js';
import PurchaseView from './PurchaseView.js';

const PurchaseController = class {
	model;
	view;

	constructor($target) {
		this.model = new PurchaseModel();
		this.view = new PurchaseView($target);
	}

	#handleCharge(e) {
		e.preventDefault();
		const {
			target: [chargeInput]
		} = e;

		try {
			this.#validateCharge(chargeInput.valueAsNumber);
			this.model.updateChargeAmount(chargeInput.valueAsNumber);
			this.view.updateChargeAmount(this.model.chargeAmount);
			clearInput([chargeInput]);
		} catch (error) {
			clearInput([chargeInput]);
			alert(error.message);
		}
	}

	#validateCharge(charge) {
		if (charge <= 0) {
			throw new Error(ERROR_MESSAGE.PURCHASE.WRONG_CHARGE_AMOUNT);
		}
		if (charge % 10 !== 0) {
			throw new Error(ERROR_MESSAGE.PURCHASE.CHARGE_AMOUNT_CANNOT_DIVIDED_BY_TEN);
		}
	}

	#handlePurchase(e) {
		if (checkClickedTargetByClassName(e, 'purchase-button')) {
			const $purchaseItem = e.target.closest(SELECTORS.PURCHASE_MENU.PRODUCT_PURCHASE_ITEM) ?? null;
			if ($purchaseItem) {
				const productId = $purchaseItem.dataset.productId;
				try {
					const product = this.model.purchaseProduct(productId);
					this.view.updateChargeAmount(this.model.chargeAmount);
					this.view.updateProductPurchaseItem($purchaseItem, product);
				} catch (error) {
					alert(error.message);
				}
			}
		}
	}

	#handleCoinReturn() {
		try {
			this.model.generateReturnCoins();
			this.view.updateChargeAmount(this.model.chargeAmount);
			this.view.updateCoinReturnTable(this.model.returnCoinsInfo);
		} catch (error) {
			alert(error.message);
		}
	}

	validateData() {
		this.model.updateProductList();
		this.model.updateChargeInfo();
		if (!this.model.productList) {
			alert(ERROR_MESSAGE.PURCHASE.NO_PRODUCTS);
			return false;
		}
		if (!this.model.chargeInfo) {
			alert(ERROR_MESSAGE.PURCHASE.NO_CHARGE);
			return false;
		}

		return true;
	}

	updateView() {
		this.model.updateData();
		this.view.render(this.model.chargeAmount, this.model.productList, this.model.returnCoinsInfo);
		this.view.initEvent({
			handleCharge: this.#handleCharge.bind(this),
			handlePurchase: this.#handlePurchase.bind(this),
			handleCoinReturn: this.#handleCoinReturn.bind(this)
		});
	}

	updateData(key) {
		if (key === 'manage') {
			this.model.updateProductList();
			return;
		}
		if (key === 'charge') {
			this.model.updateChargeInfo();
			return;
		}
	}
};

export default PurchaseController;
