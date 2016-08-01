import {Map} from 'immutable';

// NOTE: Not needed anywhere?

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
