import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faHistory,
  faCog,
  faQuestion,
  faTimes
} from '@fortawesome/pro-regular-svg-icons';
import {
  faStar,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import SpendPage from './Spend';
import SpendHelp from './Spend/help.md';

import HistoryPage from './History';
import HistoryHelp from './History/help.md';

import SettingsPage from './Settings';
import SettingsHelp from './Settings/help.md';

library.add(faQuestion);
library.add(faTimes);

library.add(faDollarSign);
library.add(faHistory);
library.add(faCog);

library.add(faStar);
library.add(faCaretDown);
// library.add(faStarExclamation);

export default [
  {
    id: 'spend',
    name: 'Spend',
    icon: 'dollar-sign',
    Page: SpendPage,
    Help: SpendHelp
  },
  {
    id: 'history',
    name: 'History',
    icon: 'history',
    Page: HistoryPage,
    Help: HistoryHelp
  },
  {
    startRight: true,
    id: 'settings',
    name: 'Settings',
    icon: 'cog',
    Page: SettingsPage,
    Help: SettingsHelp
  }
];
