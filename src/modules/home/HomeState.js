import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  users: List(),
  currentUser: Map()
});

const CREATE_USER = 'HomeState/CREATE_USER';
const RESET_CURRENT_USER = 'HomeState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'HomeState/SET_CURRENT_USER';

// Action creators
export function createUser(newUser) {
  return {
    type: CREATE_USER,
    payload: Map({id: newUser.id, name: newUser.name, age: newUser.age, image: newUser.image})
  };
}

export function resetCurrentUser() {
  return {
    type: RESET_CURRENT_USER,
    payload: Map({id: null, name: null, age: null, image: null})
  };
}

export function setCurrentUser(id) {
  return {
    type: SET_CURRENT_USER,
    payload: id
  };
}

// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    //Adds new kid to the List
    case CREATE_USER:
      return state
        .updateIn(['users'], list => list.push(action.payload));

    case RESET_CURRENT_USER:
      return state
        .set('currentUser', action.payload);

    case SET_CURRENT_USER:
      console.log('CURRENT USER BY ID ' + state.getIn(['users', action.payload]));
      var currentUser = state.getIn(['users', action.payload]);
      console.log('Current user name ' + currentUser.get('name'));

      return state
        .set('currentUser', state.getIn(['users', action.payload]));
    // TODO: edit existing children
    // TODO: Remove existing children

    default:
      return state;
  }
}
