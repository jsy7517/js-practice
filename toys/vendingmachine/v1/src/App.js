import { $, checkClickedTargetById } from './lib/utils/dom.js';
import ManageController from './Manage/ManageController.js';
import ChargeController from './Charge/ChargeController.js';
import PurchaseController from './Purchase/PurchaseController.js';
import { getLocalStorage, setLocalStorage } from './lib/utils/store.js';

const App = class {
	$target;

	manageController;
	chargeController;
	purchaseController;

	constructor() {
		this.$target = $('#app');
		this.render();

		this.manageController = new ManageController(this.$target);
		this.chargeController = new ChargeController(this.$target);
		this.purchaseController = new PurchaseController(this.$target);

		this.initEvent();
		this.loadPreviousMenu();
	}

	render() {
		const template = this.getTabMenuTemplate();
		this.$target.insertAdjacentHTML('afterbegin', template);
	}

	getTabMenuTemplate() {
		return `
    <section id="tab-menu">
      <button id="product-add-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈 충전</button>
      <button id="product-purchase-menu">상품 구매</button>
    </section>
    <section id="current-menu"></section>
    `;
	}

	initEvent() {
		const $tabMenu = $('#tab-menu', this.$target);
		$tabMenu.addEventListener('click', this.#handleMenuClick.bind(this));
	}

	loadPreviousMenu() {
		const previousMenu = getLocalStorage('previousMenu') ?? null;
		if (previousMenu === 'productAdd') {
			this.#showProductAddMenu();
			return;
		}
		if (previousMenu === 'charge') {
			this.#showChargeMenu();
			return;
		}
		if (previousMenu === 'productPurchase') {
			this.#showProductPurchaseMenu();
			return;
		}

		this.#showProductAddMenu();
	}

	#handleMenuClick(e) {
		if (checkClickedTargetById(e, 'product-add-menu')) {
			this.#showProductAddMenu();
			return;
		}
		if (checkClickedTargetById(e, 'vending-machine-manage-menu')) {
			this.#showChargeMenu();
			return;
		}
		if (checkClickedTargetById(e, 'product-purchase-menu')) {
			this.#showProductPurchaseMenu();
			return;
		}
	}

	#showProductAddMenu() {
		this.#hideCurrentMenu();
		this.manageController.updateView();
		setLocalStorage('previousMenu', 'productAdd');
	}

	#showChargeMenu() {
		this.#hideCurrentMenu();
		this.chargeController.updateView();
		setLocalStorage('previousMenu', 'charge');
	}

	#showProductPurchaseMenu() {
		if (!this.purchaseController.validateData()) return;
		this.#hideCurrentMenu();
		this.purchaseController.updateView();
		setLocalStorage('previousMenu', 'productPurchase');
	}

	#hideCurrentMenu() {
		const $emptyMenuSection = this.#getEmptyMenuSection();
		this.$target.replaceChild($emptyMenuSection, this.$target.lastElementChild);
	}

	#getEmptyMenuSection() {
		const el = document.createElement('section');
		el.setAttribute('id', 'current-menu');
		return el;
	}
};

export default App;
