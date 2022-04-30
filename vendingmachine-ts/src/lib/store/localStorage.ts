export const { getLocalStorage, setLocalStorage } = {
  getLocalStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  setLocalStorage(key: string, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
