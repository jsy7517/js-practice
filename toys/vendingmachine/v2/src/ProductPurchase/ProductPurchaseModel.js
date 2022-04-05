import { ERROR_MESSAGES } from '../lib/constants/validation.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const ProductPurchaseModel = class {
	#chargeAmount;
	#productList;
	#returnCoinsInfo;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#chargeAmount = getLocalStorage('chargeAmount') ?? 0;
		this.#productList = getLocalStorage('productList') ?? [];
		this.#returnCoinsInfo = getLocalStorage('returnCoinsInfo') ?? {
			coin500: 0,
			coin100: 0,
			coin50: 0,
			coin10: 0
		};
	}

	purchaseProduct(targetProductId) {
		const targetProduct = this.#productList.find((product) => product.id === targetProductId);
		const { price } = targetProduct;
		if (this.#chargeAmount < price) {
			throw new Error(ERROR_MESSAGES.PRODUCT_PURCHASE.LACK_CHARGE_AMOUNT);
		}

		if (targetProduct.quantity > 0) {
			this.#chargeAmount -= price;
			targetProduct.quantity -= 1;
		}

		setLocalStorage('chargeAmount', this.#chargeAmount);
		setLocalStorage('productList', this.#productList);
	}

	returnCoins() {
		if (this.#chargeAmount === 0) {
			throw new Error(ERROR_MESSAGES.PRODUCT_PURCHASE.LACK_CHARGE_AMOUNT);
		}

		const { total, coins } = getLocalStorage('chargeInfo');
		if (this.#chargeAmount >= total) {
			this.#returnCoinsInfo = coins;
			setLocalStorage('chargeInfo', this.getInitialChargeInfo());
			this.#chargeAmount -= total;
		} else {
			this.#returnCoinsInfo = this.generateMinimumReturnCoins(this.#chargeAmount, coins);
			setLocalStorage(
				'chargeInfo',
				this.updateChargeInfo({
					currentChargeAmount: total,
					currentCoinsInfo: coins,
					usedChargeAmount: this.#chargeAmount,
					usedCoinsInfo: this.#returnCoinsInfo
				})
			);
			this.#chargeAmount = 0;
		}

		setLocalStorage('chargeAmount', this.#chargeAmount);
		setLocalStorage('returnCoinsInfo', this.#returnCoinsInfo);
	}

	getInitialChargeInfo() {
		return {
			total: 0,
			coins: {
				coin500: 0,
				coin100: 0,
				coin50: 0,
				coin10: 0
			}
		};
	}

	generateMinimumReturnCoins(chargeAmount, coins) {
		const minimumReturnCoinsInfo = {
			coin500: 0,
			coin100: 0,
			coin50: 0,
			coin10: 0
		};
		const coinPrices = [500, 100, 50, 10];
		let remainChargeAmount = chargeAmount;
		for (const coinPrice of coinPrices) {
			remainChargeAmount = this.calcRemainChargeAmount({
				remainChargeAmount,
				coinCount: coins[`coin${coinPrice}`],
				coinPrice,
				minimumReturnCoinsInfo
			});
			if (remainChargeAmount === 0) return minimumReturnCoinsInfo;
		}

		return minimumReturnCoinsInfo;
	}

	calcRemainChargeAmount({ remainChargeAmount, coinCount, coinPrice, minimumReturnCoinsInfo }) {
		if (remainChargeAmount < coinPrice) return remainChargeAmount;

		let usedCoinCount = 0;
		const needCoinCount = remainChargeAmount / coinPrice;

		if (needCoinCount > coinCount) {
			remainChargeAmount -= coinCount * coinPrice;
			usedCoinCount = coinCount;
		} else {
			remainChargeAmount -= needCoinCount * coinPrice;
			usedCoinCount = needCoinCount;
		}
		minimumReturnCoinsInfo[`coin${coinPrice}`] += usedCoinCount;

		return remainChargeAmount;
	}

	updateChargeInfo({ currentChargeAmount, currentCoinsInfo, usedChargeAmount, usedCoinsInfo }) {
		return {
			total: currentChargeAmount - usedChargeAmount,
			coins: {
				coin500: currentCoinsInfo.coin500 - usedCoinsInfo.coin500,
				coin100: currentCoinsInfo.coin100 - usedCoinsInfo.coin100,
				coin50: currentCoinsInfo.coin50 - usedCoinsInfo.coin50,
				coin10: currentCoinsInfo.coin10 - usedCoinsInfo.coin10
			}
		};
	}

	get chargeAmount() {
		return this.#chargeAmount;
	}

	get productList() {
		return this.#productList;
	}

	get returnCoinsInfo() {
		return this.#returnCoinsInfo;
	}

	set chargeAmount(inputChargeAmount) {
		this.#chargeAmount += inputChargeAmount;
		setLocalStorage('chargeAmount', this.#chargeAmount);
	}
};

export default ProductPurchaseModel;
