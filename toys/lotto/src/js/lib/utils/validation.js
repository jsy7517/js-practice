import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { LOTTO_GAME } from '../constants/lottoGame.js';

export const validatePurchasePrice = (purchasePrice) => {
  if (purchasePrice % LOTTO_GAME.UNIT_PRICE !== 0) {
    throw new Error(ERROR_MESSAGES.LOTTO_PURCHASE.INVALID_PURCHASE_PRICE);
  }
};

export const validateWinningNumbers = (winningNumbers) => {
  if (new Set(winningNumbers).size !== LOTTO_GAME.WINNING_NUMBERS_COUNT) {
    throw new Error(
      ERROR_MESSAGES.INPUT_WINNING_NUMBERS.DUPLICATED_WINNING_NUMBERS,
    );
  }
};
