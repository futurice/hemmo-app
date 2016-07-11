import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  users: List(),
  currentUser: Map()
});

const CREATE_USER = 'UserState/CREATE_USER';
const EDIT_USER = 'UserState/EDIT_USER';
const RESET_CURRENT_USER = 'UserState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'UserState/SET_CURRENT_USER';
const SET_CURRENT_USER_VALUE = 'UserState/SET_CURRENT_USER_VALUE';
const SAVE_ANSWER = 'UserState/SAVE_ANSWER';

// Action creators
export function createUser(userId, newUser) {
  console.log('id createUserissa ' + userId);
  return {
    type: CREATE_USER,
    payload: Map({
      id: userId,
      name: newUser.get('name'),
      age: newUser.get('age'),
      image: newUser.get('image'),
      answers: Map()})
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
    payload: Map({id: null, name: '', age: '', image: null, answers: Map()})
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

export function saveAnswer(destination, answers) {
  console.log('TALLENNETAAN ' + answers);
  return {
    type: SAVE_ANSWER,
    payload: {destination: destination, answers: answers}
  };
}

// Reducer
export default function UserStateReducer(state = initialState, action = {}) {
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

    case SAVE_ANSWER:
      return state
        .setIn(['currentUser', 'answers', action.payload.destination], action.payload.answers);

    default:
      return state;
  }
}
