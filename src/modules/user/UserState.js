import {Map, List} from 'immutable';

// Initial state
const initialState = Map({
  users: List(),
  currentUser: Map(),
  activityIndex: -1
});

const CREATE_USER = 'UserState/CREATE_USER';
const EDIT_USER = 'UserState/EDIT_USER';
const RESET_CURRENT_USER = 'UserState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'UserState/SET_CURRENT_USER';
const SET_CURRENT_USER_VALUE = 'UserState/SET_CURRENT_USER_VALUE';
const SAVE_ANSWER = 'UserState/SAVE_ANSWER';
const ADD_ACTIVITY = 'UserState/ADD_ACTIVITY';

// Action creators

// TODO: Is it necessary that the userList has the answers-maps?
export function createUser(userId, newUser) {
  console.log('id createUserissa ' + userId);
  return {
    type: CREATE_USER,
    payload: Map({
      id: userId,
      name: newUser.get('name'),
      age: newUser.get('age'),
      image: newUser.get('image'),
      answers: Map({
        activities: List()})})
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
    payload: Map({id: null, name: '', age: '', image: null, answers: Map({activities: List()})})
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

export function addActivity() {
  return {
    type: ADD_ACTIVITY,
    payload: Map({
      main: null,
      sub: null,
      thumb: null})
  };
}

export function saveAnswer(index, destination, answers) {
  console.log('TALLENNETAAN ' + index + ' Jee ' + answers);
  return {
    type: SAVE_ANSWER,
    payload: {index: index, destination: destination, answers: answers}
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
      return state
      .set('currentUser', state.getIn(['users', action.payload]));

    case ADD_ACTIVITY:
      return state
        .update('activityIndex', index => index + 1)
        .updateIn(['currentUser', 'answers', 'activities'], list => list.push(action.payload));

    case SAVE_ANSWER:
      if (action.payload.index === null) {
        return state
          .setIn(['currentUser', 'answers', action.payload.destination], action.payload.answers);
      }
      else {
        return state
          .setIn(['currentUser', 'answers', 'activities', action.payload.index, action.payload.destination],
          action.payload.answers);
      }

    default:
      return state;
  }
}
