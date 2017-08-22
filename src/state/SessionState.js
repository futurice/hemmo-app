import { Map } from 'immutable';

export const RESET_STATE = 'SessionState/RESET';
export const INITIALIZE_STATE = 'SessionState/INITIALIZE';
export const TOGGLE_ISREADY = 'SessionState/TOGGLE_ISREADY';
export const ACTIVATE = 'SessionState/ACTIVATE';
export const DEACTIVATE = 'SessionState/DEACTIVATE';
export const SHOW_EXIT_MODAL = 'SessionState/SHOW_EXIT_MODAL';
export const HIDE_EXIT_MODAL = 'SessionState/HIDE_EXIT_MODAL';
export const SHOW_SAVE_MODAL = 'SessionState/SHOW_SAVE_MODAL';
export const HIDE_SAVE_MODAL = 'SessionState/HIDE_SAVE_MODAL';

// Initial state
const initialState = Map({
  isReady: false,
  isActive: true,
  exitModalVisible: false,
  saveModalVisible: false,
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

export function hideExitModal() {
  return {
    type: HIDE_EXIT_MODAL,
  };
}

export function showExitModal() {
  return {
    type: SHOW_EXIT_MODAL,
  };
}

export function hideSaveModal() {
  return {
    type: HIDE_SAVE_MODAL,
  };
}

export function showSaveModal() {
  return {
    type: SHOW_SAVE_MODAL,
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

    case SHOW_EXIT_MODAL:
      return state.set('exitModalVisible', true);

    case HIDE_EXIT_MODAL:
      return state.set('exitModalVisible', false);

    case SHOW_SAVE_MODAL:
      return state.set('saveModalVisible', true);

    case HIDE_SAVE_MODAL:
      return state.set('saveModalVisible', false);

    default:
      return state;
  }
}
