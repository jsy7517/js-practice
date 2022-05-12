import ImageInfo from './ImageInfo.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import { api } from './utils/api.js';
import { $ } from './utils/dom.js';
import { getLocalStorage, setLocalStorage } from './utils/localStorage.js';

class App {
	$target = null;
	data = getLocalStorage('lastSearchResult') ?? null;

	constructor($target) {
		this.$target = $target;
		this.$target.insertAdjacentHTML(
			'afterbegin',
			/* template */ `
			<input type="checkbox" class="theme-toggle"/>
		`
		);
		$('.theme-toggle').addEventListener('click', (e) => {
			if (e.target.checked) {
				document.body.setAttribute('color-theme', 'dark');
			} else {
				document.body.setAttribute('color-theme', 'light');
			}
		});

		this.searchInput = new SearchInput({
			$target,
			onSearch: (keyword) => {
				api.fetchCats(keyword).then(({ data }) => {
					this.setState(data);
					setLocalStorage('lastSearchResult', data);
				});
			},
			onShowRandomResult: () => {
				api.fetchRandomCats().then(({ data }) => {
					this.setState(data);
					setLocalStorage('lastSearchResult', data);
				});
			}
		});

		this.searchResult = new SearchResult({
			$target,
			initialData: this.data,
			onClick: (image) => {
				this.imageInfo.setState({
					visible: true,
					image
				});
			}
		});

		this.imageInfo = new ImageInfo({
			$target,
			data: {
				visible: false,
				image: null
			}
		});
	}

	setState(nextData) {
		console.log(this);
		this.data = nextData;
		this.searchResult.setState(nextData);
	}
}

export default App;
