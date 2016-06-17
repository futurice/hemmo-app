import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  value: "Settings",
  loading: false,
  icon: require('../../../assets/default-icon.png')
});

// Actions
const INCREMENT = 'SettingsState/INCREMENT';
const CHANGEIMAGE = 'SettingsState/CHANGEIMAGE';

// Action creators
export function increment() {
  return {type: INCREMENT};
}

export function changeImage() {
  return {type: CHANGEIMAGE};
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return state.update('value', value => value + 1);

    case CHANGEIMAGE:
      return state.update('icon', icon => require('../../../assets/test.png'));

    default:
      return state;
  }
}
