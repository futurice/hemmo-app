import {Map} from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const SET_SESSIONID = 'SessionState/SET_SESSIONID';
// Initial state
const initialState = Map({
  isReady: false,
  sessionId: null
});

export function setSessionId(id) {
  return {
    type: SET_SESSIONID,
    payload: id
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
    case SET_SESSIONID:
      return state
        .set('sessionId', action.payload);

    case INITIALIZE_STATE:
    case RESET_STATE:
      return state.set('isReady', true);

    default:
      return state;
  }
}
