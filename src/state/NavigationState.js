import { fromJS } from 'immutable';
import { NavigationActions } from 'react-navigation';
import includes from 'lodash/includes';

import AppNavigator from '../modules/navigation/Navigator';

export default function NavigatorReducer(state, action) {
  if (state) {
    const currentRouteName = state.getIn([
      'routes',
      state.get('index'),
      'routeName',
    ]);

    if (
      includes(NavigationActions, action.type) &&
      action.routeName !== currentRouteName
    ) {
      return fromJS(
        AppNavigator.router.getStateForAction(action, state.toJS()),
      );
    }

    return state;
  }

  // Initial state
  return fromJS(AppNavigator.router.getStateForAction(action, state));
}
