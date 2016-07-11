import {Map} from 'immutable';

// Initial state
const initialState = Map({
  loading: false
});

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
