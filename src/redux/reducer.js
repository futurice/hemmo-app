import { Map, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import UserStateReducer from '../modules/user/UserState';
import SessionStateReducer, { RESET_STATE } from '../modules/session/SessionState';

const reducers = {
  // Navigator states
  navigatorState: NavigationStateReducer,

  session: SessionStateReducer,

  user: UserStateReducer,
};

const namespacedReducer = combineReducers(
  reducers,
);

export default function mainReducer(state, action) {
  const nextState = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return fromJS(nextState);
}
