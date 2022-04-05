import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const ChargeModel = class {
	#chargeInfo;

	constructor() {
		this.updateData;
	}

	updateData() {
		this.#chargeInfo = getLocalStorage('chargeInfo') ?? {
			total: 0,
			coins: {
				coin500: 0,
				coin100: 0,
				coin50: 0,
				coin10: 0
			}
		};
	}

	charge(chargeAmount) {
		this.#chargeInfo.total += chargeAmount;
		while (chargeAmount !== 0) {
			const randomCoin = MissionUtils.Random.pickNumberInList([10, 50, 100, 500]);
			if (chargeAmount < randomCoin) continue;
			chargeAmount -= randomCoin;
			this.updateCoin(randomCoin);
		}
		setLocalStorage('chargeInfo', this.#chargeInfo);
	}

	updateCoin(coin) {
		switch (coin) {
			case 500:
				this.#chargeInfo.coins.coin500++;
				break;
			case 100:
				this.#chargeInfo.coins.coin100++;
				break;
			case 50:
				this.#chargeInfo.coins.coin50++;
				break;
			case 10:
				this.#chargeInfo.coins.coin10++;
				break;
		}
	}

	get chargeInfo() {
		return this.#chargeInfo;
	}
};

export default ChargeModel;
