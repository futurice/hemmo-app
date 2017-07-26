import { Map } from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const TOGGLE_ISREADY = 'SessionState/TOGGLE_ISREADY';
export const ACTIVATE = 'SessionState/ACTIVATE';
export const DEACTIVATE = 'SessionState/DEACTIVATE';

// Initial state
const initialState = Map({
  isReady: false,
  isActive: true,
});

export function startPreparing() {
  return {
    type: TOGGLE_ISREADY,
    payload: false,
  };
}

export function finishPreparing() {
  return {
    type: TOGGLE_ISREADY,
    payload: true,
  };
}

export function resetSessionStateFromSnapshot(state) {
  return {
    type: RESET_STATE,
    payload: state,
  };
}

export function initializeSessionState() {
  return {
    type: INITIALIZE_STATE,
  };
}

export function activate() {
  return {
    type: ACTIVATE,
  };
}

export function deactivate() {
  return {
    type: DEACTIVATE,
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

    case ACTIVATE:
      return state.set('isActive', true);

    case DEACTIVATE:
      return state.set('isActive', false);

    default:
      return state;
  }
}
