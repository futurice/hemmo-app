import {fromJS, Map} from 'immutable';

// Actions
const PUSH_ROUTE = 'NavigationState/PUSH_ROUTE';
const POP_ROUTE = 'NavigationState/POP_ROUTE';
const NAVIGATION_COMPLETED = 'NavigationState/NAVIGATION_COMPLETED';

// Action creators
export function pushRoute(state) {
  console.log('PUSH ROUTE ' + JSON.stringify(state));
  console.log('KEY ON ' + state.key);
  console.log('INDEX ON ' + state.index);
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
  console.log('POP ROUTE !! ');
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

        //
        // .updateIn(['children', state.get('index')], tabState =>
        //   tabState
        //     .update('children', children => children.push(fromJS(action.payload)))
        //     .set('index', tabState.get('children').size));

    case POP_ROUTE:
      var poppedRouteIndex = state.get('index');
      console.log('poistettavan index ' + poppedRouteIndex);
      var newData = state.get('children').slice();
      console.log('New data ennen poistamista ' + newData);

      newData = newData.filter(function deleteRoute(item) { return item.get('index') !== poppedRouteIndex; });

      console.log('New data poistamisen jälkeen ' + newData);

      return state
        .set('isNavigating', true)
        .set('children', newData)
        .update('index', index => index - 1);
        // .set('isNavigating', true)
        // .updateIn(['children', state.get('index')], tabState =>
        //   tabState
        //     .update('children', children => children.pop())
        //     .set('index', tabState.get('children').size - 2));

    case NAVIGATION_COMPLETED:
      return state.set('isNavigating', false);

    default:
      return state;
  }
}

function isNavigationAnimationInProgress(state) {
  return state.getIn(['navigationState', 'isNavigating']);
}
