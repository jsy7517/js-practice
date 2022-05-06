import View from '../lib/core/View.js';
import { $ } from '../lib/utils/dom.js';
import { validateProductInfo } from '../lib/utils/validation.js';

const ProductAddView = class extends View {
	static #template = `
    <section id="product-add-section">
      <form id="product-add-form">
        <fieldset>
          <legend>상품 추가</legend>
          <input type="text" id="product-name-input" placeholder="상품명"/>
          <input type="number" id="product-price-input" placeholder="가격"/>
          <input type="number" id="product-quantity-input" placeholder="수량"/>
          <button type="submit" id="product-add-button" >상품 추가하기</button>
        </fieldset>
      </form>
      <section id="current-product-section">
        <h2>상품 현황</h2>
        <table id="current-product-table"></table>
      </section>
    </section>
  `;

	$productAddForm;

	constructor() {
		super();
	}

	render(productList) {
		$('#current-menu').insertAdjacentHTML('afterbegin', ProductAddView.#template);
		this.updateProductTable(productList);
		this.$productAddForm = $('#product-add-form');
		this.$productAddForm.addEventListener('submit', (e) => this.handleProductInput(e));
	}

	updateProductTable(productList) {
		$('#current-product-table').replaceChildren();
		$('#current-product-table').insertAdjacentHTML('afterbegin', this.createProductTableTemplate(productList));
	}

	createProductTableTemplate(productList) {
		return `
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody>
      ${productList
				.map(
					(product) => `
          <tr class="product__info">
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
          </tr>
        `
				)
				.join('')}
      </tbody>
    `;
	}

	handleProductInput(e) {
		e.preventDefault();
		const {
			target: [_, productNameInput, productPriceInput, productQuantityInput]
		} = e;
		const productName = productNameInput.value;
		const productPrice = productPriceInput.valueAsNumber;
		const productQuantity = productQuantityInput.valueAsNumber;

		try {
			validateProductInfo({ productName, productPrice, productQuantity });
		} catch (error) {
			alert(error.message);
			return;
		}

		this.emit(this.$productAddForm, 'submitNewProduct', { productName, productPrice, productQuantity });
	}
};

export default ProductAddView;
