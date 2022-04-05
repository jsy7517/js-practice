export const ERROR_MESSAGES = {
	PRODUCT_ADD: {
		EMPTY_PRODUCT_NAME: '상품 명이 입력되지 않았습니다.',
		PRICE_UNDER_ONE_HUNDRED: '상품의 가격은 100원 이상이어야 합니다.',
		PRICE_CANNOT_DIVIDED_BY_TEN: '상품의 가격은 10으로 나누어 떨어져야 합니다.',
		WRONG_QUANTITY: '상품의 수량은 0보다 커야 합니다.'
	},
	CHARGE: {
		WRONG_CHARGE_AMOUNT: '충전할 금액은 0보다 커야 합니다.',
		CHARGE_AMOUNT_CANNOT_DIVIDED_BY_TEN: '충전할 금액은 10으로 나누어 떨어져야 합니다.'
	},
	PRODUCT_PURCHASE: {
		NO_PRODUCTS: '상품 정보가 존재하지 않습니다. 상품 추가 후 이용해 주세요.',
		NO_TOTAL_CHARGE: '잔돈이 부족합니다. 잔돈 충전 후 이용해 주세요.',
		LACK_CHARGE_AMOUNT: '투입한 금액이 모자랍니다. 충분한 금액을 투입한 후 구매해 주세요.'
	}
};

export const ERROR_BOUNDARIES = {
	PRODUCT_ADD: {
		MINIMUM_PRICE: 100
	},
	CHARGE: {
		MINIMUM_CHARGE_AMOUNT: 0
	}
};
