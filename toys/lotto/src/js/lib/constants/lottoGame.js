export const LOTTO_GAME = {
  UNIT_PRICE: 1000,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_COUNT_PER_TICKET: 6,
  WINNING_NUMBERS_COUNT: 7,
  OUT_OF_RANK: 6,
  LOTTO_PRIZES: [
    {
      MATCH_COUNT: 6,
      IS_BONUS: false,
      RANK: 1,
      REWARD: 2000000000,
    },
    {
      MATCH_COUNT: 5,
      IS_BONUS: true,
      RANK: 2,
      REWARD: 10000000,
    },
    {
      MATCH_COUNT: 5,
      IS_BONUS: false,
      RANK: 3,
      REWARD: 1500000,
    },
    {
      MATCH_COUNT: 4,
      IS_BONUS: false,
      RANK: 4,
      REWARD: 50000,
    },
    {
      MATCH_COUNT: 3,
      IS_BONUS: false,
      RANK: 5,
      REWARD: 5000,
    },
  ],
};
