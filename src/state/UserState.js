import { Map, List, Set } from 'immutable';

const initialAnswers = Map({
  activities: Map(),
  moods: Set(),
  freeWord: Set(),
});

const initialState = Map({
  users: List(),
  currentUser: Map({
    id: null,
    token: '',
    name: '',
    image: null,
    audioMuted: false,
    answers: initialAnswers,
  }),
});

const CREATE_USER = 'UserState/CREATE_USER';
const EDIT_USER = 'UserState/EDIT_USER';
const REMOVE_USER = 'UserState/REMOVE_USER';
const RESET_CURRENT_USER = 'UserState/RESET_CURRENT_USER';
const SET_CURRENT_USER = 'UserState/SET_CURRENT_USER';
const ADD_ACTIVITY = 'UserState/ADD_ACTIVITY';
const DELETE_ACTIVITY = 'UserState/DELETE_ACTIVITY';
const ADD_MOOD = 'UserState/ADD_MOOD';
const DELETE_MOOD = 'UserState/DELETE_MOOD';
const ADD_FREEWORD = 'UserState/ADD_FREEWORD';
const MUTE_AUDIO = 'UserState/MUTE_AUDIO';

export function createUser(newUser) {
  return {
    type: CREATE_USER,
    payload: Map({
      id: newUser.get('id'),
      name: newUser.get('name'),
      token: newUser.get('token'),
      image: newUser.get('image'),
      answers: initialAnswers,
    }),
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
        token: user.get('token'),
        image: user.get('image'),
        answers: initialAnswers,
      }),
    },
  };
}

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    payload: id,
  };
}

export function resetCurrentUser() {
  return {
    type: RESET_CURRENT_USER,
    payload: initialState,
  };
}

export function setCurrentUser(id) {
  return {
    type: SET_CURRENT_USER,
    payload: id,
  };
}

export function addActivity(activity) {
  return {
    type: ADD_ACTIVITY,
    payload: activity,
  };
}

export function deleteActivity(activity) {
  return {
    type: DELETE_ACTIVITY,
    payload: activity,
  };
}

export function addMood(mood) {
  return {
    type: ADD_MOOD,
    payload: mood,
  };
}

export function deleteMood(mood) {
  return {
    type: DELETE_MOOD,
    payload: mood,
  };
}

export function addFreeWord() {
  return {
    type: ADD_FREEWORD,
  };
}

export function muteAudio() {
  return {
    type: MUTE_AUDIO,
  };
}

function usersReducer(state = List(), action) {
  switch (action.type) {
    case CREATE_USER:
      return state.update(list => list.push(action.payload));

    case EDIT_USER:
      return state.set(action.payload.id, action.payload.values);

    case REMOVE_USER:
      let tmp = state.slice();
      tmp = tmp.filter((user, index) => index !== action.payload);
      return tmp;

    default:
      return state;
  }
}

function currentUserReducer(state = Map(), action, wholeState) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state
        .set('name', wholeState.getIn(['users', action.payload, 'name']))
        .set('image', wholeState.getIn(['users', action.payload, 'image']))
        .set('token', wholeState.getIn(['users', action.payload, 'token']))
        .set('id', action.payload);

    case ADD_ACTIVITY:
      return state.setIn(
        ['answers', 'activities', action.payload.main, action.payload.sub],
        action.payload.thumb,
      );

    case DELETE_ACTIVITY:
      return state.deleteIn([
        'answers',
        'activities',
        action.payload.main,
        action.payload.sub,
      ]);

    case ADD_MOOD:
      return state.updateIn(['answers', 'moods'], moods =>
        moods.add(action.payload),
      );

    case DELETE_MOOD:
      return state.updateIn(['answers', 'moods'], moods =>
        moods.delete(action.payload),
      );

    case ADD_FREEWORD:
      return state.updateIn(['answers', 'freeWord'], freeword =>
        freeword.add('entry'),
      );

    case MUTE_AUDIO:
      return state.set('audioMuted', !state.get('audioMuted'));

    default:
      return state;
  }
}

export default function UserStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_CURRENT_USER:
      return action.payload;

    default:
      return state
        .set('users', usersReducer(state.get('users'), action))
        .set(
          'currentUser',
          currentUserReducer(state.get('currentUser'), action, state),
        );
  }
}
