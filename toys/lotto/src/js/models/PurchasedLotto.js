import { LOTTO_GAME } from '../lib/constants/lottoGame.js';
import { shuffleArray } from '../lib/utils/utils.js';

const PurchasedLotto = class {
  #purchasedLottoTickets;

  constructor() {
    this.reset();
  }

  purchaseNewLotto(purchasePrice) {
    let ticketCount = purchasePrice / LOTTO_GAME.UNIT_PRICE;
    const lottoNumbers = Array.from(
      { length: LOTTO_GAME.MAX_LOTTO_NUMBER },
      (_, i) => i + 1,
    );
    while (ticketCount--) {
      const shuffledLottoNumbers = shuffleArray(lottoNumbers);
      const newLottoTicket = shuffledLottoNumbers
        .slice(0, LOTTO_GAME.LOTTO_COUNT_PER_TICKET)
        .sort((a, b) => a - b);
      this.#purchasedLottoTickets = [
        ...this.#purchasedLottoTickets,
        newLottoTicket,
      ];
    }
  }

  reset() {
    this.#purchasedLottoTickets = [];
  }

  get purchasedLottoTickets() {
    return this.#purchasedLottoTickets;
  }
};

export default PurchasedLotto;
