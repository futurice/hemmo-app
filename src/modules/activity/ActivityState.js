import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  showSubActivities: false,
  subActivities: List()
});

const OPEN_SUBACTIVITIES = 'ActivityState/OPEN_SUBACTIVITIES';
const CLOSE_SUBACTIVITIES = 'ActivityState/CLOSE_SUBACTIVITIES';

export function openSubActivities(activities) {
  return {
    type: OPEN_SUBACTIVITIES,
    payload: {showSubActivities: true, subActivities: activities}
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
        .set('subActivities', action.payload.subActivities);

    case CLOSE_SUBACTIVITIES:
      return state
        .set('showSubActivities', action.payload);

    default:
      return state;
  }
}
