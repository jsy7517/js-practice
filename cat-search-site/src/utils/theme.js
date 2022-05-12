import { getLocalStorage } from './localStorage.js';

export const userColorTheme = getLocalStorage('color-theme') ?? 'light';
export const OSColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
