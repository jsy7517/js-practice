import { generateId } from '../lib/utils/dom.js';
import { setLocalStorage, getLocalStorage } from '../lib/utils/store.js';

const ManageModel = class {
	#productList;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#productList = getLocalStorage('productList') ?? [];
	}

	addNewProduct({ name, price, quantity }) {
		const newProduct = {
			id: generateId(),
			name,
			price,
			quantity
		};
		this.#productList = [...this.#productList, newProduct];
		setLocalStorage('productList', this.#productList);
	}

	get productList() {
		/**
		 * model.productList 사용 시 코드 실행
		 */
		return this.#productList;
	}
};

export default ManageModel;
