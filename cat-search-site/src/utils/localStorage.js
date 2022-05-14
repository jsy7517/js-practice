export const { setLocalStorage, getLocalStorage } = {
	setLocalStorage(key, data) {
		window.localStorage.setItem(key, JSON.stringify(data));
	},
	getLocalStorage(key) {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}
};
