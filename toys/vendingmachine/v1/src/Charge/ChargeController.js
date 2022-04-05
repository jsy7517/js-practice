import { ERROR_MESSAGE } from '../lib/constants/validation.js';
import { clearInput } from '../lib/utils/dom.js';
import ChargeModel from './ChargeModel.js';
import ChargeView from './ChargeView.js';

const ChargeController = class {
	app;
	model;
	view;

	constructor($target) {
		this.model = new ChargeModel();
		this.view = new ChargeView($target);
	}

	updateView() {
		this.model.updateData();
		this.view.render(this.model.chargeInfo);
		this.view.initEvent(this.#handleSubmit.bind(this));
	}

	#handleSubmit(e) {
		e.preventDefault();
		const {
			target: [chargeInput]
		} = e;
		try {
			this.#validateInput(chargeInput.valueAsNumber);
			this.model.charge(chargeInput.valueAsNumber);
			this.view.updateCharge(this.model.chargeInfo);
			clearInput([chargeInput]);
		} catch (error) {
			clearInput([chargeInput]);
			alert(error.message);
		}
	}

	#validateInput(charge) {
		if (charge <= 0) {
			throw new Error(ERROR_MESSAGE.CHARGE.WRONG_AMOUNT);
		}

		if (charge % 10 !== 0) {
			throw new Error(ERROR_MESSAGE.CHARGE.CANNOT_DIVIDED_BY_TEN);
		}
	}
};

export default ChargeController;
