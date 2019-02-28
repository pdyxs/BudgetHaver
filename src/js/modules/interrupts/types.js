import { MARK_ACHIEVED } from 'modules/achievements';
import { SPEND } from 'modules/budget';
import { STAR_ADDED } from 'modules/stars';
import { toggleStars } from 'modules/navigation';

import AchievementInterrupt from './components/AchievementInterrupt';
import StarsUnlockedInterrupt from './components/StarsUnlockedInterrupt';
import GoneNegativeInterrupt from './components/GoneNegativeInterrupt';

const interruptTypes = [
  {
    id: 'achievement-unlocked',
    trigger: MARK_ACHIEVED,
    Component: AchievementInterrupt
  },
  {
    id: 'stars-unlocked',
    trigger: STAR_ADDED,
    maxRepetitions: 1,
    Component: StarsUnlockedInterrupt,
    completedAction: () => toggleStars(true)
  },
  {
    id: 'gone-negative',
    trigger: SPEND,
    check: ({budget: {balance}}) => balance < 0,
    maxRepetitions: 1,
    Component: GoneNegativeInterrupt
  }
];

export default interruptTypes;
