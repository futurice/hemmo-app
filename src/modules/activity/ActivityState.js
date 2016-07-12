import {Map} from 'immutable';

// Initial state
const initialState = Map({
  chosenActivity: Map()
});

const OPEN_SUBACTIVITIES = 'ActivityState/OPEN_SUBACTIVITIES';

export function openSubActivities(activity) {
  return {
    type: OPEN_SUBACTIVITIES,
    payload: {chosenActivity: activity}
  };
}

// Reducer
export default function ActivityStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SUBACTIVITIES:
      return state
        .set('chosenActivity', action.payload.chosenActivity);

    default:
      return state;
  }
}
