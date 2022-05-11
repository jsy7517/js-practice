const SearchInput = class {
	#template = '<input type="text">';
	constructor({ $target, onSearch }) {
		this.render($target, onSearch);
		console.log('SearchInput created.', this);
	}

	render($target, onSearch) {
		const $searchInput = document.createElement('input');
		this.$searchInput = $searchInput;
		this.$searchInput.placeholder = '고양이를 검색해보세요.';
		$searchInput.className = 'SearchInput';
		$target.appendChild($searchInput);

		$searchInput.addEventListener('keyup', (e) => {
			if (e.key === 'Enter') {
				onSearch(e.target.value);
			}
		});
		$searchInput.addEventListener('click', (e) => this.handleSearchInputClick(e));
		$searchInput.focus();
	}

	handleSearchInputClick(e) {
		e.target.value = '';
	}
};

export default SearchInput;
