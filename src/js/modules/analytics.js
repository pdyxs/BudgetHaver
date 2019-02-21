const SET_LEVEL  = 'budget-haver/analytics/set-level';
import {initState, saveState} from 'modules/saveable';

const init = initState('home');
const save = saveState('home');

export const AnalyticsLevels = [
  {
    id: 'none',
    name: 'None'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'How much you use the app, and what pages you go to'
  },
  {
    id: 'currencies',
    name: 'Currencies',
    description: "what currencies you're using"
  },
  {
    id: 'budget-actions',
    name: 'Budget Actions',
    description: "when you record spending, change your budget or your balance - does NOT include how much you spend"
  },
  {
    id: 'budget-amounts',
    name: 'Amounts',
    description: "your actual budget and balance amounts, to help me understand real-world spending"
  }
]

export function setLevel(level)
{
  return {
    type: SET_LEVEL,
    level
  };
}

const initialState = init({
  trackingLevel: 'budget-amounts'
});

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        ...save({trackingLevel: action.level})
      };
    default:
      return state;
  }
}
