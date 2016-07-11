import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  loading: false,
  users: List(),
  currentUser: Map()
});

const CREATE_USER = 'SettingsState/CREATE_USER';
const EDIT_USER = 'SettingsState/EDIT_USER';
const RESET_CURRENT_USER = 'SettingsState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'SettingsState/SET_CURRENT_USER';
const SET_CURRENT_USER_VALUE = 'SettingsState/SET_CURRENT_USER_VALUE';

// Action creators
export function createUser(userId, newUser) {
  console.log('id createUserissa ' + userId);
  return {
    type: CREATE_USER,
    payload: Map({
      id: userId,
      name: newUser.get('name'),
      age: newUser.get('age'),
      image: newUser.get('image')})
  };
}

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: {
      id: user.get('id'),
      values: Map({
        id: user.get('id'),
        name: user.get('name'),
        age: user.get('age'),
        image: user.get('image')
      })
    }
  };
}

export function resetCurrentUser() {
  return {
    type: RESET_CURRENT_USER,
    payload: Map({id: null, name: '', age: '', image: null})
  };
}

export function setCurrentUserValue(variable, newValue) {
  return {
    type: SET_CURRENT_USER_VALUE,
    payload: {destination: variable, value: newValue}
  };
}

export function setCurrentUser(id) {
  return {
    type: SET_CURRENT_USER,
    payload: id
  };
}

// Reducer
export default function SettingsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    //Adds new kid to the List
    case CREATE_USER:
      return state
        .updateIn(['users'], list => list.push(action.payload));

    case EDIT_USER:
      return state
        .setIn(['users', action.payload.id], action.payload.values);

    case RESET_CURRENT_USER:
      return state
        .set('currentUser', action.payload);

    case SET_CURRENT_USER_VALUE:
      return state
        .setIn(['currentUser', action.payload.destination], action.payload.value);

    case SET_CURRENT_USER:
      console.log('CURRENT USER BY ID ' + state.getIn(['users', action.payload]));
      var currentUser = state.getIn(['users', action.payload]);
      console.log('Current user name ' + currentUser.get('name'));

      return state
        .set('currentUser', state.getIn(['users', action.payload]));
    // TODO: Remove existing children

    default:
      return state;
  }
}
