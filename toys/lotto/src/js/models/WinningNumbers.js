const WinningNumbers = class {
	#numbers;

	constructor() {
		this.#numbers = [];
	}

	get numbers() {
		return this.#numbers;
	}

	set numbers(inputWinningNumbers) {
		this.#numbers = inputWinningNumbers;
	}
};

export default WinningNumbers;
