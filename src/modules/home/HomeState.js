import {Map, List} from 'immutable';
import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = Map({
  kids: [],
});

const ADDKID = 'HomeState/ADDKID';

// Action creators
export function addKid(name, age) {
  return {
    type: ADDKID,
    payload: {name: name, age: age}
  }
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case ADDKID:
        return state
          .updateIn(['kids'], list => list.push(action.payload));

    default:
      return state;
  }
}
