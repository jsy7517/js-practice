import { LOTTO_GAME } from '../lib/constants/lottoGame.js';

const LottoGameResult = class {
  #winningNumbers;

  #totalLottoRanks;

  #profit;

  constructor() {
    this.reset();
  }

  setGameResult(lottoTickets) {
    const totalMatchCount = this.calcTotalMatchCount(lottoTickets);
    const totalMatchBonus = this.calcTotalMatchBonus(
      lottoTickets,
      this.#winningNumbers.slice(-1),
    );
    this.#totalLottoRanks = this.getTotalLottoRanks(
      totalMatchCount,
      totalMatchBonus,
    );
    this.#profit = this.calcProfit(lottoTickets.length, this.#totalLottoRanks);
  }

  calcTotalMatchCount(lottoTickets) {
    return lottoTickets.map((lottoTicket) =>
      this.calcMatchCountPerTicket(
        lottoTicket,
        this.#winningNumbers.slice(0, LOTTO_GAME.LOTTO_COUNT_PER_TICKET),
      ),
    );
  }

  calcMatchCountPerTicket(lottoTicket, winningNumbers) {
    let matchCount = 0;
    lottoTicket.forEach((lottoNumber) => {
      if (winningNumbers.includes(lottoNumber)) {
        matchCount++;
      }
    });
    return matchCount;
  }

  calcTotalMatchBonus(lottoTickets, bonusNumber) {
    return lottoTickets.map((lottoTicket) => {
      if (lottoTicket.includes(bonusNumber)) {
        return true;
      }
      return false;
    });
  }

  getTotalLottoRanks(totalMatchCount, totalMatchBonus) {
    const totalRanks = [];
    totalMatchCount.forEach((matchCount, idx) => {
      const lottoPrize = this.getLottoPrize(matchCount, totalMatchBonus[idx]);
      totalRanks.push(lottoPrize ? lottoPrize.RANK : LOTTO_GAME.OUT_OF_RANK);
    });
    return totalRanks;
  }

  getLottoPrize(matchCount, isBonus) {
    return LOTTO_GAME.LOTTO_PRIZES.find(
      (lottoPrize) =>
        lottoPrize.MATCH_COUNT === matchCount &&
        lottoPrize.IS_BONUS === isBonus,
    );
  }

  calcProfit(lottoTicketCount, totalLottoRanks) {
    const totalPurchasePrice = LOTTO_GAME.UNIT_PRICE * lottoTicketCount;
    let totalReward = 0;
    totalLottoRanks.forEach((lottoRank) => {
      if (lottoRank !== LOTTO_GAME.OUT_OF_RANK) {
        const lottoPrize = this.getLottoPrizeByRank(lottoRank);
        totalReward += lottoPrize.REWARD;
      }
    });
    return (totalReward / totalPurchasePrice) * 100;
  }

  getLottoPrizeByRank(rank) {
    return LOTTO_GAME.LOTTO_PRIZES.find(
      (lottoPrize) => lottoPrize.RANK === rank,
    );
  }

  reset() {
    this.#winningNumbers = [];
    this.#totalLottoRanks = [];
    this.#profit = 0;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  set winningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  get totalLottoRanks() {
    return this.#totalLottoRanks;
  }

  get profit() {
    return this.#profit;
  }
};

export default LottoGameResult;
