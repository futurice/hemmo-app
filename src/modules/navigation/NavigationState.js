import {fromJS, Map} from 'immutable';

const initialState = fromJS({
  index: 0,
  children: [{
    key: 'Home',
    index: 0
  }]
});

// Actions
const RESET_ROUTE = 'NavigationState/RESET_ROUTE';
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const NAVIGATION_COMPLETED = 'NavigationState/NAVIGATION_COMPLETED';

// Action creators
export function resetRoute() {
  return {type: RESET_ROUTE};
}

export function pushRoute(state) {
  return (dispatch) => {
    dispatch({
      type: PUSH_ROUTE,
      payload: Map({key: state.key})
    });
  };
}

export function popRoute() {
  return {type: POP_ROUTE};
}

export function navigationCompleted() {
  return {type: NAVIGATION_COMPLETED};
}

export default function NavigationReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ROUTE:
      return initialState;

    case PUSH_ROUTE:
      var newPath = Map({
        key: action.payload.get('key'),
        index: state.get('index') + 1});

      return state
        .set('isNavigating', true)
        .updateIn(['children'], list => list.push(newPath))
        .update('index', index => index + 1);

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
