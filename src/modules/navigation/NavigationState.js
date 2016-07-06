import {fromJS, Map} from 'immutable';

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const NAVIGATION_COMPLETED = 'NavigationState/NAVIGATION_COMPLETED';

// Action creators
export function pushRoute(state) {
  return (dispatch) => {
    // conditionally execute push to avoid double
    // navigations due to impatient users
    dispatch({
      type: PUSH_ROUTE,
      payload: Map({
        key: state.key,
        index: state.index})
    });
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

export function navigationCompleted() {
  return {type: NAVIGATION_COMPLETED};
}

const initialState = fromJS({
  index: 0,
  children: [{
    key: 'Home',
    index: 0
  }]
});

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ROUTE:
      return state
      .set('isNavigating', true)
      .updateIn(['children'], list => list.push(action.payload))
      .set('index', action.payload.get('index'));

    case POP_ROUTE:
      var poppedRouteIndex = state.get('index');
      var tmp = state.get('children').slice();
      tmp = tmp.filter(function deleteRoute(item) { return item.get('index') !== poppedRouteIndex; });

      return state
        .set('isNavigating', true)
        .set('children', tmp)
        .update('index', index => index - 1);

    case NAVIGATION_COMPLETED:
      return state.set('isNavigating', false);

    default:
      return state;
  }
}
// function isNavigationAnimationInProgress(state) {
//   return state.getIn(['navigationState', 'isNavigating']);
// }
