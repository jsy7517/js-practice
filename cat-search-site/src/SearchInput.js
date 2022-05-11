import { api } from './utils/api.js';
import { $ } from './utils/dom.js';

const SearchInput = class {
	static #template = `
		<div class="search-input-container">
			<input class="SearchInput" type="text" placeholder="고양이를 검색해보세요.">
			<div class="vspace(20)"></div>
			<button class="random-result-btn">?</button>
		</div>
	`;
	constructor({ $target, onSearch, onShowRandomResult }) {
		this.render($target, onSearch, onShowRandomResult);
		console.log('SearchInput created.', this);
	}

	render($target, onSearch, onShowRandomResult) {
		$target.insertAdjacentHTML('afterbegin', SearchInput.#template);
		this.$searchInput = $('.SearchInput');
		this.$randomResultBtn = $('.random-result-btn');

		this.$searchInput.addEventListener('keyup', (e) => {
			if (e.key === 'Enter') {
				onSearch(e.target.value);
			}
		});
		this.$searchInput.addEventListener('click', (e) => this.handleSearchInputClick(e));
		this.$randomResultBtn.addEventListener('click', () => onShowRandomResult());

		this.$searchInput.focus();
	}

	handleSearchInputClick(e) {
		e.target.value = '';
	}
};

export default SearchInput;
