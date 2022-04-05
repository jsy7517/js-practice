import { $ } from '../lib/utils/dom.js';
import { SELECTORS } from '../lib/constants/dom.js';
const ManageView = class {
	$target;

	constructor($target) {
		this.$target = $target;
	}

	render(productList) {
		const $currentMenu = $('#current-menu', this.$target);
		const template = `
        <section id="product-add-section">
          <h2 id="product-add-title">상품 추가하기</h2>
          <form id="product-add-form">
            <input type="text" id="product-name-input" placeholder="상품명"/>
            <input type="number" id="product-price-input" placeholder="가격"/>
            <input type="number" id="product-quantity-input" placeholder="수량"/>
            <button type="submit" id="product-add-button">추가하기</button>
          </form>
        </section>
        <section id="product-overall-section">
          <h2 id="product-overall-title">상품 현황</h2>
          <table id="product-overall-table">
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
						${this.getTableItemTemplate(productList)}
          </table>
        </section>
    `;
		$currentMenu.insertAdjacentHTML('afterbegin', template);
	}

	initEvent(handleSubmit) {
		const $form = $(SELECTORS.MANAGE_MENU.PRODUCT_ADD_FORM, this.$target);
		$form.addEventListener('submit', handleSubmit);
	}

	getTableItemTemplate(productList) {
		return productList.length
			? productList
					.map(
						(product) =>
							`<tr class="product-manage-item">
					<td class="product-manage-name">${product.name}</td>
					<td class="product-manage-price">${product.price}</td>
					<td class="product-manage-quantity">${product.quantity}</td>
				</tr>`
					)
					.join('')
			: '';
	}

	updateTable(productList) {
		const $newTable = this.getEmptyTable();
		$newTable.insertAdjacentHTML('beforeend', this.getTableItemTemplate(productList));
		const $overallSection = $('#product-overall-section', this.$target);
		$overallSection.replaceChild($newTable, $overallSection.lastElementChild);
	}

	getEmptyTable() {
		const el = document.createElement('table');
		el.setAttribute('id', 'product-overall-table');
		el.insertAdjacentHTML(
			'afterbegin',
			`<tr>
				<th>상품명</th>
				<th>가격</th>
				<th>수량</th>
			</tr>`
		);

		return el;
	}
};

export default ManageView;
