import types from './types';

const achievements = [
  {
    id: 'threeSpends',
    name: "Spent",
    description: "Logged 3 spends",
    type: types.spendCount,
    args: {
      amount: 3
    }
  },
  {
    id: 'hundredSpends',
    name: "Spent More",
    description: "Logged 50 spends",
    type: types.spendCount,
    args: {
      amount: 50
    }
  },
  {
    id: 'fivehundredSpends',
    name: "Spent Most",
    description: "Logged 200 spends",
    type: types.spendCount,
    args: {
      amount: 200
    }
  },
  {
    id: 'thousandSpends',
    name: "Spent Most-est",
    description: "Logged 1000 spends",
    type: types.spendCount,
    args: {
      amount: 1000
    }
  },
  {
    id: 'weekstreak',
    name: 'Well Tracked Week',
    description: "Logged a spend every day for a week",
    type: types.streak,
    args: {
      days: 7,
      countPerDay: 1
    }
  },
  {
    id: 'monthstreak',
    name: 'Meticulous Month',
    description: "Logged a spend every day for a month",
    type: types.streak,
    args: {
      days: 30,
      countPerDay: 1
    }
  },
  {
    id: 'quarterstreak',
    name: 'Quantitative Quarter',
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
    name: 'The Prodigal',
    description: "Returned from a negative balance",
    type: types.returnFromNegative,
    args: {}
  }
];

export default achievements;
