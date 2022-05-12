class SearchResult {
	#noResultTemplate = /* template */ `
		<p class="no-search-result">검색 결과가 존재하지 않습니다. 다른 검색어로 검색해 보세요!</p>
	`;
	$searchResult = null;
	data = null;
	onClick = null;

	constructor({ $target, initialData, onClick }) {
		this.$searchResult = document.createElement('div');
		this.$searchResult.className = 'SearchResult';
		$target.appendChild(this.$searchResult);

		this.data = initialData;
		this.onClick = onClick;

		this.render();
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	render() {
		if (this.data.length) {
			this.$searchResult.innerHTML = this.data
				.map(
					(cat) => `
          <article class="item" id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} />
						<div class="tooltip">${cat.name}</div>
          </article>
        `
				)
				.join('');
			this.$searchResult.addEventListener('click', (e) => this.handleSearchResultClick(e));
		} else {
			this.$searchResult.innerHTML = this.#noResultTemplate;
		}
	}

	handleSearchResultClick(e) {
		const catID = e.target.closest('.item').id;
		if (catID) {
			this.onClick(this.data.find((item) => item.id === catID));
		}
	}
}

export default SearchResult;
