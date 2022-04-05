import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { LOTTO_GAME } from '../constants/lottoGame.js';

export const validatePurchasePrice = (purchasePrice) => {
	if (purchasePrice <= 0) {
		throw new Error(ERROR_MESSAGES.LOTTO_PURCHASE.INVALID_PURCHASE_PRICE);
	}

	if (purchasePrice % LOTTO_GAME.UNIT_PRICE !== 0) {
		throw new Error(ERROR_MESSAGES.LOTTO_PURCHASE.INVALID_PURCHASE_PRICE);
	}
};

export const validateWinningNumbers = (winningNumbers) => {
	if (winningNumbers.includes(0)) {
		throw new Error(ERROR_MESSAGES.INPUT_WINNING_NUMBERS.INVALID_WINNING_NUMBERS);
	}

	// +1 for bonus number
	if (new Set(winningNumbers).size !== LOTTO_GAME.LOTTO_COUNT_PER_TICKET + 1) {
		throw new Error(ERROR_MESSAGES.INPUT_WINNING_NUMBERS.DUPLICATED_WINNING_NUMBERS);
	}
};
