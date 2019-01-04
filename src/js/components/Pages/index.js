import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faHistory, faCog, faQuestion } from '@fortawesome/pro-regular-svg-icons';
import SpendPage from './Spend';
import HistoryPage from './History';
import SettingsPage from './Settings';
import HelpPage from './Help';

library.add(faDollarSign);
library.add(faHistory);
library.add(faCog);
library.add(faQuestion);

export default [
  {
    id: 'spend',
    name: 'Spend',
    icon: 'dollar-sign',
    Page: SpendPage
  },
  {
    id: 'history',
    name: 'History',
    icon: 'history',
    Page: HistoryPage
  },
  {
    startRight: true,
    id: 'settings',
    name: 'Settings',
    icon: 'cog',
    Page: SettingsPage
  },
  {
    id: 'help',
    name: 'Help',
    icon: 'question',
    Page: HelpPage
  }
];
