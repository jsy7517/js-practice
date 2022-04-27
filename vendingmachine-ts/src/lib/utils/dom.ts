export const $ = (
  selector: string,
  baseEl: HTMLElement | Document = document,
): HTMLElement => baseEl.querySelector(selector);
