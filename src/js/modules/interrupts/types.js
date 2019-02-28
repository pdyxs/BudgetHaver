import { MARK_ACHIEVED } from 'modules/achievements';
import { SPEND } from 'modules/budget';
import AchievementInterrupt from './AchievementInterrupt';

const interruptTypes = [
  {
    id: 'achievement-unlocked',
    trigger: MARK_ACHIEVED,
    Component: AchievementInterrupt
  },
  {
    id: 'gone-negative',
    trigger: SPEND,
    check: ({budget: {balance}}) => balance < 0,
    maxRepetitions: 1
  }
];

export default interruptTypes;
