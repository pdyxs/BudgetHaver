import {achievementCount} from 'modules/achievements';
import { loop, Cmd } from 'redux-loop';

import {MARK_ACHIEVED} from 'modules/achievements';

export const STAR_ADDED   = `${PACKAGE_NAME}/stars/add`;

export function starCount(state) {
  return achievementCount(state);
}

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case MARK_ACHIEVED:
      return loop(state,
        Cmd.action({type: STAR_ADDED})
      );
    default:
      return state;
  }
}
