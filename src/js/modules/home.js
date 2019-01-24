const SET_HOME  = 'budget-haver/home/set';

export function setHome(page)
{
  return {
    type: SET_HOME,
    page
  };
}

const initialState = {
  page: null
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case SET_HOME:
      var newPage = action.page
      return {
        ...state,
        page: newPage
      };

    default:
      return state;
  }
}
