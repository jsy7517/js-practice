import { $ } from '../lib/utils/dom.js';
import ProductAddModel from './ProductAddModel.js';
import ProductAddView from './ProductAddView.js';

const ProductAddController = class {
	model;
	view;

	constructor() {
		this.model = new ProductAddModel();
		this.view = new ProductAddView();
	}

	renderProductAddMenu() {
		this.model.updateProductList();
		this.view.render(this.model.productList);
		this.bindEvent();
	}

	bindEvent() {
		this.view.on($('#product-add-form'), 'submitNewProduct', (e) => this.handleSubmitNewProduct(e.detail));
	}

	handleSubmitNewProduct(newProduct) {
		this.model.productList = newProduct;
		this.view.updateProductTable(this.model.productList);
	}
};

export default ProductAddController;
