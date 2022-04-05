import { ERROR_MESSAGES } from '../constants/validation.js';
import { getLocalStorage } from './store.js';

export const validateProductList = () => {
	const productList = getLocalStorage('productList') ?? null;
	if (!productList) {
		throw new Error(ERROR_MESSAGES.PRODUCT_PURCHASE.NO_PRODUCTS);
	}
};
export const validateProductInfo = ({ productName, productPrice, productQuantity }) => {
	// TODO: 중복된 상품명 검사?
	if (productName === '') {
		throw new Error(ERROR_MESSAGES.PRODUCT_ADD.NO_PRODUCT_NAME);
	}

	if (productPrice < 100) {
		throw new Error(ERROR_MESSAGES.PRODUCT_ADD.PRICE_UNDER_ONE_HUNDRED);
	}

	if (productPrice % 10 !== 0) {
		throw new Error(ERROR_MESSAGES.PRODUCT_ADD.PRICE_CANNOT_DIVIDED_BY_TEN);
	}

	if (productQuantity <= 0) {
		throw new Error(ERROR_MESSAGES.PRODUCT_ADD.WRONG_QUANTITY);
	}
};

export const validateCharge = (chargeAmount) => {
	if (chargeAmount <= 0) {
		throw new Error(ERROR_MESSAGES.CHARGE.WRONG_CHARGE_AMOUNT);
	}

	if (chargeAmount % 10 !== 0) {
		throw new Error(ERROR_MESSAGES.CHARGE.CHARGE_AMOUNT_CANNOT_DIVIDED_BY_TEN);
	}
};

export const validateTotalCharge = () => {
	const chargeInfo = getLocalStorage('chargeInfo') ?? null;
	if (!chargeInfo) {
		throw new Error(ERROR_MESSAGES.PRODUCT_PURCHASE.NO_TOTAL_CHARGE);
	}
};
