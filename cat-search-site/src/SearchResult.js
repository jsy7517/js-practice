class SearchResult {
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
		this.$searchResult.innerHTML = this.data
			.map(
				(cat) => `
          <article class="item" id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} />
          </article>
        `
			)
			.join('');

		// this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
		// 	$item.addEventListener('click', () => {
		// 		this.onClick(this.data[index]);
		// 	});
		// });
		this.$searchResult.addEventListener('click', (e) => this.handleSearchResultClick(e));
	}

	handleSearchResultClick(e) {
		const catID = e.target.closest('.item').id;
		if (catID) {
			this.onClick(this.data.find((item) => item.id === catID));
		}
	}
}

export default SearchResult;
