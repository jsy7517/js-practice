export const { setLocalStorage, getLocalStorage } = {
	setLocalStorage(key, data) {
		window.localStorage.setItem(key, JSON.stringify(data));
	},
	getLocalStorage(key) {
		return JSON.parse(window.localStorage.getItem(key));
	}
};
