import types from './types';

const achievements = [
  {
    id: 'fiveSpends',
    type: types.spendCount,
    args: {
      amount: 5
    }
  },
  {
    id: 'weekstreak',
    type: types.streak,
    args: {
      days: 7,
      countPerDay: 1
    }
  }
];

export default achievements;
