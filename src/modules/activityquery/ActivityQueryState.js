import {Map} from 'immutable';

// Initial state
const initialState = Map({
});

// Reducer
export default function ActivityQueryStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
