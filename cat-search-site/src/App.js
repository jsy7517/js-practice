import ImageInfo from './ImageInfo.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import { api } from './utils/api.js';
import { $ } from './utils/dom.js';
import { getLocalStorage, setLocalStorage } from './utils/localStorage.js';
import { OSColorTheme, userColorTheme } from './utils/theme.js';

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
		$('.theme-toggle').addEventListener('click', (e) => this.handleToggleTheme(e));
		this.loadColorTheme();

		this.searchInput = new SearchInput({
			$target,
			onSearch: (keyword) => {
				api.fetchCats(keyword).then(({ data }) => {
					this.setState(data);
					setLocalStorage('lastSearchResult', data);
				});
				this.handleUpdateRecentKeywords(keyword);
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

	handleToggleTheme({ target: { checked } }) {
		if (checked) {
			document.body.setAttribute('color-theme', 'dark');
			setLocalStorage('color-theme', 'dark');
		} else {
			document.body.setAttribute('color-theme', 'light');
			setLocalStorage('color-theme', 'light');
		}
	}

	loadColorTheme() {
		if (OSColorTheme === 'dark') {
			$('.theme-toggle').checked = true;
			setLocalStorage('color-theme', 'dark');
			return;
		}

		$('.theme-toggle').checked = userColorTheme === 'dark';
		setLocalStorage('color-theme', userColorTheme === 'dark' ? 'dark' : 'light');
	}

	handleUpdateRecentKeywords(keyword) {
		this.searchInput.updateRecentKeywords(keyword);
	}
}

export default App;
