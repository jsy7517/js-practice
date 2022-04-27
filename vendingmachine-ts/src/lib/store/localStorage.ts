export const { getLocalStorage, setLocalStorage } = {
  getLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
