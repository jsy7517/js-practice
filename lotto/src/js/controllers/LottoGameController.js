import { $ } from '../lib/utils/dom.js';
import PurchasedLotto from '../models/PurchasedLotto.js';
import LottoGameResult from '../models/LottoGameResult.js';
import InputPurchasePriceView from '../views/InputPurchasePriceView.js';
import InputWinningNumbersView from '../views/InputWinningNumbersView.js';
import LottoResultModalView from '../views/LottoResultModalView.js';
import PurchasedLottoTicketsView from '../views/PurchasedLottoTicketsView.js';
import { LOTTO_GAME } from '../lib/constants/lottoGame.js';

const LottoGameController = class {
  purchasedLotto;

  lottoGameResult;

  inputPurchasePriceView;

  inputWinningNumbersView;

  purchasedLottoTicketsView;

  lottoResultModalView;

  constructor() {
    this.purchasedLotto = new PurchasedLotto();
    this.lottoGameResult = new LottoGameResult();

    this.inputPurchasePriceView = new InputPurchasePriceView(
      $('#input-purchase-price-section'),
    );
    this.purchasedLottoTicketsView = new PurchasedLottoTicketsView(
      $('#purchased-lotto-ticket-section'),
    );
    this.inputWinningNumbersView = new InputWinningNumbersView(
      $('#input-winning-numbers-section'),
    );
    this.lottoResultModalView = new LottoResultModalView(
      $('#lotto-result-modal'),
    );

    this.inputPurchasePriceView.bindEventHandler('submitPurchasePrice', (e) =>
      this.handleSubmitPurchasePrice(e.detail),
    );
    this.inputWinningNumbersView.bindEventHandler('submitWinningNumbers', (e) =>
      this.handleSubmitWinningNumbers(e.detail),
    );
    this.lottoResultModalView.bindEventHandler('restartGame', () => {
      this.handleRestartGame();
    });

    this.inputPurchasePriceView.render();
  }

  handleSubmitPurchasePrice(purchasePrice) {
    this.purchasedLotto.purchaseNewLotto(purchasePrice);
    this.purchasedLottoTicketsView.render(
      this.purchasedLotto.purchasedLottoTickets,
    );
    this.inputWinningNumbersView.render();
  }

  handleSubmitWinningNumbers(inputWinningNumbers) {
    this.lottoGameResult.winningNumbers = inputWinningNumbers;
    this.lottoGameResult.setGameResult(
      this.purchasedLotto.purchasedLottoTickets,
    );

    const { totalLottoRanks } = this.lottoGameResult;
    const lottoRankCount = Array.from(
      { length: LOTTO_GAME.TOTAL_RANK_COUNT },
      () => 0,
    );
    totalLottoRanks.forEach((lottoRank) => {
      if (lottoRank < LOTTO_GAME.OUT_OF_RANK) {
        lottoRankCount[lottoRank - 1]++;
      }
    });
    this.lottoResultModalView.render(
      lottoRankCount,
      this.lottoGameResult.profit,
    );
  }

  handleRestartGame() {
    this.purchasedLotto.reset();
    this.lottoGameResult.reset();
    this.inputPurchasePriceView.reset();
    this.purchasedLottoTicketsView.reset();
    this.inputWinningNumbersView.reset();
    this.lottoResultModalView.closeModal();
  }
};

export default LottoGameController;
