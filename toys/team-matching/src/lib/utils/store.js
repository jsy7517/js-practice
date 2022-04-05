export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
export const setLocalStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data));
