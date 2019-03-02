export const ANALYTICS_NONE = 'none';
export const ANALYTICS_NAVIGATION = 'navigation';
export const ANALYTICS_CURRENCY = 'currencies';
export const ANALYTICS_BUDGET_ACTIONS = 'budgetActions';
export const ANALYTICS_AMOUNTS = 'budgetAmounts';

export function isAllowed(eventType, trackingLevel) {
  return _.findIndex(AnalyticsLevels, level => level.id == eventType)
    <= _.findIndex(AnalyticsLevels, level => level.id == trackingLevel);
}

const AnalyticsLevels = [
  {
    id: ANALYTICS_NONE,
    name: 'None'
  },
  {
    id: ANALYTICS_NAVIGATION,
    name: 'Navigation',
    description: 'How much you use the app, and what pages you go to'
  },
  {
    id: ANALYTICS_CURRENCY,
    name: 'Currencies',
    description: "what currencies you're using"
  },
  {
    id: ANALYTICS_BUDGET_ACTIONS,
    name: 'Budget Actions',
    description: "when you record spending, change your budget or your balance - does NOT include how much you spend"
  },
  {
    id: ANALYTICS_AMOUNTS,
    name: 'Amounts',
    description: "your actual budget and balance amounts, to help me understand real-world spending"
  }
];

export default AnalyticsLevels;
