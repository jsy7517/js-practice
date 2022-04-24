import { $ } from '../lib/utils/dom.js';
import VendingMachineManageModel from './VendingMachineManageModel.js';
import VendingMachineManageView from './VendingMachineManageView.js';

const VendingMachineManageController = class {
	model;
	view;

	constructor() {
		this.model = new VendingMachineManageModel();
		this.view = new VendingMachineManageView();
	}

	renderVendingMachineManageMenu() {
		this.model.updateChargeInfo();
		this.view.render(this.model.chargeInfo);
		this.bindEvent();
	}

	bindEvent() {
		this.view.on($('#vending-machine-charge-form'), 'submitCharge', (e) => this.handleSubmitCharge(e.detail));
	}

	handleSubmitCharge(chargeAmount) {
		this.model.chargeInfo = chargeAmount;
		this.view.updateChargeInfo(this.model.chargeInfo);
	}
};

export default VendingMachineManageController;
