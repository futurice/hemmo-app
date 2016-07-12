import {Map} from 'immutable';

// Initial state
const initialState = Map({
  showTitle: false
});

const SHOW_TITLE = 'FeedbackState/SHOW_TITLE';

export function showTitle() {
  return {
    type: SHOW_TITLE
  };
}

// Reducer
export default function FeedbackStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_TITLE:
      return state
        .set('showTitle', true);

    default:
      return state;
  }
}
