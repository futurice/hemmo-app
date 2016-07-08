import {Map} from 'immutable';

// Initial state
const initialState = Map({
  // users: List(),
  // currentUser: Map()
  shouldHide: false
});

const HIDE_BUBBLE = 'HomeState/HIDE_BUBBLE';
const SHOW_BUBBLE = 'HomeState/SHOW_BUBBLE';

export function showBubble() {
  return {
    type: SHOW_BUBBLE
  };
}

export function hideBubble() {
  return {
    type: HIDE_BUBBLE
  };
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case SHOW_BUBBLE:
      return state
        .set('shouldHide', false);

    case HIDE_BUBBLE:
      return state
        .set('shouldHide', true);

    default:
      return state;
  }
}
