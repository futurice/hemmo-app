import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  kids: List(),
  currentUser: Map()
});

const ADDKID = 'HomeState/ADDKID';
const RESETUSER = 'HomeState/RESETUSER';
const UPDATECURRENTUSER = 'HomeState/UPDATECURRENTUSER';

// Action creators
export function addKid(kid) {
  return {
    type: ADDKID,
    payload: Map({id: kid.id, name: kid.name, age: kid.age, image: kid.image})
  };
}

export function resetCurrentUser() {
  return {
    type: RESETUSER,
    payload: Map({id: null, name: null, age: null, image: null})
  };
}

export function updateCurrentUser(id) {
  return {
    type: UPDATECURRENTUSER,
    payload: id
  };
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    //Adds new kid to the List
    case ADDKID:
      return state
        .updateIn(['kids'], list => list.push(action.payload));

    case RESETUSER:
      return state
        .set('currentUser', action.payload);

    case UPDATECURRENTUSER:
      console.log('CURRENT USER BY ID ' + state.getIn(['kids', action.payload]));
      var currentUser = state.getIn(['kids', action.payload]);
      console.log('Current user name ' + currentUser.get('name'));

      return state
        .set('currentUser', state.getIn(['kids', action.payload]));
    // TODO: edit existing children
    // TODO: Remove existing children

    default:
      return state;
  }
}
