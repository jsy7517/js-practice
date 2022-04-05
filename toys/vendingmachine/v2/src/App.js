import { $ } from './lib/utils/dom.js';
import ProductAddController from './ProductAdd/ProductAddController.js';
import VendingMachineManageController from './VendingMachineManage/VendingMachineManageController.js';
import ProductPurchaseController from './ProductPurchase/ProductPurchaseController.js';
import { getLocalStorage, setLocalStorage } from './lib/utils/store.js';
import { validateProductList, validateTotalCharge } from './lib/utils/validation.js';

const App = class {
	static #template = `
    <nav id="vending-machine-menu">
      <button id="product-add-menu">상품 관리</button>
      <button id="vending-machine-manage-menu">잔돈 충전</button>
      <button id="product-purchase-menu">상품 구매</button>
    </nav>
    <main id="current-menu"></main>
  `;

	$target;
	productAddController;
	vendingMachineManageController;
	productPurchaseController;

	constructor($target) {
		this.$target = $target;
		this.$target.insertAdjacentHTML('afterbegin', App.#template);

		this.productAddController = new ProductAddController();
		this.vendingMachineManageController = new VendingMachineManageController();
		this.productPurchaseController = new ProductPurchaseController();

		this.bindMenuClickEvent();
		this.loadLatestMenu();
	}

	bindMenuClickEvent() {
		$('#vending-machine-menu').addEventListener('click', (e) => this.handleClickMenu(e));
	}

	handleClickMenu({ target: { id } }) {
		switch (id) {
			case 'product-add-menu':
				this.showProductAddMenu();
				break;
			case 'vending-machine-manage-menu':
				this.showVendingMachineManageMenu();
				break;
			case 'product-purchase-menu':
				this.showProductPurchaseMenu();
				break;
		}
	}

	loadLatestMenu() {
		const latestMenu = getLocalStorage('latestMenu');

		switch (latestMenu) {
			case 'productAdd':
				this.showProductAddMenu();
				break;
			case 'vendingMachineManage':
				this.showVendingMachineManageMenu();
				break;
			case 'productPurchase':
				this.showProductPurchaseMenu();
				break;
			default:
				this.showProductAddMenu();
				break;
		}
	}

	showProductAddMenu() {
		this.hideCurrentMenu();
		this.productAddController.renderProductAddMenu();
		setLocalStorage('latestMenu', 'productAdd');
	}

	showVendingMachineManageMenu() {
		this.hideCurrentMenu();
		this.vendingMachineManageController.renderVendingMachineManageMenu();
		setLocalStorage('latestMenu', 'vendingMachineManage');
	}

	showProductPurchaseMenu() {
		try {
			validateProductList();
			validateTotalCharge();
		} catch (error) {
			alert(error.message);
			return;
		}

		this.hideCurrentMenu();
		this.productPurchaseController.renderProductPurchaseMenu();
		setLocalStorage('latestMenu', 'productPurchase');
	}

	hideCurrentMenu() {
		$('#current-menu').replaceChildren();
	}
};

export default App;
