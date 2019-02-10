const SET_HOME  = 'budget-haver/home/set';
import {initState, saveState} from 'modules/saveable';

const init = initState('home');
const save = saveState('home');

export function setHome(page)
{
  return {
    type: SET_HOME,
    page
  };
}

const initialState = init({
  page: '/spend'
});

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case SET_HOME:
      var newPage = action.page
      return {
        ...state,
        ...save({page: newPage})
      };

    default:
      return state;
  }
}
