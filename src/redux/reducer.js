import {Map} from 'immutable';
import {combineReducers} from 'redux-loop';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import HomeStateReducer from '../modules/home/HomeState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';
import SettingsStateReducer from '../modules/settings/SettingsState';
import ActivityStateReducer from '../modules/activity/ActivityState';
import UserStateReducer from '../modules/user/UserState';
import FeedbackStateReducer from '../modules/feedback/FeedbackState';

const reducers = {
  // Counter sample app state. This can be removed in a live application
  home: HomeStateReducer,

  // @NOTE: By convention, the navigation state must live in a subtree called
  //`navigationState`
  navigationState: NavigationStateReducer,

  session: SessionStateReducer,

  user: UserStateReducer,

  settings: SettingsStateReducer,

  activity: ActivityStateReducer,

  feedback: FeedbackStateReducer

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  if (action.type === RESET_STATE) {
    return namespacedReducer(action.payload, action);
  }

  return namespacedReducer(state || void 0, action);
}
