import {Map} from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const SET_SESSIONID = 'SessionState/SET_SESSIONID';
export const TOGGLE_ISREADY = 'SessionState/TOGGLE_ISREADY';

// Initial state
const initialState = Map({
  isReady: false
});

export function startPreparing() {
  console.log('start preparing');
  return {
    type: TOGGLE_ISREADY,
    payload: false
  };
}

export function finishPreparing() {
  console.log('finish preparing');
  return {
    type: TOGGLE_ISREADY,
    payload: true
  };
}

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE
  };
}

// Reducer
export default function SessionStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true);

    case TOGGLE_ISREADY:
      return state.set('isReady', action.payload);

    default:
      return state;
  }
}
