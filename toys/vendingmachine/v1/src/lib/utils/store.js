export const setLocalStorage = (key, data) => {
	window.localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
	return JSON.parse(window.localStorage.getItem(key));
};
