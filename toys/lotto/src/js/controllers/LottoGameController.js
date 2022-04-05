import { $ } from '../lib/utils/dom.js';
import PurchasedLotto from '../models/PurchasedLotto.js';
import WinningNumbers from '../models/WinningNumbers.js';
import InputPurchasePriceView from '../views/InputPurchasePriceView.js';
import InputWinningNumbersView from '../views/InputWinningNumbersView.js';
import LottoResultModalView from '../views/LottoResultModalView.js';
import PurchasedLottoTicketsView from '../views/PurchasedLottoTicketsView.js';

const LottoGameController = class {
	purchasedLotto;
	winningNumbers;

	inputPurchasePriceView;
	inputWinningNumbersView;
	purchasedLottoTicketsView;
	lottoResultModalView;

	constructor() {
		this.purchasedLotto = new PurchasedLotto();
		this.winningNumbers = new WinningNumbers();

		this.inputPurchasePriceView = new InputPurchasePriceView($('#input-purchase-price-section'));
		this.purchasedLottoTicketsView = new PurchasedLottoTicketsView($('#purchased-lotto-ticket-section'));
		this.inputWinningNumbersView = new InputWinningNumbersView($('#input-winning-numbers-section'));
		this.lottoResultModalView = new LottoResultModalView($('#lotto-result-modal'));

		this.inputPurchasePriceView.bindEventHandler('submitPurchasePrice', (e) =>
			this.handleSubmitPurchasePrice(e.detail)
		);
		this.inputWinningNumbersView.bindEventHandler('submitWinningNumbers', (e) =>
			this.handleSubmitWinningNumbers(e.detail)
		);

		this.inputPurchasePriceView.render();
	}

	handleSubmitPurchasePrice(purchasePrice) {
		this.purchasedLotto.purchaseNewLotto(purchasePrice);
		this.purchasedLottoTicketsView.render(this.purchasedLotto.purchasedLottoTickets);
		this.inputWinningNumbersView.render();
	}

	handleSubmitWinningNumbers(winningNumbers) {
		this.winningNumbers.numbers = winningNumbers;
		this.lottoResultModalView.openModal();
	}
};

export default LottoGameController;
