import { generateId } from '../lib/utils/dom.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const ProductAddModel = class {
	#productList;

	constructor() {
		this.updateProductList();
	}

	updateProductList() {
		this.#productList = getLocalStorage('productList') ?? [];
	}

	get productList() {
		return this.#productList;
	}

	set productList({ productName, productPrice, productQuantity }) {
		const newProduct = {
			id: generateId(),
			name: productName,
			price: productPrice,
			quantity: productQuantity
		};
		this.#productList = [...this.#productList, newProduct];
		setLocalStorage('productList', this.#productList);
	}

	// TODO: 중복된 이름의 상품 검사
};

export default ProductAddModel;
