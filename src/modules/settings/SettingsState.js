import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  loading: false,
});

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
