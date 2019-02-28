import types from './types';

const achievements = [
  {
    id: 'threeSpends',
    name: "Spender",
    description: "Logged 3 spends",
    type: types.spendCount,
    args: {
      amount: 1
    }
  },
  {
    id: 'hundredSpends',
    name: "Big Spender",
    description: "Logged 100 spends",
    type: types.spendCount,
    args: {
      amount: 100
    }
  },
  {
    id: 'fivehundredSpends',
    name: "Mega Spender",
    description: "Logged 500 spends",
    type: types.spendCount,
    args: {
      amount: 500
    }
  },
  {
    id: 'thousandSpends',
    name: "Ultra-Mega Spender",
    description: "Logged 1000 spends",
    type: types.spendCount,
    args: {
      amount: 1000
    }
  },
  {
    id: 'weekstreak',
    description: "Logged a spend every day for a week",
    type: types.streak,
    args: {
      days: 7,
      countPerDay: 1
    }
  },
  {
    id: 'monthstreak',
    description: "Logged a spend every day for a month",
    type: types.streak,
    args: {
      days: 30,
      countPerDay: 1
    }
  },
  {
    id: 'quarterstreak',
    description: "Logged a spend every day for a quarter",
    type: types.streak,
    args: {
      days: 91,
      countPerDay: 1
    }
  },
  // {
  //   id: 'weekOfSavings',
  //   description: "Saved a week's worth of budget",
  //   type: types.saveRatio,
  //   args: {
  //     ratio: 7
  //   }
  // },
  // {
  //   id: 'fortnightOfSavings',
  //   description: "Saved a fortnight's worth of budget",
  //   type: types.saveRatio,
  //   args: {
  //     ratio: 14
  //   }
  // },
  {
    id: 'returnFromNegative',
    description: "Returned from a negative balance",
    type: types.returnFromNegative,
    args: {}
  }
];

export default achievements;
