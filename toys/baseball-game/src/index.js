import { GAME_RESULT, RANDOM_NUMBER_RANGE } from './lib/constants/game.js';
import { VALID_INPUT_LENGTH, WRONG_INPUT_MESSAGE } from './lib/constants/validation.js';
import { $, createRestartButton } from './lib/utils/dom.js';

const BaseballGameModel = class {
	generateRandomNumber() {
		const numberSet = new Set();

		while (numberSet.size !== VALID_INPUT_LENGTH) {
			numberSet.add(MissionUtils.Random.pickNumberInRange(RANDOM_NUMBER_RANGE.MIN, RANDOM_NUMBER_RANGE.MAX));
		}
		return [...numberSet].join('');
	}

	getResult(computerInputNumbers, userInputNumbers) {
		const computerNumbers = computerInputNumbers.split('');
		const userNumbers = userInputNumbers.split('');
		let strikes = 0;
		let balls = 0;
		userNumbers.forEach((userNumber, idx) => {
			if (computerNumbers[idx] === userNumber) strikes++;
			else {
				if (computerNumbers.includes(userNumber)) balls++;
			}
		});

		return this.generateResultString(strikes, balls);
	}

	generateResultString(strikes, balls) {
		if (strikes === 3) return GAME_RESULT.CONGRATS;
		if (strikes === 0 && balls === 0) return GAME_RESULT.NOTHING;
		if (strikes === 0 || balls === 0) {
			if (strikes === 0) return balls + GAME_RESULT.BALL;

			return strikes + GAME_RESULT.STRIKE;
		}

		return balls + GAME_RESULT.BALL + ' ' + strikes + GAME_RESULT.STRIKE;
	}
};

const BaseballGame = class {
	$target;
	$form;
	$userInput;
	$result;
	baseballGameModel;

	#computerInputNumbers;

	constructor($target) {
		this.$target = $target;
		this.$form = $('form', this.$target);
		this.$form.addEventListener('submit', this.#handleSubmit);
		this.$userInput = $('#user-input', this.$form);
		this.$result = $('#result', this.$target);

		this.baseballGameModel = new BaseballGameModel();

		this.#computerInputNumbers = this.baseballGameModel.generateRandomNumber();
		// console.log(this.#computerInputNumbers);
	}

	#handleSubmit = (e) => {
		// this에 접근하기 위해 화살표 함수 활용
		e.preventDefault();

		const userInputNumbers = this.$userInput.value;
		if (!this.checkUserInput(userInputNumbers)) {
			alert(WRONG_INPUT_MESSAGE);
			this.$userInput.value = '';

			return;
		}

		const resultString = this.play(this.#computerInputNumbers, userInputNumbers);
		this.showResult(resultString);
	};

	checkUserInput(userInputNumbers) {
		if (userInputNumbers.length > VALID_INPUT_LENGTH || userInputNumbers.length < VALID_INPUT_LENGTH) return false;

		return new Set([...userInputNumbers]).size === userInputNumbers.length;
	}

	play(computerInputNumbers, userInputNumbers) {
		return this.baseballGameModel.getResult(computerInputNumbers, userInputNumbers);
	}

	showResult(resultString) {
		this.$result.textContent = resultString;

		if (resultString === GAME_RESULT.CONGRATS) {
			const $restartButton = createRestartButton();
			this.$target.appendChild($restartButton);
			$restartButton.addEventListener('click', this.#handleRestart);
		}
	}

	#handleRestart = () => {
		this.$userInput.value = '';
		this.$result.textContent = '';
		this.#computerInputNumbers = this.baseballGameModel.generateRandomNumber();
		const $restartButton = $('#game-restart-button', this.$target);
		this.$target.removeChild($restartButton);
	};
};

const $app = $('#app');

export default new BaseballGame($app);
