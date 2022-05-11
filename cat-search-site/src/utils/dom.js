export const $ = (selector, baseEl = document) => baseEl.querySelector(selector);
export const $$ = (selector, baseEl = document) => baseEl.querySelectorAll(selector);
