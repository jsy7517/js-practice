export const $ = (selector, baseEl = document) => baseEl.querySelector(selector);
export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(0, 2);
