import { ERROR_MESSAGE } from '../lib/constants/validation.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const PurchaseModel = class {
	#productList;
	#chargeInfo;
	#chargeAmount;
	#returnCoinsInfo;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#productList = getLocalStorage('productList') ?? null;
		this.#chargeInfo = getLocalStorage('chargeInfo') ?? null;
		this.#chargeAmount = getLocalStorage('chargeAmount') ?? 0;
		this.#returnCoinsInfo = getLocalStorage('returnCoinsInfo') ?? {
			coin500: 0,
			coin100: 0,
			coin50: 0,
			coin10: 0
		};
	}

	updateProductList() {
		this.#productList = getLocalStorage('productList');
	}

	updateChargeInfo() {
		this.#chargeInfo = getLocalStorage('chargeInfo');
	}

	updateChargeAmount(chargeAmount) {
		this.#chargeAmount += chargeAmount;
		setLocalStorage('chargeAmount', this.#chargeAmount);
	}

	purchaseProduct(productId) {
		const targetProduct = this.#productList.find((product) => product.id === productId);
		const { price } = targetProduct;
		if (this.#chargeAmount < price) throw new Error(ERROR_MESSAGE.PURCHASE.NOT_ENOUGH_CHARGE);

		this.#chargeAmount -= price;
		if (targetProduct.quantity > 0) {
			targetProduct.quantity--;
		}

		setLocalStorage('productList', this.#productList);
		setLocalStorage('chargeAmount', this.#chargeAmount);

		return targetProduct;
	}

	generateReturnCoins() {
		const { chargeAmount } = this;
		const { total } = this.#chargeInfo;
		if (chargeAmount === 0) {
			throw new Error(ERROR_MESSAGE.PURCHASE.NO_CHARGE_AMOUNT);
		}
		if (total === 0) {
			throw new Error(ERROR_MESSAGE.PURCHASE.NOT_ENOUGH_RETURN_CHARGE);
		}
		const { coins } = this.#chargeInfo;
		this.#returnCoinsInfo = this.#generateMinimumReturnCoins(chargeAmount, coins);
		this.#updateChargeInfo(chargeAmount, this.#returnCoinsInfo);
		setLocalStorage('chargeInfo', this.#chargeInfo);
		setLocalStorage('chargeAmount', this.#chargeAmount);
		setLocalStorage('returnCoinsInfo', this.#returnCoinsInfo);
	}

	#generateMinimumReturnCoins(chargeAmount, coins) {
		const minimumReturnCoins = {
			coin500: 0,
			coin100: 0,
			coin50: 0,
			coin10: 0
		};
		let remainAmount = chargeAmount;
		while (remainAmount > 0) {
			remainAmount = this.#calculateRemainAmount(remainAmount, coins.coin500, 500, minimumReturnCoins);
			if (remainAmount === 0) break;
			remainAmount = this.#calculateRemainAmount(remainAmount, coins.coin100, 100, minimumReturnCoins);
			if (remainAmount === 0) break;
			remainAmount = this.#calculateRemainAmount(remainAmount, coins.coin50, 50, minimumReturnCoins);
			if (remainAmount === 0) break;
			remainAmount = this.#calculateRemainAmount(remainAmount, coins.coin10, 10, minimumReturnCoins);

			this.#chargeAmount = remainAmount;
			return minimumReturnCoins;
		}

		this.#chargeAmount = remainAmount;
		return minimumReturnCoins;
	}

	#calculateRemainAmount(amount, coinQuantity, coinPrice, minimumReturnCoins) {
		if (amount % coinPrice !== 0) return amount;

		let usedCoinQuantity = 0;
		const totalQuantity = amount / coinPrice;

		if (totalQuantity > coinQuantity) {
			amount -= coinQuantity * coinPrice;
			usedCoinQuantity = coinQuantity;
		} else {
			amount -= totalQuantity * coinPrice;
			usedCoinQuantity = totalQuantity;
		}
		minimumReturnCoins[`coin${coinPrice}`] += usedCoinQuantity;

		return amount;
	}

	#updateChargeInfo(usedAmount, usedCoinsInfo) {
		const { total, coins } = this.#chargeInfo;
		const newChargeInfo = {
			total: total - usedAmount,
			coins: {
				coin500: coins.coin500 - usedCoinsInfo.coin500,
				coin100: coins.coin100 - usedCoinsInfo.coin100,
				coin50: coins.coin50 - usedCoinsInfo.coin50,
				coin10: coins.coin10 - usedCoinsInfo.coin10
			}
		};
		this.#chargeInfo = newChargeInfo;
	}

	get productList() {
		return this.#productList;
	}

	get chargeInfo() {
		return this.#chargeInfo;
	}

	get chargeAmount() {
		return this.#chargeAmount;
	}

	get returnCoinsInfo() {
		return this.#returnCoinsInfo;
	}
};

export default PurchaseModel;
