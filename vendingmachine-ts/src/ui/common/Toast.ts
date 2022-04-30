import { $ } from '../../lib/utils/dom';

const Toast = class {
  $target = $('#toast-container');

  #successIconTemplate = /* template */ `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10.0857V11.0057C20.9988 13.1621 20.3005 15.2604 19.0093 16.9875C17.7182 18.7147 15.9033 19.9782 13.8354 20.5896C11.7674 21.201 9.55726 21.1276 7.53447 20.3803C5.51168 19.633 3.78465 18.2518 2.61096 16.4428C1.43727 14.6338 0.879791 12.4938 1.02168 10.342C1.16356 8.19029 1.99721 6.14205 3.39828 4.5028C4.79935 2.86354 6.69279 1.72111 8.79619 1.24587C10.8996 0.770634 13.1003 0.988061 15.07 1.86572" stroke="#48B16E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 3.00574L11 13.0157L8 10.0157" stroke="#48B16E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  #failureIconTemplate = /* template */ `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#FB3836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 8L8 14" stroke="#FB3836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 8L14 14" stroke="#FB3836" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  renderToast(isError, message) {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML(
      'beforeend',
      this.createToastTemplate(isError, message),
    );
    $('.toast').classList.toggle('show');

    setTimeout(() => {
      $('.toast').classList.toggle('show');
      // this.$target.firstElementChild.remove();
    }, 3000);
  }

  createToastTemplate(isError, message) {
    return /* template */ `
    <dialog class="toast pack">
      <div class=${isError ? 'success-icon' : 'failure-icon'}>
        ${isError ? this.#failureIconTemplate : this.#successIconTemplate}
      </div>
      <div class="hspace(10)"></div>
      <p class="toast--message">${message}</p>
    </dialog>
    `;
  }
};

export default Toast;
