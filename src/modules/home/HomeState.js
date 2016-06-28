import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  kids: List()
});

const ADDKID = 'HomeState/ADDKID';

// Action creators
export function addKid(kid) {
  return {
    type: ADDKID,
    payload: Map({name: kid.name, age: kid.age, image: kid.image})
  };
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
