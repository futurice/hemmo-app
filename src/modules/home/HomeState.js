import {Map} from 'immutable';

// Initial state
const initialState = Map({
  // users: List(),
  // currentUser: Map()
});

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
