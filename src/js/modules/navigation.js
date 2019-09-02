export const SET_HOME       = `${PACKAGE_NAME}/navigation/set`;
export const OPEN_STARS     = `${PACKAGE_NAME}/navigation/stars/open`;
export const CLOSE_STARS    = `${PACKAGE_NAME}/navigation/stars/close`;
export const OPEN_HELP      = `${PACKAGE_NAME}/navigation/help/open`;
export const CLOSE_HELP     = `${PACKAGE_NAME}/navigation/help/close`;
export const START_SESSION  = `${PACKAGE_NAME}/navigation/session/start`;
export const END_SESSION    = `${PACKAGE_NAME}/navigation/session/end`;
import Saveable from 'modules/saveable';

const saveable = new Saveable(
  'navigation',
  {
    initialSaveable: {
      home: '/setup'
    },
    initialNonSaveable: {
      areStarsOpen: false
    },
    useCloud: true
  }
)

export function setHome(page)
{
  return {
    type: SET_HOME,
    page
  };
}

export function toggleStars(newState)
{
  return {
    type: newState ? OPEN_STARS : CLOSE_STARS
  };
}

export function toggleHelp(newState)
{
  return {
    type: newState ? OPEN_HELP : CLOSE_HELP
  };
}

export function startSession()
{
  return {
    type: START_SESSION
  };
}

export function endSession()
{
  return {
    type: END_SESSION
  };
}

const reducer = saveable.buildReducer(
  (state, action, save) => {
    switch (action.type) {
      case SET_HOME:
        var newPage = action.page
        return save(state, {home: newPage});
      case OPEN_STARS:
        return {
          ...state,
          areStarsOpen: true
        };
      case CLOSE_STARS:
        return {
          ...state,
          areStarsOpen: false
        };
      default:
        return state;
    }
  }
);

export default reducer;
