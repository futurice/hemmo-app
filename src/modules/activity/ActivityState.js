import {Map} from 'immutable';

// Initial state
const initialState = Map({
  showSubActivities: false,
  chosenActivity: Map()
});

const OPEN_SUBACTIVITIES = 'ActivityState/OPEN_SUBACTIVITIES';
const CLOSE_SUBACTIVITIES = 'ActivityState/CLOSE_SUBACTIVITIES';

export function openSubActivities(activity) {
  return {
    type: OPEN_SUBACTIVITIES,
    payload: {showSubActivities: true, chosenActivity: activity}
  };
}

export function closeSubActivities() {
  return {
    type: CLOSE_SUBACTIVITIES,
    payload: false
  };
}

// Reducer
export default function ActivityStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SUBACTIVITIES:
      return state
        .set('showSubActivities', action.payload.showSubActivities)
        .set('chosenActivity', action.payload.chosenActivity);

    case CLOSE_SUBACTIVITIES:
      return state
        .set('showSubActivities', action.payload);

    default:
      return state;
  }
}
