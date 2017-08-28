import { Map, List, Set } from 'immutable';

const initialAnswers = Map({
  feedbackId: null,
  activities: Map(),
  moods: Set(),
  freeWord: Set(),
});

const initialState = Map({
  users: List(),
  currentUser: Map({
    id: null,
    name: null,
    token: null,
    image: null,
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
const SET_FEEDBACK_ID = 'UserState/SET_FEEDBACK_ID';

export function setFeedbackId(feedbackId) {
  return {
    type: SET_FEEDBACK_ID,
    payload: feedbackId,
  };
}

export function createUser(newUser) {
  return {
    type: CREATE_USER,
    payload: Map({
      id: newUser.get('id'),
      name: newUser.get('name'),
      token: newUser.get('token'),
      image: newUser.get('image'),
      lastFeedbackSentOn: Date.now(),
      answers: initialAnswers,
    }),
  };
}

export function editUser(user) {
  return {
    type: EDIT_USER,
    payload: {
      id: user.get('id'),
      values: user,
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
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user,
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

export function addFreeWord(freeWord) {
  return {
    type: ADD_FREEWORD,
    payload: freeWord,
  };
}

function usersReducer(state = List(), action) {
  switch (action.type) {
    case CREATE_USER:
      return state.update(list => list.push(action.payload));

    case EDIT_USER:
      return state.map(
        user =>
          user.get('id') === action.payload.id
            ? user.merge(action.payload.values)
            : user,
      );

    case REMOVE_USER:
      return state.filter(user => user.get('id') !== action.payload);

    default:
      return state;
  }
}

function currentUserReducer(state = Map(), action) {
  switch (action.type) {
    case RESET_CURRENT_USER:
      return initialState.get('currentUser');

    case SET_CURRENT_USER:
      return state
        .set('name', action.payload.get('name'))
        .set('token', action.payload.get('token'))
        .set('image', action.payload.get('image'))
        .set('id', action.payload.get('id'));

    case ADD_ACTIVITY:
      return state.setIn(
        ['answers', 'activities', action.payload.main, action.payload.sub],
        action.payload.thumb,
      );

    case DELETE_ACTIVITY:
      const subs = state.getIn(['answers', 'activities', action.payload.main]);

      if (subs.size === 1) {
        return state.deleteIn(['answers', 'activities', action.payload.main]);
      }

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
      return state.updateIn(['answers', 'freeWord'], freeWord =>
        freeWord.add(action.payload),
      );

    case SET_FEEDBACK_ID:
      return state.setIn(['answers', 'feedbackId'], action.payload);

    default:
      return state;
  }
}

export default function UserStateReducer(state = initialState, action = {}) {
  return state
    .set('users', usersReducer(state.get('users'), action))
    .set(
      'currentUser',
      currentUserReducer(state.get('currentUser'), action, state),
    );
}
