import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  value: "Settings",
  loading: false
});

// Actions
const INCREMENT = 'SettingsState/INCREMENT';

// Action creators
export function increment() {
  return {type: INCREMENT};
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return state.update('value', value => value + 1);

    default:
      return state;
  }
}
