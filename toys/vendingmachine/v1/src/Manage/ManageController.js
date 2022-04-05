import { ERROR_MESSAGE } from '../lib/constants/validation.js';
import { clearInput } from '../lib/utils/dom.js';
import ManageModel from './ManageModel.js';
import ManageView from './ManageView.js';

const ManageController = class {
	model;
	view;

	constructor($target) {
		this.model = new ManageModel();
		this.view = new ManageView($target);
	}

	updateView() {
		this.model.updateData();
		this.view.render(this.model.productList);
		this.view.initEvent(this.#handleSubmit.bind(this));
	}

	#handleSubmit(e) {
		e.preventDefault();
		const {
			target: [nameInput, priceInput, quantityInput]
		} = e;

		try {
			this.validateInput(nameInput, priceInput, quantityInput);
			this.model.addNewProduct({
				name: nameInput.value,
				price: priceInput.valueAsNumber,
				quantity: quantityInput.valueAsNumber
			});
			this.view.updateTable(this.model.productList);
			clearInput([nameInput, priceInput, quantityInput]);
		} catch (error) {
			alert(error.message);
		}
	}

	validateInput(nameInput, priceInput, quantityInput) {
		if (nameInput.value === '') {
			throw new Error(ERROR_MESSAGE.PRODUCT.WRONG_PRODUCT_NAME);
		}
		if (priceInput.valueAsNumber < 100) {
			clearInput([priceInput]);
			throw new Error(ERROR_MESSAGE.PRODUCT.PRICE_UNDER_ONE_HUNDRED_WON);
		}
		if (priceInput.valueAsNumber % 10 !== 0) {
			clearInput([priceInput]);
			throw new Error(ERROR_MESSAGE.PRODUCT.PRICE_CANNOT_DIVIDED_BY_TEN);
		}
		if (quantityInput.valueAsNumber <= 0) {
			clearInput([quantityInput]);
			throw new Error(ERROR_MESSAGE.PRODUCT.WRONG_PRODUCT_QUANTITY);
		}
	}
};

export default ManageController;
