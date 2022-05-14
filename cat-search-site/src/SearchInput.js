import { MAX_RECENT_KEYWORD_COUNT } from './utils/constants.js';
import { $ } from './utils/dom.js';

const SearchInput = class {
	static #template = `
		<div class="search-input-container">
			<input class="SearchInput" type="text" placeholder="고양이를 검색해보세요.">
			<div class="vspace(20)"></div>
			<button class="random-result-btn">?</button>
		</div>
		<div class="recent-keywords-container"></div>
	`;

	#recentKeywords = [];

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

	renderRecentKeywords() {
		const $recentKeywordsContainer = $('.recent-keywords-container');
		$recentKeywordsContainer.replaceChildren();
		$recentKeywordsContainer.insertAdjacentHTML(
			'afterbegin',
			this.#recentKeywords.map((keyword) => `<p class="recent-keyword">${keyword}</p>`).join('')
		);
	}

	updateRecentKeywords(keyword) {
		if (this.#recentKeywords.includes(keyword)) {
			const result = [...this.#recentKeywords];
			result.splice(result.indexOf(keyword), 1);
			this.#recentKeywords = [...result, keyword];
			this.renderRecentKeywords();
			return;
		}

		this.#recentKeywords = [...this.#recentKeywords, keyword];
		if (this.#recentKeywords.length > MAX_RECENT_KEYWORD_COUNT) {
			this.#recentKeywords = this.#recentKeywords.slice(1, MAX_RECENT_KEYWORD_COUNT + 1);
		}
		this.renderRecentKeywords();
	}

	handleSearchInputClick(e) {
		e.target.value = '';
	}
};

export default SearchInput;
