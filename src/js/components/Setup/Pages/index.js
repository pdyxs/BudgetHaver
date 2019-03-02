import Welcome from './0-Welcome';
import Currency from './1-Currency';
import Budget from './2-Budget';
import StartingBalance from './3-StartingBalance';
import Congratulations from './4-Congratulations';
import Rules from './5-Rules';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDoubleRight } from '@fortawesome/pro-regular-svg-icons';

library.add(faChevronDoubleRight);

export default [
  Welcome,
  Currency,
  Budget,
  StartingBalance,
  Congratulations,
  Rules
];
