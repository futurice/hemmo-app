import {Map, List} from 'immutable';

// Initial state. user Hemmo created for testing.
const initialState = Map({
  users: List(),
  currentUser: Map({
    activityIndex: -1
  })
});

const CREATE_USER = 'UserState/CREATE_USER';
const EDIT_USER = 'UserState/EDIT_USER';
const REMOVE_USER = 'UserState/REMOVE_USER';
const RESET_CURRENT_USER = 'UserState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'UserState/SET_CURRENT_USER';
const SET_CURRENT_USER_VALUE = 'UserState/SET_CURRENT_USER_VALUE';
const SAVE_ANSWER = 'UserState/SAVE_ANSWER';
const ADD_ACTIVITY = 'UserState/ADD_ACTIVITY';
const RESET_ACTIVITIES = 'UserState/RESET_ACTIVITIES';

// Action creators
export function createUser(newUser) {
  return {
    type: CREATE_USER,
    payload: Map({
      name: newUser.get('name'),
      token: newUser.get('token'),
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
        name: user.get('name'),
        token: user.get('token'),
        image: user.get('image'),
        answers: Map({
          activities: List()})
      })
    }
  };
}

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    payload: id
  };
}

export function resetCurrentUser() {
  return {
    type: RESET_CURRENT_USER,
    payload: Map({
      id: null,
      activityIndex: -1,
      token: '',
      name: '',
      image: null,
      answers: Map({activities: List()})})
  };
}

export function setCurrentUserValue(destination, value) {
  console.log('SET CURRENT USER');
  return {
    type: SET_CURRENT_USER_VALUE,
    payload: {destination, value}
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
      main: Map(),
      sub: Map(),
      thumb: Map()})
  };
}

export function saveAnswer(index, destination, answers) {
  return {
    type: SAVE_ANSWER,
    payload: {index, destination, answers}
  };
}

export function resetActivity() {
  return {
    type: RESET_ACTIVITIES
  };
}

function usersReducer(state = List(), action) {
  switch (action.type) {
    case CREATE_USER:
      return state
        .update(list => list.push(action.payload));

    case EDIT_USER:
      return state
        .set(action.payload.id, action.payload.values);

    case REMOVE_USER:
      var tmp = state.slice();
      tmp = tmp.filter(function deleteUser(user, index) {return index !== action.payload; });
      return tmp;

    default:
      return state;
  }
}

function currentUserReducer(state = Map(), action, wholeState) {
  switch (action.type) {
    case RESET_CURRENT_USER:
      return action.payload;

    case SET_CURRENT_USER_VALUE:
      return state
        .set(action.payload.destination, action.payload.value);

    case SET_CURRENT_USER:
      return state
      .set('name', wholeState.getIn(['users', action.payload, 'name']))
      .set('image', wholeState.getIn(['users', action.payload, 'image']))
      .set('token', wholeState.getIn(['users', action.payload, 'token']))
      .set('id', action.payload)
      .set('answers', wholeState.getIn(['users', action.payload, 'answers']));

    case ADD_ACTIVITY:
      return state
        .updateIn(['answers', 'activities'], list => list.push(action.payload))
        .update('activityIndex', value => value + 1);

    case RESET_ACTIVITIES:
      return state
        .set('activityIndex', -1);

    case SAVE_ANSWER:
      if (action.payload.index === null) {
        return state
          .setIn(['answers', action.payload.destination], action.payload.answers);
      }
      else {
        return state
          .setIn([
            'answers',
            'activities',
            action.payload.index,
            action.payload.destination], action.payload.answers);
      }

    default:
      return state;
  }
}
//
// function activityIndexReducer(state = -1, action) {
//   switch (action.type) {
//
//     case ADD_ACTIVITY:
//       return state + 1;
//
//     case RESET_ACTIVITIES:
//       return -1;
//
//     default:
//       return state;
//   }
// }

// Reducer
export default function UserStateReducer(state = initialState, action = {}) {
  return state
    .set('users', usersReducer(state.get('users'), action))
    // .setIn(['currentUser', 'activityIndex'], activityIndexReducer(state.getIn(['currentUser', 'activityIndex']), action))
    .set('currentUser', currentUserReducer(state.get('currentUser'), action, state));
}
