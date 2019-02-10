import Welcome from './Welcome';
import Currency from './Currency';
import Budget from './Budget';
import StartingBalance from './StartingBalance';
import Congratulations from './Congratulations';
import Rules from './Rules';

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
