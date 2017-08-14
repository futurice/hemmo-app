import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import NavigationStateReducer from '../state/NavigationState';
import UserStateReducer from '../state/UserState';
import HemmoStateReducer from '../state/HemmoState';
import SessionStateReducer, { RESET_STATE } from '../state/SessionState';

const reducers = {
  // Navigator states
  navigatorState: NavigationStateReducer,

  session: SessionStateReducer,

  user: UserStateReducer,

  hemmo: HemmoStateReducer,
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  const nextState =
    action.type === RESET_STATE
      ? namespacedReducer(action.payload, action)
      : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return fromJS(nextState);
}
