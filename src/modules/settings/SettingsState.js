import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  loading: false,
});

// Actions
const CHANGEIMAGE = 'SettingsState/CHANGEIMAGE';

export function changeImage() {
  return {type: CHANGEIMAGE};
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGEIMAGE:
      console.log("value tässä kohtaa " + state.get(value));
      return state.update('value', value => value + 1);

    default:
      return state;
  }
}
