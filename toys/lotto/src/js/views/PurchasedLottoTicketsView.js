import View from '../lib/core/View.js';
import { $, $$ } from '../lib/utils/dom.js';

const PurchasedLottoTicketsView = class extends View {
  static #template = `
  <div class="d-flex">
    <label class="flex-auto my-0" id="purchased-lotto-count"></label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
    <div class="d-flex flex-wrap" id="purchased-lotto-ticket-container">
    <ul id="purchased-lotto-ticket-list" class="d-flex flex-wrap"></ul>
    </div>
  `;

  constructor($target) {
    super($target);
    this.bindEventHandler('change', (e) => this.onToggleLottoNumbersBtn(e));
  }

  onToggleLottoNumbersBtn(e) {
    const {
      target: { className },
    } = e;
    if (className !== 'lotto-numbers-toggle-button') return;

    $('#purchased-lotto-ticket-container').classList.toggle('flex-col');
    $$('.lotto-ticket-detail').forEach(($lottoTicketDetail) => {
      $lottoTicketDetail.classList.toggle('none');
      $lottoTicketDetail.classList.toggle('inline');
    });
  }

  render(lottoTickets) {
    this.$target.insertAdjacentHTML(
      'beforeend',
      PurchasedLottoTicketsView.#template,
    );
    $(
      '#purchased-lotto-count',
    ).textContent = `총 ${lottoTickets.length}개를 구매하셨습니다.`;
    $('#purchased-lotto-ticket-list').insertAdjacentHTML(
      'afterbegin',
      this.createLottoTicketListTemplate(lottoTickets),
    );
  }

  createLottoTicketListTemplate(lottoTickets) {
    return `
      ${lottoTickets
        .map(
          (lottoTicket) => `
      <li class="mx-1 text-4xl">
        <span class="lotto-ticket-icon">🎟️ </span>
        <span class="lotto-ticket-detail none">${lottoTicket.join(',')}</span>
      </li>
      `,
        )
        .join('')}
      `;
  }
};

export default PurchasedLottoTicketsView;
