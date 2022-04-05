import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';
const VendingMachineManageModel = class {
	#chargeInfo;

	constructor() {
		this.updateChargeInfo();
	}

	updateChargeInfo() {
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

	generateRandomCoins(chargeAmount) {
		const { coins } = this.#chargeInfo;
		while (chargeAmount !== 0) {
			const randomCoin = MissionUtils.Random.pickNumberInList([10, 50, 100, 500]);
			if (chargeAmount < randomCoin) continue;
			chargeAmount -= randomCoin;
			coins[`coin${randomCoin}`] += 1;
		}

		return coins;
	}

	get chargeInfo() {
		return this.#chargeInfo;
	}

	set chargeInfo(chargeAmount) {
		this.#chargeInfo.total += chargeAmount;
		this.#chargeInfo.coins = this.generateRandomCoins(chargeAmount);
		setLocalStorage('chargeInfo', this.#chargeInfo);
	}
};

export default VendingMachineManageModel;
