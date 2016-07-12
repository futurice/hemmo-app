import {Map} from 'immutable';

// Initial state
const initialState = Map({
  enableWriting: false
});

const ENABLE_WRITING = 'FeedbackState/ENABLE_WRITING';
const DISABLE_WRITING = 'FeedbackState/DISABLE_WRITING';

export function enableWriting() {
  return {
    type: ENABLE_WRITING
  };
}

export function disableWriting() {
  return {
    type: DISABLE_WRITING
  };
}

// Reducer
export default function FeedbackStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ENABLE_WRITING:
      return state
        .set('enableWriting', true);

    case DISABLE_WRITING:
      return state
        .set('enableWriting', false);

    default:
      return state;
  }
}
